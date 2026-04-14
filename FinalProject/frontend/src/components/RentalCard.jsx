function RentalCard({ image, title, description, price }) {
  return (
    <article className="rental-card">
      <img src={image} alt={title} className="rental-image" />
      <h4>{title}</h4>
      <p>{description}</p>
      <p className="price">{price}</p>
      <a href="#rentals" className="rent-button">Rent Now</a>
    </article>
  )
}

export default RentalCard