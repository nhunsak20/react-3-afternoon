import React, { Component } from 'react';
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'

import { baseURL } from '../baseURL'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseURL).then(response => {
      // toast.success('Success Get')
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      /*toast.error(err)*/ 
      console.error(err)
    })
  }

  updatePost(id, text) {
    axios.put(`${baseURL}/?id=${id}`, { text }).then(response => {
      // toast.success('Success Post')
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      /*toast.error(err)*/ 
      console.error(err)
    })
  }

  deletePost(id) {
    axios.delete(`${baseURL}?id=${id}`).then(response => {
      // toast.success('Success Delete')
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      /*toast.error(err)*/ 
      console.error(err)
    })
  }

  createPost(text) {
    axios.post(baseURL, { text }).then(response => {
      // toast.success('Success Post')
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      /*toast.error(err)*/ 
      console.error(err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        {/* <ToastContainer /> */}
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          { posts.map(post => (
          <Post key={post.id} 
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
          />)) }

        </section>
      </div>
    );
  }
}

export default App;
