import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                }
        ).catch (error => {
            throw error;
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            window.location.href = '/';

            return response;

        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div className="login_div text-center">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                    <label for="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={this.state.password} onChange={this.handleChange}
                    />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Login;