import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './home.css'
import Axios from 'axios'


const Home = (props) => {
    const [message, setMessage] = useState('')
    const user = props.user
    const orgs = props.orgs
    let { path, url } = useRouteMatch();

    const NoOrgsMessage = () => {
        if (user.organizations !== undefined && user.organizations.length > 0) {
            return null
        }
        else {
            return <div>
                <h3>You're not yet a member of any organizations. Join an existing one or create a new one.</h3>
            </div>
        }
    }

    const joinOrg = (orgId) => {
        if (user.organizations.find(org => org.id == orgId)) {
            setMessage("you're already a member of that organization")
        }
        else {
            const token = localStorage.getItem("token")
            if (token) {
                let job = { user_id: user.id, organization_id: orgId }
                Axios.post('/jobs', { job }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(resp => {
                        if (resp.data.success) {
                            console.log(resp.data)
                            setMessage("you're in!")
                            redirect(orgId)
                        }
                        else {
                            console.log(resp.data)
                        }
                    })
            }
        }
    }

    let history = useHistory()
    const redirect = (id) => {
        console.log('hit redirect')
        history.push(`${url}/orgs/${id}`);
    };

    const OrgsList = () => {
        return <div className='orgslist' >
            <p>{message}</p>
            {orgs.map((org) => {
                return (
                    <div className='org' key={org.id}>
                        <div className='edit-join'>
                            <h1>{org.name}</h1>
                            <a><h4>(edit</h4></a>
                            <a onClick={e => joinOrg(org.id)} ><h4>join)</h4></a>
                        </div>
                        <h3 >{org.description}</h3>
                    </div>
                )
            })}
        </div>
    }

    return (
        <div>
            <h1 onClick={e => console.log(props.user.organizations)}>Welcome to Adnat, {user ? user.name : 'name isnt loading'}</h1>
            {props.user && props.user.organizations > 0 ? console.log(true) : <NoOrgsMessage />}
            <OrgsList />
        </div>
    );
}

export default Home;
