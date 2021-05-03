import React, { useContext, useState } from 'react';
import './home.css'
import Axios from 'axios'
import { UserContext } from '../../../userContext';
import NewOrgForm from './newOrgForm'

const Home = (props) => {
    const [message, setMessage] = useState('')
    const context = useContext(UserContext)


    // if user has not joined any orgs display this
    const NoOrgsMessage = () => {
        return <div>
            <h3>You're not yet a member of any organizations. Join an existing one or create a new one.</h3>
        </div>
    }

    // function to join orgs and create job object
    const joinOrLeaveOrg = (orgId, status) => {
        const token = localStorage.getItem("token")
        if (token) {
            let job = { user_id: user.id, organization_id: orgId }
            let url;
            status == 'join' ? url = 'jobs' : 'leave_org'
            Axios.post(`/${url}`, { job }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => {
                    if (resp.data.success == 'joined') {
                        setUserOrgs(userOrgs.push(resp.data.org))
                        setMessage("you're in!")
                    }
                    else if (resp.data.success == 'left') {
                        
                    }
                })
        }
    }

    // functions to show and hide the edit/display pages
    const displayShowPage = (org) => {
        props.setOrg(org);
        props.setShowOrg(true)
    }
    const displayEditPage = (org) => {
        props.setOrg(org);
        props.setEditOrg(true)
    }

    // display all orgs in db
    const OrgsList = () => {
        return <div className='orgslist' >
            <h1>Organiztions</h1>
            <p>{message}</p>
            {props.orgs.map((org) => {
                return (
                    <div className='org' key={org.id}>
                        <div className='edit-join'>
                            <a onClick={() => displayShowPage(org)}><h1>{org.name}</h1></a>
                            <a onClick={() => displayEditPage(org)}><h4>(edit</h4></a>
                            <a onClick={() => joinOrg(org.id, status)} ><h4>{context.userOrgs.find(o => o.id == org.id) ? 'leave)' : 'join)'}</h4></a>
                        </div>
                        <h3 >{org.description}</h3>
                    </div>
                )
            })}
        </div>
    }

    return (
        <div>
            <h1>Welcome to Adnat, {context.user ? context.user.name : 'name isnt loading'}</h1>
            {context.userOrgs.length == 0 ? <NoOrgsMessage /> : null}
            <NewOrgForm setOrgs={props.setOrgs} />
            <OrgsList />
        </div>
    );
}

export default Home;
