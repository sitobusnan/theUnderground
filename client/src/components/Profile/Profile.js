import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PostService from '../../service/post.service'

import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser,
            posts: []
        }
    }

    displayPosts = () => {
        return this.state.posts.map((post, idx) => <Link to={`/post/detail/${post._id}`} key={idx}><li>{post.title} </li></Link >)
    }

    componentDidMount = () => {
        this.postService.getAllUserPosts(this.state.user._id)
            .then(response => {
                this.setState({ posts: response.data.posts })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.posts)
        if (this.state.user) {
            return (
                <>
                    <div className="main-profile">
                        <h4>Posts you've done</h4>
                        <div className="post-list">
                            <p>{this.displayPosts()}</p>
                        </div>
                    </div>
                </>
            )
        } else {
            return <p>Charging...</p>
        }

    }
}

export default Profile