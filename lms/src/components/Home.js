import Axios from 'axios';
import React, { Component } from 'react';
// import Category from './admin/category/Categoy';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    componentDidMount() {
        Axios.get('http://localhost:8000/categories-list',{ withCredentials: true }).then((res) => {
            this.setState({
                categories: res.data
            })
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    render() {
        return (
            <div className="background">
                
                <div className="jumbotron text-center">
                    {/* <img src="https://www.wilsoninfo.com/welcome/welcomeclipart9.gif" alt=""/> */}
                    <h2>Welcome To Digital Library</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Categories</h2>
                        </div>
                    </div>
                    
                    <div className="row mt-3">
                        {this.state.categories.length > 0 ?
                            this.state.categories.map((data, index) => {
                                return (
                                    <div className="col-4 mb-3" key={index}>
                                        <div className="card" >
                                            <img className="card-img-top" src={data.categoryImg} alt="" height="200" width="250" />
                                            <div className="card-body">
                                                <h5 className="card-title">{data.categoryName}</h5>
                                                <p className="card-text">{data.categoryDes}</p>
                                                {/* <a href="#" className="btn btn-primary">Get</a> */}
                                                <Link className="btn btn-info btn-sm" to={`/Books/${data._id}`}>View</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <div ><Spinner color="primary" /></div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}
export default Home;