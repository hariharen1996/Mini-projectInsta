import {Link} from 'react-router-dom'
import './index.css'

const NotFoundRoute = () => (
  <div className="page-not-found-container">
    <img
      src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667905093/instashare_pagenotfound_rhhy4q.png"
      className="page-not-found-img"
      alt="page not found"
    />
    <h1 className="page-not-heading">Page Not Found</h1>
    <p className="page-not-text">
      we are sorry, the page you requested could not be found. <br /> Please go
      back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="page-not-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFoundRoute
