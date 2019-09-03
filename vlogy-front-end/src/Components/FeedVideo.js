import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import FeedComment from './FeedComment'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Draggable, { DraggableCore } from 'react-draggable';


class Videos extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            red:false
        }
    }

    handleInput = (event) => {
        this.setState({ comment: event.target.value })

    }
    commentfunction = () => {
        let data = {
            username: localStorage.getItem("username"),
            videoId: this.props.vid.id,
            comment: this.state.comment,
            uploader: this.props.vid.user.username
        }
        this.props.comment(data)
        this.setState({
            comment: ""
        })
    }
    like = () => {
        let vid = this.props.vid
        let data = {
            username: localStorage.getItem("username"),
            videoId: vid.id,
            uploader: vid.user.username
        }
        this.props.likeVid(data)
        console.log(data)
        this.setState({
            red:!this.state.red
        })
    }

    render() {
        let vid = this.props.vid

        let touser = `/user/${vid.user.username}`
        return (



            <div className='video-cont'>
                <div>
                    <div class="card5">
                    <input className="commentsss" type='text' value={this.state.comment} onChange={this.handleInput} placeholder='comment' />
                                <span onClick={this.commentfunction}><i class="fas fa-paper-plane"></i></span>
                        <div class="container">
                       
                            <h3>{vid.user.name} {localStorage.getItem("username") === vid.user.username ? <a href='/userprofile'><img className="usernameimg2" src={vid.user.profilePic} /></a> : <a href={touser}><img className="usernameimg2" src={vid.user.profilePic} /></a>} </h3>

                            <div className="commentsfedd">

                                {vid.comments.map(c => <FeedComment c={c} vid={vid} deleteComment={this.props.deleteComment} />)}
                               
                            </div>
                        
                            <div className="date">{moment(this.props.date).subtract(6, 'days').calendar(this.props.date)}</div>
                            <video className="videossss" width="350" height="250" controls>
                                <source src={`http://localhost:5000/video/${vid.id}`} />
                            </video>
                            {/* {this.props.users === localStorage.getItem("username") ? <div><span onClick={this.like}><i class="fas fa-heart"></i></span>{vid.likes.num}</div> : <div><span onClick={this.like}><i class="far fa-heart"></i> */}

                            {/* </span>{vid.likes.num}</div>} */}
                            
                            <div><span onClick={this.like}><i class="fas fa-heart" id={this.state.red ? "red"  : "b"}></i></span>{vid.likes.num}</div>

                        </div>

                    </div>
                </div>
                <br></br>
            </div>


        )
    }
}

export default Videos
