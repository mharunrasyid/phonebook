import '../style.css';
import PhonebookForm from "../container/PhonebookForm"
// import PhonebookSearch from "../container/PhonebookSearch"
import PhonebookTable from "../container/PhonebookTable"
import React, { useState } from 'react';

export default function PhonebookBox() {
    const [onAdd, setOnAdd] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [data, setData] = useState({});

    const addPhonebookClick = (value) => {
        setOnAdd(value)
    }

    const searchReset = () => {
        setData({})
        setName("")
        setPhone("")
    }

    const enterSearch = (event) => {
        if (event.key === 'Enter') {
            let data = {}

            if (name && phone) {
                data = {
                    name,
                    phone
                }
            } else if (!name && !phone) {
                data = {}
            } else if (!name) {
                data = {
                    phone
                }
            } else if (!phone) {
                data = {
                    name
                }
            }

            setData(data)
        }
    }

    return (
        <div className="container-box">
            <header className="card-header header-phonebook">
                Phone Book Apps
            </header>
            <main className="main-phonebook">
                <div className="phonebook-add-container">
                    {!onAdd && <button type="button" className="btn btn-primary btn-add" onClick={() => addPhonebookClick(true)}>
                        <i className="fas fa-plus me-2"></i>
                        add
                    </button>}
                    {onAdd && <PhonebookForm setOnAdd={addPhonebookClick} searchReset={searchReset} />}
                    <div className="card form-card">
                        <div className="card-header" style={{ "padding": "15px 20px" }}>
                            Search Form
                        </div>
                        <div className="card-body">
                            <label className="fw-bold">
                                Name
                                <input type="text" className="input-phonebook" value={name} onChange={(event) => setName(event.target.value)} onKeyDown={enterSearch} placeholder="name" />
                            </label>
                            <label className="fw-bold">
                                Phone
                                <input type="text" className="input-phonebook" value={phone} onChange={(event) => setPhone(event.target.value)} onKeyDown={enterSearch} placeholder="phone" />
                            </label>
                        </div>
                    </div>
                    <PhonebookTable searchData={data} searchReset={searchReset} />
                </div>
            </main>
        </div>
    )
}
