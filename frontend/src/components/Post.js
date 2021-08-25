import React from 'react';

export function Post(props) {
    return (
        <div>
            <span>
                {props.data.published_date ? new Date(props.data.published_date).toLocaleDateString() : ''}
            </span>
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

            <br/><br/>

            <div className='post-text text-justify'>
                {props.data.text}
            </div>
        </div>
    );
};