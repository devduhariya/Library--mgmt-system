import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'
import Table from '../../AdminTableBook';
// import { Alert } from 'reactstrap';
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            author:'',
            bookDes:'',
            bookImg:'',
            totalBook:'',
            // issuedBook:'',
            id: ''

        };
        this.add = this.add.bind(this);
        this.updateTitleyName= this.updateTitleyName.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.updateBookImg = this.updateBookImg.bind(this);
        this.updateBookDes = this.updateBookDes.bind(this);
        this.updateTotalBook = this.updateTotalBook.bind(this);
        // this.updateIssuedBook = this.updateIssuedBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.update = this.update.bind(this);
        this.editTableRecordHandler = this.editTableRecordHandler.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    add() {
        // console.log('categoryName: ', this.state.categoryName);
        // console.log('categoryDes: ', this.state.categoryDes);
        // console.log('categoryImg: ', this.state.categoryImg);
        const req = {
            title: this.state.title,
            author: this.state.author,
            bookImg: this.state.bookImg,
            bookDes: this.state.bookDes,
            totalBook: this.state.totalBook,
            // issuedBook: this.state.issuedBook,
        };
        console.log('req: ', req);
        axios.post('http://localhost:8000/add/book',{ withCredentials: true }).then(res => {
            this.getBooks();

        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });

    }
    resetState() {
        this.setState({
            title: '',
            author: '',
            bookImg: '',
            bookDes: '',
            totalBook: '',
            // issuedBook: '',
            tableRecord: [],
            id: ''
        });
    }
    update() {
        const req = {
            titleyName: this.state.title,
            author: this.state.author,
            bookImg: this.state.bookImg,
            bookDes: this.state.bookDes,
            totalBook: this.state.totalBook,
            // issuedBook: this.state.issuedBook,
        };
        const id = this.state.id;
        axios.patch('http://localhost:8000/admin/update-book/' + id, req,{ withCredentials: true }).then((res) => {
            this.getBooks();
        }).catch(error => console.log('error: ', error));
       
        alert('Book updated successfully!');
        
    }
    updateTitleyName(evt) {
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
    getBooks() {
        this.resetState();
        axios.get('http://localhost:8000/admin/Books-list',{ withCredentials: true }).then(res => {
            this.setState({
                tableRecord: res.data
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });
    }
    componentDidMount() {
        this.getBooks();
    }
    editTableRecord(evt) {
        this.setState({
            title: evt.target.value,
            author: evt.target.value,
            bookImg: evt.target.value,
            bookDes: evt.target.value,
            totalBook: evt.target.value,
            // issuedBook: evt.target.value
        });
    }
    editTableRecordHandler(id, item) {
        this.setState({
            title: item.title,
            author: item.author,
            bookImg: item.bookImg,
            bookDes: item.bookDes,
            totalBook: item.totalBook,
            // issuedBook: item.issuedBook,
            id: id
        });
    }
    deleteTableRecordHandler(id) {
        console.log({' book in delete:':id});
        axios.delete(`http://localhost:8000/delete-book/${id}`,{ withCredentials: true }).then((res) => {
            // console.log('delete book',res);
            this.getBooks();
            alert('Category deleted successfully');
        }).catch(error => console.log('error: ', error));
        
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Categories</h2>
                <div className="row">
                    <div className="table-responsive">
                        <Table
                            data={this.state.tableRecord}
                            editTableRecord={this.editTableRecordHandler}
                            deleteTableRecord={this.deleteTableRecordHandler} />
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col">
                        <input type="text" value={this.state.title} onChange={this.updateTitleyName} className="form-control" placeholder="Book Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <textarea type="text" value={this.state.author} onChange={this.updateAuthor} className="form-control" placeholder=" Add Author" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="text" value={this.state.bookImg} onChange={this.updateBookImg} className="form-control" placeholder="Add image url here" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" value={this.state.bookDes} onChange={this.updateBookDes} className="form-control" placeholder="Add Book Description" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <textarea type="number" value={this.state.totalBook} onChange={this.updateTotalBook} className="form-control" placeholder="Add total Book" />
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
export default Books;