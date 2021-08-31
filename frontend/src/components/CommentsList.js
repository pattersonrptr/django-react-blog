import React, { Component } from "react";
import {Comment} from "./Comment";
import axios from "axios";
import {connect} from 'react-redux';
import {getComments, createComment} from '../store/actions/commentsAction';
import {Button} from "reactstrap";


class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentList: [],
            activeItem: {
                post: "",
                body: "",
            }
        };

        this.refreshList = this.refreshList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.createItem = this.createItem.bind(this);
    }

    componentDidMount() {

        console.log('PROPS ' + this.props.post.id)
        this.refreshList();
    }

    refreshList = async () => {
        await this.props.getComments(this.props.post.id)
        const {comments} = this.props.comments;
        this.setState({ commentList: comments });
    };

    handleChange(event) {
        this.setState(
            {
                activeItem: {
                    post: this.props.post.id,
                    body: event.target.value,
                }
            }
        );
    }

    handleSubmit = item => async event => {
        event.preventDefault();

        try {
            if (item.id) {
                // await this.props.updateComment(item);
                this.refreshList();
                return;
            }

            await this.props.createComment(item);
            this.refreshList();
            return;

        } catch (error) {
            throw error;
        }
    };
/*
    createItem = () => {
        const item = {
            post: this.props.post_id,
            name: "",
            email: "",
            body: "",
        };

        this.setState(
            {
                activeItem: item,
                modal: !this.state.modal
            }
        );
    };*/

    renderItems = () => {
        const newItems = this.state.commentList;

        return newItems.map((item) => (
            <li
                key={item.id}
                className="list-group-item align-items-center"
            >
                <Comment data={item} />
            </li>
        ));


        return;
    };

    render() {
        const {comments} = this.props.comments;

        return (
            <div>
                <form className="form-comment" onSubmit={this.handleSubmit(this.state.activeItem)}>
                    <div className="form-group">
                        <h4>Leave a comment</h4>
                        <label htmlFor="message">Message</label>
                        <textarea name="msg" cols="30" rows="3" className="form-control comments-text-area"
                            value={this.state.value}
                            onChange={this.handleChange}>
                        </textarea>
                    </div>

                    <div className="form-group"> <label htmlFor="name">Name</label> <input type="text" name="name" id="fullname" className="form-control" /> </div>
                    <div className="form-group"> <label htmlFor="email">Email</label> <input type="text" name="email" id="email" className="form-control" /> </div>

                    <button className="btn btn-primary" type="button">Post Comment</button>

                </form>
                <ul className="list-group list-group-flush border-top-0">
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({comments:state.comments});

export default connect(mapStateToProps, {getComments, createComment})(CommentsList);
