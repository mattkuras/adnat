import React, { useContext, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './home.css'
import Axios from 'axios'
import { UserContext} from '../../../userContext';


const Home = (props) => {
    const [message, setMessage] = useState('')
    const context = useContext(UserContext)

    let { path, url } = useRouteMatch();

    const NoOrgsMessage = () => {
            return <div>
                <h3>You're not yet a member of any organizations. Join an existing one or create a new one.</h3>
            </div>
    }

    const joinOrg = (orgId) => {
        if (props.orgs.find(org => org.id == orgId)) {
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
                            setUserOrgs(userOrgs.push(resp.data.org))
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
    
    const displayShowPage = (org) => {
        props.setOrg(org);
        props.setShowOrg(true)
    }
    const displayEditPage = (org) => {
        props.setOrg(org);
        props.setEditOrg(true)
    }


    const OrgsList = () => {
        return <div className='orgslist' >
            <p>{message}</p>
            {props.orgs.map((org) => {
                return (
                    <div className='org' key={org.id}>
                        <div className='edit-join'>
                            <a onClick={() => displayShowPage(org)}><h1>{org.name}</h1></a>
                            <a onClick={() => displayEditPage(org)}><h4>(edit</h4></a>
                            <a onClick={() => joinOrg(org.id)} ><h4>join)</h4></a>
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
            <OrgsList />
        </div>
    );
}

export default Home;
