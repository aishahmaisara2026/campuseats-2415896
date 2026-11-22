import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// One order per vendor in the cart, all in a single batch.
export async function placeOrders(user, cart, details) {
  if (!user) throw new Error('You must be signed in to place an order.')

  const byVendor = new Map()
  for (const raw of cart) {
    const item = raw.item ?? raw
    const qty = raw.qty ?? raw.quantity ?? 1
    const vendorId = item.vendorId || 'unknown-vendor'
    const vendorName = item.vendorName || 'CampusEats Vendor'

    const lines = byVendor.get(vendorId) ?? []
    byVendor.set(vendorId, [...lines, { ...item, qty, vendorId, vendorName }])
  }

  const batch = writeBatch(db)
  for (const [vendorId, lines] of byVendor) {
    const ref = doc(collection(db, 'orders'))
    batch.set(ref, {
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].vendorName,
      items: lines.map((line) => ({
        itemId: line.id,
        name: line.name,
        price: Number(line.price),
        qty: line.qty,
      })),
      total: lines.reduce((sum, line) => sum + Number(line.price) * line.qty, 0),
      status: 'Received',
      createdAt: serverTimestamp(),
    })
  }
  await batch.commit()
}

export function subscribeToMyOrders(uid, onData, onError) {
/* TODO 3: const q = query(collection(db, 'orders'), where(...)) only this
student's orders
Hint: the field is 'studentUid' and it must equal uid */
  const q = query(
    collection(db, 'orders'),
    where('studentUid', '==', uid),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  )
}

// Update: change ONE field. The other fields of the order stay as they are.
export function updateOrderStatus(orderId, status) {
  return updateDoc(doc(db, 'orders', orderId), { status })
}

// Update pickup time on an existing order.
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(doc(db, 'orders', orderId), { pickupTime })
}

// Cancel an order by deleting its document.
export function cancelOrder(orderId) {
// TODO 5: return deleteDoc(...) for the document orders/{orderId}
// Hint: the same doc(db, 'orders', orderId) as changePickupTime
  return deleteDoc(doc(db, 'orders', orderId))
}