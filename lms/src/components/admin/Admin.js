import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './../App.css';
class Admin extends Component {
    // constructor(props) {
    //     super(props);

    // };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header text-center">
                                <h1>Admin Page</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">

                                <img src="https://thumbs.dreamstime.com/b/admin-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135742404.jpg " width="100%" alt=""></img>
                            </div>
                            <div className="col-md-8">

                                <Link to={'/admin/category/add-update'} className="col-md-8 btn btn-info btn-lg ml-2 mt-5">Add Or update Category</Link>
                                <div className="row">
                                    <div className="col"><hr/></div>
                                </div>
                                <Link to={'/admin/books'} className="col-md-8 btn btn-info btn-lg ml-2">Add Or update Books</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;
