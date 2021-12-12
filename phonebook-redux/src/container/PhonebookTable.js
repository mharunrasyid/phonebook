import '../style.css';
import PhonebookItem from "./PhonebookItem"
import React, { useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadMorePhonebook, loadPhonebook } from '../actions'

export default function PhonebookTable(props) {
    const { phonebooks } = useSelector(state => ({
        phonebooks: state.phonebooks
    }), shallowEqual)

    const offsetRef = useRef(0)
    const dispatch = useDispatch()

    useEffect(() => {
        offsetRef.current = 0
        dispatch(loadPhonebook(props.searchData.name ? props.searchData.name : "", props.searchData.phone ? props.searchData.phone : "", 10, offsetRef.current))
    }, [dispatch, props.searchData.name, props.searchData.phone])

    const handleScroll = useCallback(() => {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            if (offsetRef.current <= (Math.ceil(phonebooks.dataCount / 10) - 1)) {
                offsetRef.current++
                dispatch(loadMorePhonebook(props.searchData.name ? props.searchData.name : "", props.searchData.phone ? props.searchData.phone : "", 10, offsetRef.current))
            }
        }
    }, [dispatch, phonebooks, props.searchData.name, props.searchData.phone])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const nodeList = phonebooks?.data?.map((item, index) => (
        <PhonebookItem
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            phone={item.phone}
            searchReset={props.searchReset} />
    ))

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
