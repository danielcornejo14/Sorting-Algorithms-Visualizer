import { useState } from 'react'
import {Container} from './components/ui/Container/Container'
import './App.scss'
import { LandingPage } from './components/landing-page/LandingPage'

function App() {
  const [count, setCount] = useState(10)

  return (
    <LandingPage></LandingPage>
  )
}

export default App
