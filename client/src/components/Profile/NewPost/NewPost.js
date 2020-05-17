import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import './NewPost.css'


class NewPost extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            genre: 'Narrative',
            typology: 'Descriptive',
            cover: '',
            redirect: false
        }
        this.newPostService = new PostService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const info = { ...this.state }
        info.user = this.props.user._id
        this.newPostService.createPost(info)
            .then(response => {
                if (response.data.create === true) {
                    this.setState({ redirect: true })
                }
            })
            .catch(err => console.log(err))
    }

    // finishAction = () => {
    //     this.props.hideModalWindow()
    // }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/profile" />)
        }
        return (
            <>
                <Container className="newpost">
                    <h1 className="title">Write your thougths down here</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="title">
                            <Col sm={10}>
                                <Form.Control name="title" placeholder="Title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="content">
                            <Col sm={10}>
                                <Form.Control name="content" placeholder="Write your text here" as="textarea" rows="3" value={this.state.content} onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="genre">
                            <Col sm={10}>
                                <Form.Label>Choose genre</Form.Label>
                                <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                                    <option>Narrative</option>
                                    <option>NonFiction</option>
                                    <option>Poetry</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="">
                            <Col sm={10}>
                                <Form.Label>Choose typology</Form.Label>

                                <Form.Control as="select" name="typology" value={this.state.typology} onChange={this.handleInputChange}>
                                    <option>Descriptive</option>
                                    <option>Narrative</option>
                                    <option>Expository</option>
                                    <option>Argumentative</option>
                                    <option>Literature</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="cover">
                            <Form.Label>Choose your cover</Form.Label>
                            <Form.Control name="cover" type="file" />
                        </Form.Group>
                        <Button variant="primary" type="submit" >Publish</Button>
                    </Form>
                </Container>
            </>
        )
    }

}

export default NewPost