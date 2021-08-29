import React from 'react';

export function Comment(props) {
    return (
        <div className="Comment">
            <div>
                <p>{props.data.name}</p>
                <br />
                <p>{props.data.email}</p>
                <br />
                <p>{props.data.created_on ? new Date(props.data.created_on).toLocaleDateString() : ''}</p>
            </div>
            <div>
                {props.data.body}
            </div>
        </div>
    );
};