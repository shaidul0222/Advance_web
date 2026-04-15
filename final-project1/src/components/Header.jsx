import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="container header-content">
        <h1 className="logo">PaddleJoy</h1>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/order"
            className={`nav-link ${location.pathname === '/order' ? 'active' : ''}`}
          >
            Order
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header