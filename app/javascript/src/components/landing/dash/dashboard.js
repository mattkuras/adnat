import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Axios from 'axios'
import EditOrg from '../dash/edit'
import Org from './org'
import Home from '../dash/home'
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


    let history = useHistory()
    const redirect = () => {
        history.push("/dashboard");
    };


    let { path, url } = useRouteMatch();


    return (
        <>
            <div className='dash-container'>

            </div>
            <Switch>
                <Route exact path={path}
                    render={props => (
                        <Home {...props} user={user} orgs={orgs} />
                    )}
                ></Route>
                <Route path={`${path}/editorg/:id`}><EditOrg redirect={redirect} orgs={orgs} /></Route>
                <Route path={`${path}/orgs/:id`}><Org redirect={redirect} /></Route>
            </Switch>
        </>
    );
}

export default Dashboard;