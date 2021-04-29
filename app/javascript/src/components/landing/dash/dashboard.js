import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Axios from 'axios'
import EditOrg from '../dash/edit'
import CreateOrg from '../dash/create'
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

   

    let { path, url } = useRouteMatch();


    return (
        <>
            <div className='dash-container'>

            </div>
            <Switch>
                <Route exact path={path}><Home user={user} orgs={orgs} /></Route>
                <Route path={`${path}/editorg`}><EditOrg /></Route>
                <Route path={`${path}/createorg`}><CreateOrg /></Route>
            </Switch>
        </>
    );
}

export default Dashboard;