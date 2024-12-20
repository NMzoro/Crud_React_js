import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Hello() {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [note, setNote] = useState('');
    const [etdList, setEtd] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedList = [...etdList];
            updatedList[editIndex] = { first, last, note };
            setEtd(updatedList);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setEtd([...etdList, { first, last, note }]);
        }
        setFirst('');
        setLast('');
        setNote('');

        const modalCloseButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (modalCloseButton) {
            modalCloseButton.click();
        }
    };

    const startEdit = (index) => {
        const student = etdList[index];
        setFirst(student.first);
        setLast(student.last);
        setNote(student.note);
        setIsEditing(true);
        setEditIndex(index);
    };

    const deleteStudent = (index) => {
        const updatedList = etdList.filter((_, i) => i !== index);
        setEtd(updatedList);
    };

    const displayEtudiants = () => {
        if (etdList.length === 0) {
            return (
                <tr>
                    <td colSpan="5" align="center">Aucun Résultat</td>
                </tr>
            );
        }
        return etdList.map((etd, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{etd.last}</td>
                <td>{etd.first}</td>
                <td>{etd.note}</td>
                <td>
                    <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(index)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        <i className="bi bi-pen"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(index)}
                    >
                        <i className="bi bi-person-dash"></i>
                    </button>
                </td>
            </tr>
        ));
    };
    const filtrage = () => {
        const searchText = document.querySelector('#text').value.toLowerCase();
        const filtered = etdList.filter((etd) => {
            return etd.first.toLowerCase().includes(searchText) || etd.last.toLowerCase().includes(searchText);
        });
        setEtd(filtered);
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4">List of Students</h1>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        id="text"
                        className="form-control w-50"
                        placeholder="Search for a student..."
                    />
                <button className="btn btn-success ms-3" onClick={filtrage}>Filtrer</button>
                    <button className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        {isEditing ? 'Edit Student' : 'Add Student'}
                    </button>
                </div>

                {/* Table */}
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Note</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{displayEtudiants()}</tbody>
                </table>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {isEditing ? 'Edit Student' : 'New Student'}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="first-name" className="col-form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        value={first}
                                        onChange={(e) => setFirst(e.target.value)}
                                        className="form-control"
                                        placeholder="Last Name"
                                        id="first-name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last-text" className="col-form-label">First Name:</label>
                                    <input
                                        type="text"
                                        value={last}
                                        onChange={(e) => setLast(e.target.value)}
                                        className="form-control"
                                        placeholder="First Name"
                                        id="last-text"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="note-text" className="col-form-label">Note:</label>
                                    <input
                                        type="number"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="form-control"
                                        placeholder="Note"
                                        id="note-text"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">
                                {isEditing ? 'Save Changes' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
