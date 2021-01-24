import Header from './shared/Header'
import Footer from './shared/Footer'
import React, { Component } from 'react'
import axios from 'axios'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.checkLogin = this.checkLogin.bind(this);
    }
    checkLogin() {
        console.log('in chk login');
        axios.get('http://localhost:8000/session', { withCredentials: true }).then(res => {
            console.log('res: session', res);
            if (res.data.session && res.data.session.userEmail) {
                this.setState({
                    isLoggedIn: true
                });
            }else{
                this.setState({
                    isLoggedIn: false
                });
            }

        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                isLoggedIn: false
            });
        });
    }
    componentDidMount() {
        this.checkLogin()
    }
    render() {

        return (
            <div>
                <Header isLoggedIn={this.state.isLoggedIn} />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
export default Layout;