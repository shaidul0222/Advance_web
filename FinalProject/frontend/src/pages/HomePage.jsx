import Hero from '../components/Hero.jsx'
import FeaturedImage from '../components/FeaturedImage.jsx'
import RentalsSection from '../components/RentalsSection.jsx'
import VideoSection from '../components/VideoSection.jsx'

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedImage />
      <RentalsSection />
      <VideoSection />
    </main>
  )
}

export default HomePage