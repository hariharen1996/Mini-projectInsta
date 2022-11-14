import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {RiMoonClearFill, RiMoonClearLine} from 'react-icons/ri'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showError: false, error: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginError = errorMsg => {
    this.setState({showError: true, error: errorMsg})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginError(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {showTheme, themeChange} = value

          const onThemeChange = () => {
            themeChange()
          }

          const textColor = !showTheme ? 'textDark' : 'textWhite'
          const bgColor = showTheme ? 'bgDark' : 'bgLight'

          return (
            <div className="login-bg-container">
              <div className="login-theme-container">
                <button
                  className="theme-btn"
                  type="button"
                  onClick={onThemeChange}
                >
                  {showTheme ? (
                    <RiMoonClearLine className="theme-icon theme" />
                  ) : (
                    <RiMoonClearFill className="theme-icon" />
                  )}
                </button>
              </div>
              <div className="login-container">
                <div className="image-container">
                  <img
                    src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667563656/instashare_home_page_gmrsoo.png"
                    className="landing-image"
                    alt="website login"
                  />
                </div>
                <div className={`form-container ${bgColor}`}>
                  <img
                    src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667563670/insta_share_logo_qwwd90.png"
                    className="logo-img"
                    alt="website logo"
                  />
                  <h1 className={`logo-heading ${textColor}`}>Insta Share</h1>
                  <form className="form" onSubmit={this.submitLogin}>
                    <label
                      htmlFor="username"
                      className={`form-label ${textColor}`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className={`form-input ${textColor}`}
                      value={username}
                      onChange={this.changeUsername}
                    />
                    <label
                      htmlFor="password"
                      className={`form-label ${textColor}`}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className={`form-input ${textColor}`}
                      value={password}
                      onChange={this.changePassword}
                    />
                    {showError && <p className="error-msg">{error}</p>}
                    <div className="form-btn-container">
                      <button type="submit" className="form-login-btn">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginRoute
