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
                    Comment
                    <textarea name="comment" value={this.state.value} onChange={this.handleChange} />
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Submit
                    </button>
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
