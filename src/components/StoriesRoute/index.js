import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import './index.css'

const statusTypes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class StoriesRoute extends Component {
  state = {storiesData: [], apiStatus: statusTypes.initial}

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    this.setState({apiStatus: statusTypes.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedStories = data.users_stories.map(items => ({
        userId: items.user_id,
        storyUrl: items.story_url,
        username: items.user_name,
      }))
      this.setState({
        storiesData: updatedStories,
        apiStatus: statusTypes.success,
      })
    } else {
      this.setState({apiStatus: statusTypes.failure})
    }
  }

  storiesSuccessData = () => {
    const {storiesData} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <ul className="slider">
          <Slider {...settings}>
            {storiesData.map(items => (
              <li key={items.userId} className="stories-content">
                <div className="text-center">
                  <img
                    src={items.storyUrl}
                    className="stories-img"
                    alt="user story"
                  />
                </div>
                <p className="stories-text">{items.username}</p>
              </li>
            ))}
          </Slider>
        </ul>
      </>
    )
  }

  storiesLoadingData = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="stories-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  storiesFailureData = () => (
    <div className="stories-failure-container">
      <img
        src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667899796/instashare-alert_dxppnx.png"
        className="stories-failure-img"
        alt="failure view"
      />
      <p className="stories-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="stories-failure-btn"
        onClick={this.getStoriesData}
      >
        Try again
      </button>
    </div>
  )

  storiesStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusTypes.success:
        return this.storiesSuccessData()
      case statusTypes.failure:
        return this.storiesFailureData()
      case statusTypes.loading:
        return this.storiesLoadingData()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="insta-stories-container">
        <div className="slider-container">{this.storiesStatus()}</div>
      </div>
    )
  }
}

export default StoriesRoute
