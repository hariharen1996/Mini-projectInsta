import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class HeaderRoute extends Component {
  state = {showMenu: false, showSearch: false}

  onShowMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  onShowSearch = () => {
    this.setState(prevState => ({
      showSearch: !prevState.showSearch,
    }))
  }

  render() {
    const {showMenu, showSearch} = this.state
    const {onSearch, searchInstaPosts, searchInput} = this.props
    const logoutApp = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }
    return (
      <>
        <div className="navbar-container-lg">
          <div className="nav-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667563670/insta_share_logo_qwwd90.png"
                className="nav-logo"
                alt="website logo"
              />
            </Link>
            <h1 className="insta-heading">Insta Share</h1>
          </div>
          <ul className="nav-items-lg">
            <li className="nav-lists-lg">
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search Caption"
                  value={searchInput}
                  onChange={onSearch}
                />
                <div className="search-icon-container">
                  <button
                    type="button"
                    className="search-btn"
                    // eslint-disable-next-line react/no-unknown-property
                    testid="searchIcon"
                    onClick={searchInstaPosts}
                  >
                    <FaSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </li>
            <Link to="/" className="nav-links">
              <li className="nav-lists-lg">
                <p className="nav-text active">Home</p>
              </li>
            </Link>
            <Link to="/my-profile" className="nav-links">
              <li className="nav-lists-lg">
                <p className="nav-text">Profile</p>
              </li>
            </Link>
            <li className="nav-lists-lg">
              <button type="button" className="logout-btn" onClick={logoutApp}>
                Logout
              </button>
            </li>
            <li className="menu-container">
              <button
                className="menu-btn"
                type="button"
                onClick={this.onShowMenu}
              >
                <GiHamburgerMenu className="menu-icon" />
              </button>
            </li>
          </ul>
        </div>
        {showMenu && (
          <div className="nav-container-sm">
            <ul className="nav-lists-sm">
              <Link to="/" className="nav-links">
                <li className="nav-items-sm">
                  <p className="nav-text">Home</p>
                </li>
              </Link>
              <li className="nav-items-sm">
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onShowSearch}
                >
                  <p className="nav-text active">Search</p>
                </button>
              </li>
              <Link to="/my-profile" className="nav-links">
                <li className="nav-items-sm">
                  <p className="nav-text">Profile</p>
                </li>
              </Link>
              <li className="nav-items-sm">
                <button
                  type="button"
                  className="logout-btn"
                  onClick={logoutApp}
                >
                  Logout
                </button>
              </li>
              <li className="nav-items-sm">
                <button
                  type="button"
                  className="close-btn"
                  onClick={this.onShowMenu}
                >
                  <AiFillCloseCircle className="close-icon" />
                </button>
              </li>
            </ul>
          </div>
        )}
        {showSearch && (
          <div className="search-sm">
            <div className="search-container">
              <input
                type="search"
                className="search-input search-input-sm"
                placeholder="Search Caption"
                value={searchInput}
                onChange={onSearch}
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  className="search-btn"
                  // eslint-disable-next-line react/no-unknown-property
                  testid="searchIcon"
                  onClick={searchInstaPosts}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(HeaderRoute)
