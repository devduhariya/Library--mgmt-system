import React, { Component } from 'react';
import axios from 'axios'
class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersRecord: []
        };
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        axios.get('http://localhost:8000/user-list',).then(res => {
            console.log("users",res);
            this.setState({
                usersRecord: res.data,
                
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'No data available'
            });
        });
    }
    render() {

        return (
            <div className="container mt-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            {/* <th colSpan="2" className="text-center">Actions</th> */}
                        </tr>

                    </thead>
                    <tbody>
                {(this.state.usersRecord.length > 0) ? this.state.usersRecord.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{data.firstName+' '+ data.lastName}</td>
                            <td>{data.email}</td>
                            <td>{data.role}</td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
                </table>
            </div>
        );
    }
}
export default Users