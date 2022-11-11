import {Component} from 'react'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import '../UsersRoute/index.css'
import './index.css'

class MyProfileDataRoute extends Component {
  render() {
    const {myProfileData} = this.props
    const {
      followingCount,
      followersCount,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      username,
      userId,
    } = myProfileData
    return (
      <li className="user-profile-lists">
        <div className="user-heading-container">
          <div className="profile-img-container">
            <h1 className="user-profile-heading user-heading-sm">{username}</h1>

            <img
              src={profilePic}
              className="user-profile-img"
              alt="my profile"
            />
          </div>
          <div className="user-profile-content">
            {/* <h1 className="user-profile-heading user-heading-lg">{username}</h1>
             */}
            <ul className="user-profile-follower-container">
              <li className="user-text-container">
                <span className="user-profile-posts-text">{postsCount}</span>
                <span className="user-profile-text">Posts</span>
              </li>
              <li className="user-text-container">
                <span className="user-profile-posts-text">
                  {followersCount}
                </span>
                <span className="user-profile-text">followers</span>
              </li>
              <li className="user-text-container">
                <span className="user-profile-posts-text">
                  {followingCount}
                </span>
                <span className="user-profile-text">following</span>
              </li>
            </ul>
            {/* <div className="user-desc-lg">
              <p className="sub-username">{userId}</p>
              <p className="user-bio-text">{userBio}</p>
            </div> */}
          </div>
        </div>
        <div className="user-desc-sm">
          <p className="sub-username">{userId}</p>
          <p className="user-bio-text">{userBio}</p>
        </div>
        {stories.length !== 0 && (
          <ul className="myprofile-stories-card">
            {stories.map(userStories => (
              <li key={userStories.id} className="stories-img-lists">
                <img
                  src={userStories.image}
                  className="users-stories-img"
                  alt="my story"
                />
              </li>
            ))}
          </ul>
        )}

        <hr className="line" />
        <div className="user-posts-heading">
          <BsGrid3X3 className="posts-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>
        <div className="user-posts-card">
          {posts.length !== 0 ? (
            <ul className="user-card-items">
              {posts.map(postImages => (
                <li key={postImages.id} className="user-card-lists">
                  <img
                    src={postImages.image}
                    className="user-posts-img"
                    alt="my post"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-posts-container">
              <div className="no-posts-icon-container">
                <BiCamera className="no-posts-icon" />
              </div>
              <h1 className="no-posts-text">No Posts Yet</h1>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default MyProfileDataRoute
