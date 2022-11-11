import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

class PostsRoute extends Component {
  state = {likedPosts: false}

  showLike = async () => {
    const {likedPosts} = this.state
    const {items} = this.props
    const {postId} = items

    await this.setState(prevState => ({
      likedPosts: !prevState.likedPosts,
    }))

    const likedData = {
      like_status: !likedPosts,
    }
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likedData),
    }

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
      options,
    )
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {items, searchInput} = this.props
    const {
      userId,
      profilePic,
      likesCount,
      username,
      createdAt,
      postDetails,
      comments,
    } = items
    const {imageUrl, caption} = postDetails
    const {likedPosts} = this.state
    return (
      <li className="user-posts-list">
        <div className="username-container">
          {searchInput === '' ? (
            <>
              <div className="user-img-container">
                <img
                  src={profilePic}
                  alt="post author profile"
                  className="profile-img"
                />
              </div>
              <Link to={`users/${userId}`} className="users-link">
                <p className="username-text">{username}</p>
              </Link>
            </>
          ) : (
            <Link to={`users/${userId}`} className="users-link">
              <div className="user-img-container">
                <img
                  src={profilePic}
                  alt="post author profile"
                  className="profile-img"
                />
              </div>
              <p className="username-text">{username}</p>
            </Link>
          )}
        </div>

        <div className="user-posts">
          <img src={imageUrl} className="posts-img" alt="post" />
        </div>
        <div className="posts-content">
          <div className="posts-icons-container">
            <div className="like-container">
              {likedPosts ? (
                <button
                  type="button"
                  className="like-btn"
                  // eslint-disable-next-line react/no-unknown-property
                  testid="unLikeIcon"
                  onClick={this.showLike}
                >
                  <FcLike className="like" size={25} />
                </button>
              ) : (
                <button
                  type="button"
                  className="like-btn"
                  // eslint-disable-next-line react/no-unknown-property
                  testid="likeIcon"
                  onClick={this.showLike}
                >
                  <BsHeart className="unlike" size={25} />
                </button>
              )}
            </div>
            <button type="button" className="button">
              <FaRegComment className="comment-icon" size={25} />
            </button>
            <button type="button" className="button">
              <BiShareAlt className="share-icon" size={24} />
            </button>
          </div>
          <p className="likes-count">
            {likedPosts ? likesCount + 1 : likesCount} likes
          </p>
          <p className="posts-caption">{caption}</p>
          <ul className="posts-comment">
            {comments.map(commentItems => (
              <li key={commentItems.user_id} className="comments-lists">
                {searchInput === '' ? (
                  <p className="comments-container">
                    {commentItems.user_name}
                    {commentItems.comment}
                  </p>
                ) : (
                  <p className="comments-container">
                    <span className="comments-name">
                      {commentItems.user_name}
                    </span>
                    {commentItems.comment}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <p className="posts-date">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostsRoute
