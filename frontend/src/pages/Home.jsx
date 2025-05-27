import Hero from '~/components/Layouts/Hero'
import GenderCollectionSection from '~/components/Products/GenderCollectionSection'
import NewArrivals from '~/components/Products/NewArrivals'

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
    </div>
  )
}

export default Home
