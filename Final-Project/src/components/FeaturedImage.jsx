import exampleImage from '../assets/example.jpg'

function FeaturedImage() {
  return (
    <section className="featured-image-section">
      <div className="container">
        <img src={exampleImage} alt="Kayaking" className="featured-image" />
      </div>
    </section>
  )
}

export default FeaturedImage