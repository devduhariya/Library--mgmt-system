import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import { Link } from 'react-router-dom';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookImg: '',
            title: '',
            author: '',
            bookDes: '',
            status: '',
            cart: []
        };
        this.getCart = this.getCart.bind(this);
    }
    getCart() {
        axios.get('http://localhost:8000/cart', { withCredentials: true }).then(res => {
            console.log('res: ', res);
            this.setState({
                cart: res.data.items
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Error while fecthing records, please try again later'
            });
        });
    }
    componentDidMount() {
        this.getCart();
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <Link to={'/'}>Home</Link> */}
                            
                            <div className="page-header text-center">
                                <h1>Your Books</h1>
                            </div>
                        </div>
                    </div>
                    {
                        (this.state.cart.length) > 0 ? this.state.cart.map((item, index) => {
                            const date = new Date(item.addedDate);
                            const dt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                            console.log('date: ', date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                            return (
                                <div key={index}>
                                    <div className="row cart-row mb-3" >
                                        <div className="col-md-2 cart-item-img">
                                            <img className="img-responsive"
                                                src={item.book.bookImg} alt={item.book.title}
                                            />
                                        </div>
                                        <div className="col-md-10">
                                            <h2>{item.book.title}</h2>
                                            <h4>{item.book.author}</h4>
                                            <i>{item.book.bookDes}</i>
                                            <h5>{item.book.status}</h5>
                                            <div>Added Date:{dt}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col"><hr />  </div>
                                    </div>
                                </div>
                            );
                        }) : <div>Your Bucket is empty!</div>
                    }
                </div>
            </div>

        );
    }
}
export default Cart;