import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* this background dosent work */}
      {/* <div className='background'>
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#D0F7D6,transparent)]">
        </div>
        </div>
        <Manager />
        </div> */}

      {/* Harry's Code/background */}
      {/* <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
        </div> */}

      <Navbar />

      {/* The first background after removing positioning classes/properties */}
      <div className='bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='bg-[radial-gradient(circle_500px_at_50%_200px,#D0F7D6,transparent)]'>

          <Manager />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default App
