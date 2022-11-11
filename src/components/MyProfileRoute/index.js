import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import MyProfileDataRoute from '../MyProfileDataRoute/index'
import HeaderRoute from '../HeaderRoute/index'
import './index.css'

const statusTypes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MyProfileRoute extends Component {
  state = {myProfileData: [], apiStatus: statusTypes.initial}

  componentDidMount() {
    this.myProfileApi()
  }

  myProfileApi = async () => {
    this.setState({apiStatus: statusTypes.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/my-profile',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedMyProfileData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        username: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        postsCount: data.profile.posts_count,
        posts: data.profile.posts,
        stories: data.profile.stories,
      }
      this.setState({
        myProfileData: updatedMyProfileData,
        apiStatus: statusTypes.success,
      })
    } else {
      this.setState({apiStatus: statusTypes.failure})
    }
  }

  myProfileDataSuccess = () => {
    const {myProfileData} = this.state
    return (
      <ul className="myprofile-container">
        <MyProfileDataRoute
          myProfileData={myProfileData}
          key={myProfileData.id}
        />
      </ul>
    )
  }

  myProfileDataLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  myProfileDataFailure = () => (
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
        onClick={this.myProfileApi}
      >
        Try again
      </button>
    </div>
  )

  myProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusTypes.success:
        return this.myProfileDataSuccess()
      case statusTypes.failure:
        return this.myProfileDataFailure()
      case statusTypes.loading:
        return this.myProfileDataLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderRoute />
        <div className="my-profile">{this.myProfileStatus()}</div>
      </>
    )
  }
}

export default MyProfileRoute
