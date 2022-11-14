import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class PostsRoute extends Component {
  state = {
    likedPosts: false,
    description: '',
    commentData: [],
    isComment: false,
  }

  changeDescription = event => {
    this.setState({description: event.target.value})
  }

  showComment = () => {
    this.setState(prevState => ({
      isComment: !prevState.isComment,
    }))
  }

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

  commentSubmit = event => {
    event.preventDefault()
    const {description} = this.state
    const {items} = this.props
    const {username, userId} = items
    if (description !== '') {
      const newData = {
        userId,
        username,
        description,
      }

      this.setState(prevState => ({
        commentData: [...prevState.commentData, newData],
        description: '',
      }))
    }
  }

  render() {
    const {items} = this.props
    const {description, commentData, isComment} = this.state
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
      <ThemeContext.Consumer>
        {value => {
          const {showTheme} = value

          const cardBg = showTheme ? 'card-dark' : 'card-light'
          const cardText = !showTheme ? 'cardText-dark' : 'cardText-light'
          const commentInput = !showTheme ? 'cmDark' : 'cmLight'
          const commentText = showTheme ? 'cmTextDark' : 'cmLTextLight'
          const commentMsgText = showTheme ? 'cmMsgDark' : 'cmMsgLight'

          return (
            <li className="user-posts-list">
              <div className={`username-container ${cardBg}`}>
                <div className="user-img-container">
                  <img
                    src={profilePic}
                    alt="post author profile"
                    className="profile-img"
                  />
                </div>
                <Link to={`users/${userId}`} className="users-link">
                  <h1 className={`username-text ${cardText}`}>{username}</h1>
                </Link>
              </div>

              <div className="user-posts">
                <img src={imageUrl} className="posts-img" alt="post" />
              </div>
              <div className={`posts-content ${cardBg}`}>
                <div className="posts-icons-container">
                  <div className="like-container">
                    {likedPosts ? (
                      <button
                        type="button"
                        className={`like-btn ${cardText}`}
                        // eslint-disable-next-line react/no-unknown-property
                        testid="unLikeIcon"
                        onClick={this.showLike}
                      >
                        <FcLike className="like" size={25} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`like-btn ${cardText}`}
                        // eslint-disable-next-line react/no-unknown-property
                        testid="likeIcon"
                        onClick={this.showLike}
                      >
                        <BsHeart className="unlike" size={25} />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={this.showComment}
                  >
                    <FaRegComment
                      className={`comment-icon ${cardText}`}
                      size={25}
                    />
                  </button>
                  <button type="button" className="button">
                    <BiShareAlt
                      className={`share-icon ${cardText}`}
                      size={24}
                    />
                  </button>
                </div>
                {isComment && (
                  <div className="add-comment-container">
                    <form
                      className="comment-form"
                      onSubmit={this.commentSubmit}
                    >
                      <input
                        type="text"
                        className={`comment-input ${commentInput}`}
                        placeholder="Add a comment..."
                        value={description}
                        onChange={this.changeDescription}
                      />
                      <button type="submit" className="comment-btn">
                        Post
                      </button>
                    </form>
                  </div>
                )}
                <p className={`likes-count ${cardText}`}>
                  {likedPosts ? likesCount + 1 : likesCount} likes
                </p>
                <p className={`posts-caption ${cardText}`}>{caption}</p>
                <div className="posts-comment">
                  {comments.map(item => (
                    <p key={item.user_id} className="comments-container">
                      <span className={`comments-name ${commentText}`}>
                        {item.user_name}
                      </span>
                      <span className={`comments-msg ${commentMsgText}`}>
                        {item.comment}
                      </span>
                    </p>
                  ))}
                  {commentData.map(newComment => (
                    <p key={newComment.userId} className="comments-container">
                      <span className={`comments-name ${commentText}`}>
                        {newComment.username}
                      </span>
                      <span className={`comments-msg ${commentMsgText}`}>
                        {newComment.description}
                      </span>
                    </p>
                  ))}
                </div>

                <p className={`posts-date ${cardText}`}>{createdAt}</p>
              </div>
            </li>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default PostsRoute
