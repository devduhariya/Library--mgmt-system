import React, { Component } from 'react';
import Axios from 'axios'
import Book from './Book';
// import { Alert } from 'reactstrap';
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            userId: '',
            bookId: '',
            categoryId: '',
            addedDate: ''
        };
        this.addToCart = this.addToCart.bind(this);
    }

    editCartRecord(evt) {
        this.setState({
            userId: evt.target.value,
            bookId: evt.target.value,
            categoryId: evt.target.value,
            addedDate: evt.target.value
        });
    }
    // save to cart
    addToCart(id, item) {
        let req = {
            categoryId: item.categoryId,
            bookId: item._id
        };
        console.log('req: ', req);
        Axios.post('http://localhost:8000/add-to-cart', req, { withCredentials: true }).then((res) => {
            console.log('book added: ', res);
            alert('Book added in your cart');
            this.props.history.push('/cart');

        }).catch(error => console.log('error in add to cart', error.message))
    }
    componentDidMount() {
        const params = this.props.match.params;
        // console.log('params: ', params)

        const id = params.id;
        Axios.get('http://localhost:8000/book/' + id).then((res) => {
            console.log('res in books: ', res);
            this.setState({
                books: res.data,
            })
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row my-3">
                        <div className="col">
                            <h2>Books</h2>
                            <hr />
                        </div>
                    </div>
                    <div>
                        {(this.state.books.length) > 0 ?
                            this.state.books.map((data, index) => {
                                return (
                                    <Book book={data} key={index} addCartHandler={this.addToCart} />
                                );
                            })
                            : <div>No Book Available</div>}
                    </div>
                </div>
            </div>
        );
    }
}
export default Books;