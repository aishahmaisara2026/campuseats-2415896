const vendors = [
    {
        id: 'kafe-aminah',
        name: 'Minha Cafe',
        location: 'Mahallah Aminah',
        openHours: '7:00 AM - 9:00 PM',
        isOpen : true,
        menu: [
            { id:'aminah-1', name:'Nasi Goreng Kampung', description:'Fried rice with anchovies and chillies', price:'6.5', category:'Rice', available: true, spiceLevel: 3 },
            { id:'aminah-2', name:'Nasi Goreng Special', description:'Fried rice with egg, cucmber, and prawn', price:'8.5', category:'Rice', available: true, spiceLevel: 1 },
            { id:'aminah-3', name:'Maggi Goreng mamak', description:'Fried noodles with egg and chillies', price:'6.5', category:'Noodles', available: true, spiceLevel: 3 },
            { id:'aminah-4', name:'Kuey Teow Goreng', description:'Flat rice noodles with clam and sprouts', price:'7.5', category:'Noodles', available: true, spiceLevel: 2 },
            { id:'aminah-5', name:'Lempeng', description:'Pancake with Sambal/Sugar', price:'4.5', category:'Dessert', available: true, spiceLevel: 3 },
            { id:'aminah-6', name:'Teh Tarik', description:'Classic Malaysian tilk tea', price:'2.5', category:'Drinks', available: true, spiceLevel: 0 },
            { id:'aminah-7', name:'Milo', description:'Chocolate malt drink', price:'2.5', category:'Drinks', available: true, spiceLevel: 0 },
            { id:'aminah-8', name:'Teh O', description:'Classic Malaysian tea', price:'1.5', category:'Drinks', available: true, spiceLevel: 0 },
            { id:'aminah-9', name:'Donut Susu', description:'Milk-glazed donut', price:'0.5', category:'Dessert', available: true, spiceLevel: 0 },
        
        ],
    },
    {
        id: 'kafe-hafsah',
        name: 'Maya Food&Drink',
        location: 'Mahallah Hafsah',
        openHours: '8:00 AM - 9:00 PM',
        isOpen : true,
        menu: [
            { id:'hafsah-1', name:'Ayam Gepuk', description:'White rice with chicken, sambal, cabbage and tempe', price:'6.5', category:'Rice', available: true, spiceLevel: 3 },
            { id:'hafsah-2', name:'Ikan Keli Gepuk', description:'White rice with catfish, sambal, cabbage and tempe ', price:'6.5', category:'Rice', available: true, spiceLevel: 3 },
            { id:'hafsah-3', name:'Bubur Ayam', description:'Chicken rice porridge with anchovies and brocolli', price:'5.0', category:'Porridge', available: true, spiceLevel: 2 },
            { id:'hafsah-4', name:'Sirap Limau', description:'Rose syrup with lime', price:'1.5', category:'Drinks', available: true, spiceLevel: 0 },
            { id:'hafsah-5', name:'Karipap', description:'Potato filling inside a golden, deep-fried pastry pocket', price:'0.5', category:'Dessert', available: true, spiceLevel: 1 },
        ],
    },
    {
       id: 'kafe-asiah',
        name: 'Syukur Cafe',
        location: 'Mahallah Asiah',
        openHours: '8:00 AM - 9:00 PM',
        isOpen : true,
        menu: [], 
    },
]
export default vendors