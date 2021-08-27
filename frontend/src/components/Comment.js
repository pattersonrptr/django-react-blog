import React from 'react';

export function Comment(props) {
    return (
        <div className="Comment">
            <div>
                <p>User Name</p>
                <br>
                <p>Comment Date</p>
            </div>
            <div>
                Comment Content
            </div>
        </div>
    );
};