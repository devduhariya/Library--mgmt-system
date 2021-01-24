import React from 'react';

const Book = (props) => {
    const imgStyles = {
        display: 'block',
        'width': '100%'
    };
    return (
        <div>
            <div className="row my-2" >
                <div className="col-sm-4">
                    <img src={props.book.bookImg} alt={props.book.title} style={imgStyles} />
                </div>
                <div className="col-sm-8" >
                    <div><h3>Title: {props.book.title}</h3></div>
                    <div>About Book: {props.book.bookDes}</div>
                    <div>Author: {props.book.author}</div>
                    <div>Available Books: {props.book.totalBook}</div>
                    {/* <div>Issued Books:{props.book.issuedBook}</div>  */}
                <button className="btn btn-info btn-primary my-2" onClick={() => props.addCartHandler(props.book._id, props.book)}>Add to Bucket</button>
                </div>
            </div>
            <div className="row">
                <div className="col"><hr /></div>
            </div>
        </div>
    )
}
export default Book;