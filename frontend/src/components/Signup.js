import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });

            window.location.href = '/login/';

            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        return (
            <div className="login_div text-center">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label for="username" className="sr-only">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="User name"
                        required
                        autofocus
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    { this.state.errors.username ? this.state.errors.username : null}

                    <label for="email" className="sr-only">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="E-mail"
                        required
                        autofocus
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    { this.state.errors.email ? this.state.errors.email : null}

                    <label for="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    { this.state.errors.password ? this.state.errors.password : null}

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Signup</button>
                </form>
            </div>
        )
    }
}

export default Signup;