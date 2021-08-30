import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MainContent from "./MainContent";
import axiosInstance from "../axiosApi";


class App extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;

            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div className="site">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className={"nav-link navbar-brand"} to={"/main/"}>Home</Link>
                    <Link className={"nav-link navbar-brand"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link navbar-brand"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link navbar-brand"} to={"/login/"} onClick={this.handleLogout}>Logout</Link>
                </nav>
                <main>
                    <Switch>
                        <Route exact path={"/"} component={MainContent}/>
                        <Route exact path={"/main/"} component={MainContent}/>
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
