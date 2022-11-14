import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HeaderRoute from '../HeaderRoute/index'
import StoriesRoute from '../StoriesRoute/index'
import PostsRoute from '../PostsRoute/index'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const statusTypes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    instaPosts: [],
    apiStatus: statusTypes.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getInstaPosts()
  }

  getInstaPosts = async () => {
    this.setState({apiStatus: statusTypes.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedPostsData = data.posts.map(items => ({
        postId: items.post_id,
        profilePic: items.profile_pic,
        userId: items.user_id,
        username: items.user_name,
        createdAt: items.created_at,
        likesCount: items.likes_count,
        comments: items.comments,
        postDetails: {
          imageUrl: items.post_details.image_url,
          caption: items.post_details.caption,
        },
      }))
      this.setState({
        instaPosts: updatedPostsData,
        apiStatus: statusTypes.success,
      })
    } else {
      this.setState({apiStatus: statusTypes.failure})
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value}, this.getInstaPosts)
  }

  searchInstaPosts = () => {
    this.getInstaPosts()
  }

  postsSuccessData = () => {
    const {instaPosts, searchInput} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {showTheme} = value

          const textColor = !showTheme ? 'textDark' : 'textLight'

          return instaPosts.length !== 0 ? (
            <>
              {searchInput && (
                <div className="search-results">
                  <h1 className={`search-results-text ${textColor}`}>
                    Search Results
                  </h1>
                </div>
              )}
              <ul className="insta-posts-items">
                {instaPosts.map(items => (
                  <PostsRoute
                    items={items}
                    key={items.postId}
                    searchInput={searchInput}
                  />
                ))}
              </ul>
            </>
          ) : (
            <div className="search-failure-container">
              <img
                src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667899788/instashare-search_im9amq.png"
                className="search-img"
                alt="search not found"
              />
              <h1 className={`search-heading ${textColor}`}>
                Search Not Found
              </h1>
              <p className={`search-text ${textColor}`}>
                Try different keyword or search again
              </p>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  postsLoadingData = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  postsFailureData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {showTheme} = value
        const textColor = !showTheme ? 'textDark' : 'textLight'
        return (
          <div className="posts-failure">
            <img
              src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667899796/instashare-alert_dxppnx.png"
              className="posts-failure-img"
              alt="failure view"
            />
            <p className={`posts-failure-text ${textColor}`}>
              Something went wrong. Please try again
            </p>
            <button
              type="button"
              className="posts-failure-btn"
              onClick={this.getInstaPosts}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  postsStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusTypes.success:
        return this.postsSuccessData()
      case statusTypes.failure:
        return this.postsFailureData()
      case statusTypes.loading:
        return this.postsLoadingData()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <HeaderRoute
          searchInput={searchInput}
          searchInstaPosts={this.searchInstaPosts}
          onSearch={this.onSearch}
        />
        {searchInput !== '' ? (
          <>
            <div className="insta-posts-container">{this.postsStatus()}</div>
          </>
        ) : (
          <>
            <div className="insta-stories">
              <StoriesRoute />
            </div>
            <div className="insta-posts-container">{this.postsStatus()}</div>
          </>
        )}
      </>
    )
  }
}

export default HomeRoute
