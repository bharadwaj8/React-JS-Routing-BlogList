import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {blogsList: [], isLoading: true}

  componentDidMount = () => {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)
    const updatedBlogsList = data.map(each => ({
      id: each.id,
      avatarUrl: each.avatar_url,
      author: each.author,
      imageUrl: each.image_url,
      title: each.title,
      topic: each.topic,
    }))

    this.setState({blogsList: updatedBlogsList, isLoading: false})
  }

  render() {
    const {blogsList, isLoading} = this.state
    return isLoading ? (
      <div testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="blog-list-container">
        {blogsList.map(each => (
          <BlogItem key={each.id} details={each} />
        ))}
      </div>
    )
  }
}

export default BlogList
