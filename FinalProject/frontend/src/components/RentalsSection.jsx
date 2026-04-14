import rentals from '../data/rentals.js'
import RentalCard from './RentalCard.jsx'

function RentalsSection() {
  return (
    <section id="rentals" className="rentals-section">
      <div className="container">
        <h3>Our Rentals</h3>

        <div className="rentals-grid">
          {rentals.map((item) => (
            <RentalCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RentalsSection