import React, { useState } from 'react'
import Axios from 'axios'
import './newOrgForm.css'

const NewOrgForm = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')

    const createOrg = () => {
        let organization = { name, description, hourly_rate: hourlyRate }
        Axios.post('/organizations', organization)
            .then(resp => {
                if (resp.data.success) {
                    console.log(resp)
                    props.setOrgs(...prevOrgs, resp.data.organization)
                }
                else {
                    console.log(resp.data)
                }
            })
    }

    return (
        <form className='new-org-form' onSubmit={createOrg}>
            <h2>Create a New Organization</h2>
            <input type='text'
                placeholder='name'
                className='org-input'
                value={name}
                onChange={e => setName(e.target.value)} />
            <textarea
                name='description'
                placeholder='desciption'
                className='org-input'
                value={description}
                onChange={e => setDescription(e.target.value)} />
            <input type='text'
                name='hourly_rate'
                placeholder='hourly rate'
                className='org-input'
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)} />
            <input type='submit' className='submit-button' />
        </form>
    )
}
export default NewOrgForm;