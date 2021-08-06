import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount = () => {
    this.getBlogDetails()
  }

  getBlogDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    console.log(data)

    const updatedBlogData = {
      id: data.id,
      avatarUrl: data.avatar_url,
      author: data.author,
      imageUrl: data.image_url,
      title: data.title,
      topic: data.topic,
      content: data.content,
    }

    this.setState({blogsData: updatedBlogData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    const {avatarUrl, author, imageUrl, title, topic, content} = blogsData

    return isLoading ? (
      <div testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="blog-details-container">
        <h1 className="title-details">{title}</h1>
        <div className="author-details-container">
          <img src={avatarUrl} alt={author} className="avatar-details" />
          <p className="author-details">{author}</p>
        </div>
        <img src={imageUrl} alt={topic} className="image-details" />
        <p className="content-details">{content}</p>
      </div>
    )
  }
}

export default BlogItemDetails
