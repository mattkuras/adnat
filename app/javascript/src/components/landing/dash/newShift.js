import React, { useState, useContext } from 'react'
import { UserContext } from '../../../userContext'
import Axios from 'axios'

const NewShift = (props) => {
    const context = useContext(UserContext)
    const [state, setState] = useState({
        shift_date: '',
        start_time: '',
        end_time: '',
        break_length: ''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        let shift = {
            start_time: state.start_time,
            end_time: state.end_time,
            break_length: state.break_length,
            user_id: context.user.id,
            organization_id: props.org.id
        }
        let date = {shift_date:state.shift_date}
        Axios.post("/shifts", {shift, date})
            .then(resp => {
                if (resp.data.success == 'ok') {
                    console.log(props.orgs)
                    console.log(resp.data)
                    props.setOrgs(resp.data.orgs)
                }
                else {
                    console.log(resp.data.error)
                }
            })
        setState({
            shift_date: '',
            start_time: '',
            end_time: '',
            break_length: ''
        })
    }


    return (
        <div className='shift-table-row with-form'>
            <div className='col-1'>{context.user.name}</div>
            <div className='col-2'><input onChange={handleChange} type='text' placeholder='date' name='shift_date' /></div>
            <div className='col-3'><input type='text' onChange={handleChange} placeholder='start time' name='start_time' /></div>
            <div className='col-4'><input type='text' onChange={handleChange} placeholder='end time' name='end_time' /></div>
            <div className='col-5'><input type='text' onChange={handleChange} placeholder='break(s)' name='break_length' /></div>
            <div className='col-8'><button className='new-shift-button' onClick={handleSubmit} >create shift</button></div>
        </div>
    );
}

export default NewShift;