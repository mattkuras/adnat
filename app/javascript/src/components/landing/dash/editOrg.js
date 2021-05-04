import React, { useState } from 'react';
import './editOrg.css'
import {AiOutlineClose} from 'react-icons/ai'

const EditOrg = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [state, setState] = useState({
        name: '',
        description: '',
        hourlyWage: ''
    })


    return (
        <div className='edit-div'>
            <span className='close-icon' onClick={() => props.setEditOrg(false)}><AiOutlineClose/></span>
            <form onSubmit={props.submitForm}>
                <input type='text'
                    name='name'
                    className='edit-org-input'
                    value={props.org.name}
                    onChange={props.updateForm} />
                <textarea type='textarea'
                    name='description'
                    className='edit-org-input'
                    value={props.org.description}
                    onChange={props.updateForm} />
                <input type='text'
                    name='hourly_rate'
                    className='edit-org-input'
                    value={props.org.hourly_rate}
                    onChange={props.updateForm} />
                <input type='submit' className='submit-button' />
                <button className='delete-button' onClick={props.deleteOrg}>delete</button> 

            </form>
        </div>
    );
}

export default EditOrg;



