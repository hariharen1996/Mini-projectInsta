import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HeaderRoute from '../HeaderRoute'
import UsersRoute from '../UsersRoute'
import './index.css'

const statusTypes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class UsersProfileRoute extends Component {
  state = {usersData: [], apiStatus: statusTypes.initial}

  componentDidMount() {
    this.getUsersData()
  }

  getUsersData = async () => {
    this.setState({apiStatus: statusTypes.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {usersId} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/users/${usersId}`,
      options,
    )
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedUsersData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        username: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        postsCount: data.user_details.posts_count,
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }

      this.setState({
        usersData: updatedUsersData,
        apiStatus: statusTypes.success,
      })
    } else {
      this.setState({apiStatus: statusTypes.failure})
    }
  }

  usersSuccessData = () => {
    const {usersData} = this.state
    console.log(usersData)
    return (
      <ul className="profile-container">
        <UsersRoute usersData={usersData} key={usersData.id} />
      </ul>
    )
  }

  usersLoadingData = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  usersFailureData = () => (
    <div className="profile-failure">
      <img
        src="https://res.cloudinary.com/dhr74n4vu/image/upload/v1667738087/user_profile_error_ldgh2p.png"
        className="profile-failure-img"
        alt="failure view"
      />
      <p className="profile-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="profile-failure-btn"
        onClick={this.getUsersData}
      >
        Try again
      </button>
    </div>
  )

  usersStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusTypes.success:
        return this.usersSuccessData()
      case statusTypes.failure:
        return this.usersFailureData()
      case statusTypes.loading:
        return this.usersLoadingData()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderRoute />
        <div className="users-profile">{this.usersStatus()}</div>
      </>
    )
  }
}

export default UsersProfileRoute
