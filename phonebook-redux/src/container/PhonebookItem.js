import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePhonebook, updatePhonebook } from '../actions/index';
import '../style.css';

export default function PhonebookItem(props) {
    const [onEdit, setOnEdit] = useState(false)
    const [name, setName] = useState(props.name)
    const [phone, setPhone] = useState(props.phone)

    const dispatch = useDispatch()

    const remove = useCallback(
        () => {
            dispatch(removePhonebook(props.id, name, phone));
        },
        [dispatch, props.id, name, phone],
    );

    const update = useCallback(
        () => {
            dispatch(updatePhonebook(props.id, name, phone));
        },
        [dispatch, props.id, name, phone],
    );

    const handleSubmit = () => {
        if (name !== "" && phone !== "") {
            update()
            setOnEdit(false)
        }
    }

    const cancelSubmit = () => {
        setName(props.name)
        setPhone(props.phone)
        setOnEdit(false)
    }


    if (onEdit) {
        return (
            <tr>
                <th scope="row" style={{ "lineHeight": "35px" }}>{props.index + 1}</th>
                <td>
                    <input type="text" className="input-phonebook input-edit-phonebook" value={name} onChange={(event) => setName(event.target.value)} />
                </td>
                <td>
                    <input type="text" className="input-phonebook input-edit-phonebook" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </td>
                <td>
                    <button type="submit" className="btn btn-warning me-2" style={{ "color": "white" }} onClick={cancelSubmit}>
                        <i className="fas fa-ban me-2"></i>
                        cancel
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        <i className="far fa-check-circle me-2"></i>
                        save
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <th scope="row" style={{ "lineHeight": "35px" }}>{props.index + 1}</th>
                <td style={{ "lineHeight": "35px" }}>{props.name}</td>
                <td style={{ "lineHeight": "35px" }}>{props.phone}</td>
                <td>
                    <button type="submit" className="btn btn-success me-2" onClick={() => { setOnEdit(true) }}>
                        <i className="fas fa-pen me-2"></i>
                        edit
                    </button>
                    <button type="submit" className="btn btn-danger" onClick={remove}>
                        <i className="fas fa-trash-alt me-2"></i>
                        delete
                    </button>
                </td>
            </tr>
        )
    }
}
