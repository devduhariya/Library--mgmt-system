/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import axios from 'axios';
class Header extends Component {
    constructor(props) {
        super(props);
        console.log('header: ', props.isLoggedIn, ' isAdmin: ', props.isAdmin);

        this.logout = this.logout.bind(this);
    }
    logout() {
        axios.get('http://localhost:8000/logout', { withCredentials: true }).then((res) => {
            console.log({ res });
            window.location.pathname = '/login';
            // this.props.history.push('/login');
        }).catch((error) => {
            alert('unable to logout, please try again later');
        })
    }
    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                    <div className="container-fluid" >
                        <img className="shadow-sm bg-white rounded"
                            src="https://images.cdn3.stockunlimited.net/preview1300/e-library-on-laptop_1819141.jpg"
                            alt="Turning Pages"
                            height="60" />
                        <a className="navbar-brand" >
                            <h3> &nbsp;&nbsp;<i> Digital Library </i></h3 >
                        </a>
                        <div className="collapse navbar-collapse"
                            id="navbarsExample07" >
                            <ul className="navbar-nav ml-auto" >
                                {
                                    this.props.isAdmin ? (
                                        <li className="nav-item nav-link" onClick={() => { window.location.pathname = '/Admin' }}> Admin</li>
                                    ) : ''
                                }

                                <li className="nav-item nav-link" onClick={() => { window.location.pathname = '/' }}>Home</li>

                                {
                                    this.props.isLoggedIn ? (

                                        <li className="nav-item ml-3" >
                                            <button className="nav-link btn-danger btn"
                                                onClick={this.logout} > Logout </button>
                                        </li>

                                    ) : <li className="nav-item ml-3" >
                                            <button className="nav-link btn-primary btn"
                                                onClick={() => { window.location.pathname = '/login' }} >Log in </button>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;