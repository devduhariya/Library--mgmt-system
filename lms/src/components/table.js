import React from 'react';

const Table = (props) => {
    console.log('props: ', props);
    const { data } = props;
    console.log('data: ', data);
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th colSpan="2" className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {(data.length > 0) ? data.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{data.categoryName}</td>
                            <td>{data.categoryDes}</td>
                            <td><div className="img img-responsive"> <img src={data.categoryImg} alt="" /> </div></td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => props.editTableRecord(data._id, data)}>Edit </button></td>
                            <td><button className="btn btn-sm btn-danger" onClick={() => props.deleteTableRecord(data._id)}>Delete </button></td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
        </table>
    );
}
export default Table