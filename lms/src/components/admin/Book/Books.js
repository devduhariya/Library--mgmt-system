import React, { Component } from 'react';
import axios from 'axios';
import Table from './../AdminTableBook';

class AdminBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookImg: '',
            title: '',
            author: '',
            bookDes: '',
            totalBook: '',
            // issuedBook: '',
            books: [],
            id: '',
            categoryList: [],
            selectedCategory:''
        };
        this.getBooks = this.getBooks.bind(this);
        this.add = this.add.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.updateBookImg = this.updateBookImg.bind(this);
        this.updateBookDes = this.updateBookDes.bind(this);
        this.updateTotalBook = this.updateTotalBook.bind(this);
        // this.updateIssuedBook = this.updateIssuedBook.bind(this);
        this.update = this.update.bind(this);
        this.editTableRecordHandler = this.editTableRecordHandler.bind(this);
        this.resetState = this.resetState.bind(this);
        this.getCategory=this.getCategory.bind(this)
        this.handleCategory = this.handleCategory.bind(this);
    }

    resetState() {
        this.setState({
            title: '',
            author: '',
            bookImg: '',
            bookDes: '',
            totalBook: '',
            // issuedBook: '',
            books: [],
            id: ''
        });
    }
    update() {
        const req = {
            title: this.state.title,
            author: this.state.author,
            bookDes: this.state.bookImg,
            bookImg: this.state.bookImg,
            totalBook: this.state.totalBook,
            // issuedBook: this.state.issuedBook,
        };
        const id = this.state.id;
        axios.patch('http://localhost:8000/update-book/' + id,req,{ withCredentials: true } ).then((res) => {
            this.getCategories();
        }).catch(error => console.log('error: ', error));
        alert('category updated successfully!');
    }
    getBooks() {
        axios.get('http://localhost:8000/books').then(res => {
            this.setState({
                books: res.data
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Error while fecthing records, please try again leter'
            });
        });
    }
    getCategory(){
        axios.get('http://localhost:8000/categories-list').then(res => {
            this.setState({
                categoryList: res.data,
                selectedCategory: res.data[0]._id
            });
        }).catch(error => {
            console.log('Error: ', error);
            // this.setState({
            //     errorMessage: 'Incorrect info'
            // });
        });
    }
    updateTitle(evt) {
        this.setState({
            title: evt.target.value
        });
    }
    updateAuthor(evt) {
        this.setState({
            author: evt.target.value
        });
    }
    updateBookImg(evt) {
        this.setState({
            bookImg: evt.target.value
        });
    }
    updateBookDes(evt) {
        this.setState({
            bookDes: evt.target.value
        });
    }
    updateTotalBook(evt) {
        this.setState({
            totalBook: evt.target.value
        });
    }
    // updateIssuedBook(evt) {
    //     this.setState({
    //         issuedBook: evt.target.value
    //     });
    // }
    componentDidMount() {
        this.getBooks();
        this.getCategory();
    }

    add() {
        const req = {
            bookDes: this.state.bookDes,
            title: this.state.title,
            author: this.state.author,
            bookImg: this.state.bookImg,
            totalBook: this.state.totalBook,
            categoryId: this.state.selectedCategory
        };
        console.log('select: ', req);
        axios.post('http://localhost:8000/add/book', req, { withCredentials: true }).then(res => {
            this.getBooks();

        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });
    }
    editTableRecord(evt) {
        this.setState({
            bookImg: evt.target.value,
            title: evt.target.value,
            author: evt.target.value,
            bookDes: evt.target.value,
            totalBook: evt.target.value,
            // issuedBook: evt.target.value
        });
    }
    editTableRecordHandler(id, item) {
        this.setState({
            bookImg: item.bookImg,
            title: item.title,
            author: item.author,
            bookDes: item.bookDes,
            totalBook: item.totalBook,
            // issuedBook: item.issuedBook,
            id: id
        });
    }
    handleCategory(evt){
        console.log('selected value: ', evt);
        this.setState({
            selectedCategory: evt.target.value
        });
    }
    deleteTableRecordHandler(id) {
        axios.delete('http://localhost:8000/delete-book/' + id,{ withCredentials: true }).then((res) => {
            this.getBooks();
        }).catch(error => console.log('error: ', error));
        alert('Book deleted successfully');
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Books</h2>
                <div className="row">
                    <div className="table-responsive">
                        <Table
                            data={this.state.books}
                            editTableRecord={this.editTableRecordHandler}
                            deleteTableRecord={this.deleteTableRecordHandler} />
                    </div>
                </div>
                <label>Select Category:
                    <select value={this.state.selectedCategory} onChange={this.handleCategory}>
                        {this.state.categoryList.map(value => (
                            <option key={value._id} value={value._id}>
                                {value.categoryName}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="text" value={this.state.bookImg} onChange={this.updateBookImg} className="form-control" placeholder="Add image url here" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" value={this.state.title} onChange={this.updateTitle} className="form-control" placeholder="Book Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" value={this.state.author} onChange={this.updateAuthor} className="form-control" placeholder=" Add Author" />
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col">
                        <textarea type="text" value={this.state.bookDes} onChange={this.updateBookDes} className="form-control" placeholder="Add Book Description" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="number" value={this.state.totalBook} onChange={this.updateTotalBook} className="form-control" placeholder="Add total Book" />
                    </div>
                </div>
                {/* <div className="row my-2">
                    <div className="col-sm">
                        <input type="number" value={this.state.issuedBook} onChange={this.updateIssuedBook} className="form-control" placeholder="Issued Book " />
                    </div>
                </div> */}
                <div className="row my-2">
                    <div className="col text-right">
                        {this.state.id !== '' ?
                            <div>
                                <button className="btn btn-sm btn-primary" onClick={this.update}> Update</button>
                                <button className="btn btn-sm btn-warning ml-3" onClick={this.getBooks}> Cancel</button>
                            </div>
                            :
                            <button className="btn btn-sm btn-success ml-3" onClick={this.add}> Add</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default AdminBooks;