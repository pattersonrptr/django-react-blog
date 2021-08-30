import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import {SideNav} from './SideNav';
import PostList from './PostList';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: "",
        };

        this.getLoggedUser = this.getLoggedUser.bind(this);
    }

    async getLoggedUser(){
        try {
            let response = await axiosInstance.get('/logged-user-data/');
            const loggedUser = response.data;

            this.setState({
                userData: loggedUser,
            });

            return loggedUser;

        } catch(error){
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    componentDidMount(){
        const loggedUser = this.getLoggedUser();
        console.log("loggedUser: ", JSON.stringify(loggedUser, null, 4));
    }

    render(){
        /*const isLoggedIn = this.state.userData ? true : false;
        let content;*/

        content = (
            <div className='container'>
                <SideNav user={this.state.userData} />
                <PostList user={this.state.userData} />
            </div>
        );

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default MainContent;
