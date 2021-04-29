import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const Dashboard = (props) => {
    const user = props.user
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        fetchOrgs()
    }, [])


    const fetchOrgs = () => {
        const token = localStorage.getItem("token")
        Axios.get('/organizations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            console.log(resp)
            setOrgs(resp.data)
        })
    }

    const OrgsList = () => {
        return <div className='orgslist'>
            {orgs.map((org) => {
                return (
                    <div className='org'>
                        <h1>{org.name}</h1>
                        <h3>{org.description}</h3>
                    </div>
                )
            })}
        </div>
    }

    return (
        <div className='dash-container'>
            <h1>Welcome to Adnat, {user ? user.name : 'name isnt loading'}</h1>
            <OrgsList/>
        </div>
    );
}

export default Dashboard;