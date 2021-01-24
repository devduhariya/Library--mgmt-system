import React from 'react';

const AdminTable = (props) => {
    console.log('props: ', props);
    const { data } = props;
    console.log('data: ', data);
    const imgStyles = {
        display: 'block',
        'width': '100%'
    };
    
    return (


        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>ToTal Books</th>
                    {/* <th>Issued Books</th> */}
                    <th colSpan="2" className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {(data.length > 0) ? data.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td><div className="img img-responsive"> <img src={data.bookImg} alt="" style={imgStyles} /> </div></td>
                            <td>{data.title}</td>
                            <td>{data.author}</td>
                            <td>{data.bookDes}</td>
                            <td>{data.totalBook}</td>
                            <td>{data.issuedBook}</td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => props.editTableRecord(data._id, data)}>Edit </button></td>
                            <td><button className="btn btn-sm btn-danger" onClick={() => props.deleteTableRecord(data._id)}>Delete </button></td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
        </table>
    );
}
export default AdminTable