const STEPS = ['Received', 'Prepairing', 'Ready', 'Collected']

export function OrderStatus({ status }) {
    const index = STEPS.indexOf(status)
    return (
        <ol className="status-steps" 
        style={{ display: 'flex', gap: '0.75rem', 
        listStyle: 'none', padding: 0, margin: '0.75rem 0' }}>
            {STEPS.map((step, i) => {
                const isDone = i <= index
                return (
                    <li
                        key={step}
                        className={isDone ? 'step done' : 'step'}
                        style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: isDone ? 600 : 400,
                            backgroundColor: isDone ? '#e60ea1' : '#e5e7eb',
                            color: isDone ? '#ffffff' : '#4b5563',
                        }}
                    >
                        {isDone ? '✓ ' : ''}
                        {step}
                    </li>
                )
            })}
        </ol>
    )
}

export default OrderStatus