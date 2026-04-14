import { useEffect, useState } from 'react'

function OrdersListPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('http://localhost:3000/api/orders')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch orders.')
        }

        setOrders(data)
      } catch (err) {
        setError(err.message || 'Something went wrong while loading orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <main className="order-page">
      <section className="order-intro container">
        <h2>Saved Orders</h2>
        <p>Here you can see the rental requests already stored in the database.</p>
      </section>

      <section className="order-form-section container">
        {loading && <p className="submit-status">Loading orders...</p>}
        {error && <p className="form-error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="submit-status">No orders found yet.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Item</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Qty</th>
                  <th>Message</th>
                  <th>Newsletter</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.fullname}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.item}</td>
                    <td>{new Date(order.start_date).toLocaleDateString()}</td>
                    <td>{new Date(order.end_date).toLocaleDateString()}</td>
                    <td>{order.qty}</td>
                    <td>{order.message || '-'}</td>
                    <td>{order.newsletter ? 'Yes' : 'No'}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default OrdersListPage