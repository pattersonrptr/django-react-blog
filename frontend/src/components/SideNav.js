import React from 'react';

export function SideNav(props) {
    return (
        <div className="SideNav">
            <a href="#section"><h2>About {props.user.username}</h2></a>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    );
};
