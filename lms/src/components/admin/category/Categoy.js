import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'
import Table from '../../table';
// import { Button } from 'reactstrap';
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            categoryDes: '',
            categoryImg: '',
            tableRecord: [],
            id: ''

        };
        this.add = this.add.bind(this);
        this.updateCategoryName = this.updateCategoryName.bind(this);
        this.updateCategoryDes = this.updateCategoryDes.bind(this);
        this.updateCategoryImg = this.updateCategoryImg.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.update = this.update.bind(this);
        this.editTableRecordHandler = this.editTableRecordHandler.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    add() {
        console.log('categoryName: ', this.state.categoryName);
        console.log('categoryDes: ', this.state.categoryDes);
        console.log('categoryImg: ', this.state.categoryImg);
        const req = {
            categoryName: this.state.categoryName,
            categoryDes: this.state.categoryDes,
            categoryImg: this.state.categoryImg,
        };
        axios.post('http://localhost:8000/categories', req, { withCredentials: true }).then(res => {
            this.getCategories();

        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });

    }
    resetState() {
        this.setState({
            categoryName: '',
            categoryDes: '',
            categoryImg: '',
            tableRecord: [],
            id: ''
        });
    }
    update() {
        const req = {
            categoryName: this.state.categoryName,
            categoryDes: this.state.categoryDes,
            categoryImg: this.state.categoryImg,
        };
        const id = this.state.id;
        axios.patch('http://localhost:8000/update-category/' + id, req, { withCredentials: true }).then((res) => {
            this.getCategories();
        }).catch(error => console.log('error: ', error));

        alert('category updated successfully!');

    }
    updateCategoryName(evt) {
        this.setState({
            categoryName: evt.target.value
        });
    }
    updateCategoryDes(evt) {
        this.setState({
            categoryDes: evt.target.value
        });
    }
    updateCategoryImg(evt) {
        this.setState({
            categoryImg: evt.target.value
        });
    }
    getCategories() {
        this.resetState();
        axios.get('http://localhost:8000/categories-list').then(res => {
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
        this.getCategories();
    }
    editTableRecord(evt) {
        this.setState({
            categoryName: evt.target.value,
            categoryDes: evt.target.value,
            categoryImg: evt.target.value
        });
    }
    editTableRecordHandler(id, item) {
        this.setState({
            categoryName: item.categoryName,
            categoryImg: item.categoryImg,
            categoryDes: item.categoryDes,
            id: id
        });
    }
    deleteTableRecordHandler(id) {
        console.log({'in delete:':id});
        axios.delete(`http://localhost:8000/delete-category/${id}`, { withCredentials: true }).then((res) => {
                console.log('delete',res);
            this.getCategories();
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
                        <input type="text" value={this.state.categoryName} onChange={this.updateCategoryName} className="form-control" placeholder="Category Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <textarea type="text" value={this.state.categoryDes} onChange={this.updateCategoryDes} className="form-control" placeholder="Add Category Description" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="text" value={this.state.categoryImg} onChange={this.updateCategoryImg} className="form-control" placeholder="Add image url here" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        {this.state.id !== '' ?
                            <div>
                                <button className="btn btn-sm btn-primary" onClick={this.update}> Update</button>
                                <button className="btn btn-sm btn-warning ml-3" onClick={this.getCategories}> Cancel</button>
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
export default Category;