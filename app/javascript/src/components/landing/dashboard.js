import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './dashboard.css'

const Dashboard = (props) => {
    const user = props.user
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        console.log(props.user)
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

    const NoOrgsMessage = () => {
        return <div>
            <h3>You're not yet a member of any organizations. Join an existing one or create a new one.</h3>
        </div>
    }

    const OrgsList = () => {
        return <div className='orgslist'>
            {orgs.map((org) => {
                return (
                    <div className='org'>
                        <div className='org-contain'>
                            <h1>{org.name}</h1>
                            <a><h4>(edit</h4></a>
                            <a><h4>join)</h4></a>
                        </div>
                        <h3 >{org.description}</h3>
                    </div>
                )
            })}
        </div>
    }

    return (
        <div className='dash-container'>
            <h1 onClick={e => console.log(user.organizations)}>Welcome to Adnat, {user ? user.name : 'name isnt loading'}</h1>
            {
        props.user == undefined ? null : <NoOrgsMessage/>
            }
            <OrgsList />
        </div>
    );
}

export default Dashboard;