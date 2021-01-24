import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''

        };
        this.signup = this.signup.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }
    signup() {
        console.log('first: ', this.state.firstName);
        console.log('last: ', this.state.lastName);
        console.log('email: ', this.state.email);
        console.log('newPass: ', this.state.password);
        console.log('conPass: ', this.state.confirmPassword);
        const req = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:8000/signup', req,{ withCredentials: true }).then(res => {
            console.log('res:', res);
            alert('succes');
            this.props.history.push('/login');
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Invalid! crendintials'
            });
        });

    }
    updateFirstName(evt) {
        this.setState({
            firstName: evt.target.value
        });
    }
    updateLastname(evt) {
        this.setState({
            lastName: evt.target.value
        });
    }
    updateUserEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    updateConfirmPassword(evt) {
        this.setState({
            confirmPassword: evt.target.value
        });
    }
    checkPassword() {
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        if (password && (password === confirmPassword)) {
            return true;
        } else {
            alert('password and confirm is not matched');
            return false;
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Registration</h2>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="text" value={this.state.firstName} onChange={this.updateFirstName} className="form-control" placeholder="First Name" />
                    </div>
                </div>
                <div className="row my-2">

                    <div className="col-sm">
                        <input type="text" value={this.state.LastName} onChange={this.updateLastname} className="form-control" placeholder="Last Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="email" value={this.state.email} onChange={this.updateUserEmail} className="form-control" placeholder="E-mail id" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" placeholder="New Password" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.confirmPassword} onChange={this.updateConfirmPassword} className="form-control" placeholder="Confirm Password" onBlur={this.checkPassword} />
                    </div>
                </div>
                <div>
                <p>By creating an account you agree to our <a href="#">Terms & Policies</a>.</p>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        <button className="btn btn-sm btn-success mr-3" onClick={this.signup}> Sign up</button>
                        Have an account &nbsp;<Link to={'/login'} className="btn btn-primary btn-sm">Login</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Registration;