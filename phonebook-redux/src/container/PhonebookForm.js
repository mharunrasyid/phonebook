import '../style.css';
import React, { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { addPhonebook } from '../actions'

export default function PhonebookForm(props) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const dispatch = useDispatch()

    const add = useCallback(
        () => {
            dispatch(addPhonebook(name, phone))
        },
        [dispatch, name, phone],
    );

    const handleSubmit = (event) => {
        if (name !== "" && phone !== "") {
            add()
            setName("");
            setPhone("");
            props.setOnAdd(false)
        }

        event.preventDefault();
    }

    return (
        <div className="card form-card">
            <div className="card-header" style={{ "padding": "15px 20px" }}>
                Adding Form
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <label className="fw-bold">
                        Name
                        <input type="text" className="input-phonebook" value={name} onChange={(event) => setName(event.target.value)} placeholder="name" />
                    </label>
                    <label className="fw-bold">
                        Phone
                        <input type="text" className="input-phonebook" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="phone" />
                    </label>
                    <button type="submit" className="btn btn-success me-2">
                        <i className="far fa-check-circle me-2"></i>
                        Save
                    </button>
                    <button type="button" className="btn btn-warning" style={{ "color": "white" }} onClick={() => props.setOnAdd(false)}>
                        <i className="fas fa-ban me-2"></i>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}
