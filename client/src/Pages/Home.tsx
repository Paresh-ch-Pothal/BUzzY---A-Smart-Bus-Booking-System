import React from 'react'
import HomeSec1 from '../components/HomeSec1'
import HomeSec2 from '../components/HomeSec2'
import HomeSec3 from '../components/HomeSec3'
import Sponsors from '../components/Sponsors'

const Home: React.FC = () => {
  return (
    <div>
      <HomeSec1/>
      <HomeSec2/>
      <HomeSec3/>
      <Sponsors/>
    </div>
  )
}

export default Home
