import '../style.css';
import PhonebookItem from "./PhonebookItem"
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadPhonebook } from '../actions'

export default function PhonebookTable(props) {
    const { phonebooks } = useSelector(state => ({
        phonebooks: state.phonebooks
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPhonebook(props.searchData.name ? props.searchData.name : "", props.searchData.phone ? props.searchData.phone : ""))
    }, [dispatch])

    const nodeList = phonebooks.map((item, index) => (
        <PhonebookItem
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            phone={item.phone} />
    ))

    // console.log(props.searchData);
    
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {nodeList}
            </tbody>
        </table>
    )
}
