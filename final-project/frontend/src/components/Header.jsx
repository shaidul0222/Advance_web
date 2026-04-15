import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <h1 className="logo">PaddleJoy</h1>

        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/order" className="nav-link">
            Order
          </NavLink>
          <NavLink to="/orders" className="nav-link">
            Saved Orders
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header