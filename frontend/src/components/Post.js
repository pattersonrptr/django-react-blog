import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import PostDetail from "./PostDetail";

export function Post(props) {
    let postUserId = props.data.author ? props.data.author : null;

    return (
        <div>
            <span>
                {props.data.published_date ? new Date(props.data.published_date).toLocaleDateString() : ''}
            </span>
            {props.loggedUser.id == postUserId ? (
                <div className="justify-content-between align-items-center d-flex">
                    <span
                      className={`post-title mr-2 font-weight-bold ${
                        props.is_published ? "completed-post" : ""
                      }`}
                      title={props.data.title}
                    >
                      {props.data.title}
                    </span>
                    <span>
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={props.handleEditItem}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={props.handleDelete}
                      >
                        Delete
                      </button>
                    </span>
                </div>
            ) : null}

            <br/><br/>

            <div className='post-content post-text text-justify'>
                {props.data.text}
                <Link to={"/post/" + props.data.id}>Read</Link>
            </div>

        </div>
    );
};