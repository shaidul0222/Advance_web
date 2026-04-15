import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import OrdersListPage from './pages/OrdersListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrdersListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App