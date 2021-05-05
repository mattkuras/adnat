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
            let job = { user_id: context.user.id, organization_id: orgId }
            let url;
            status == 'join' ? url = 'jobs' : url = 'leave_org'
            Axios.post(`/${url}`, { job }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => {
                    console.log(resp.data)
                    if (resp.data.success == 'joined') {
                        context.setUserOrgs(prevOrgs => [...prevOrgs, resp.data.org])
                    }
                    else if (resp.data.success == 'left') {
                        console.log(context.userOrgs)
                        let newOrgsList = context.userOrgs.filter(o => o.id != resp.data.id)
                        console.log(newOrgsList)
                        context.setUserOrgs(newOrgsList)

                    }
                    else {
                        console.log(resp.data)
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
                let status;
                context.userOrgs.find(o => o.id == org.id) ? status = 'leave' : status = 'join'
                return (
                    <div className='org' key={org.id}>
                        <div className='edit-join'>
                            <a className='org-edit' onClick={() => displayShowPage(org)}>{org.name}</a>
                            <a className='org-edit' onClick={() => displayEditPage(org)}>(edit</a>
                            <a className='org-edit' onClick={() => joinOrLeaveOrg(org.id, status)} >{status})</a>
                        </div>
                        <h3 >{org.description}</h3>
                    </div>
                )
            })}
        </div>
    }

    return (
        <div>
            {context.userOrgs && context.userOrgs.length == 0 ? <NoOrgsMessage /> : null}
            <NewOrgForm setOrgs={props.setOrgs} />
            <OrgsList />
        </div>
    );
}

export default Home;