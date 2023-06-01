import { useState } from 'react'
import Routes from 'routes/Routes'
import 'assets/css/style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes />
    </>
  )
}

export default App
