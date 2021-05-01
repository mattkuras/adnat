import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Axios from 'axios'
import EditOrg from './editOrg'
import ShowOrg from './showOrg'
import Home from '../dash/home'
import './dashboard.css'
import { UserContext } from '../../../userContext';


const Dashboard = (props) => {
    const context = useContext(UserContext)
    const [orgs, setOrgs] = useState([])
    const [org, setOrg] = useState({})
    const [showOrg, setShowOrg] = useState(false)
    const [editOrg, setEditOrg] = useState(false)




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
            console.log(`dashboard axios about to setOrgs state with an array.length as ${resp.data.length}`)
            setOrgs(resp.data)
        })
    }


    let history = useHistory()
    const redirect = () => {
        history.push("/dashboard");
    };

    let { path, url } = useRouteMatch();

    const handleEditFormUpdate = (e) => {
        setOrg({
            ...org,
            [e.target.name]: e.target.value
        });
    }

    const submitEditForm = (e) => {
        e.preventDefault();
        let organization = {
            name: org.name,
            description: org.description,
            id: org.id,
            hourly_rate: org.hourly_rate
        };
        Axios.patch("/organizations", { organization })
            .then(resp => {
                if (resp.data.success) {
                    console.log('success')
                    setEditOrg(false)
                    fetchOrgs()
                }
                else {
                    console.log(resp.data)
                }

            })
    }

    const deleteOrg = (e) => {
        e.preventDefault();
        let organization = {
            id: org.id,
        };
        Axios.delete(`/organizations/${org.id}`, { organization })
            .then(resp => {
                if (resp.data.success) {
                    console.log('success')
                    setEditOrg(false)
                    fetchOrgs()
                }
                else {
                    console.log(resp.data)
                }

            })
    }

    

    return (
        <>
            <Switch>
                <div className='dash-container'>
                    {editOrg ? <EditOrg redirect={redirect}
                        org={org}
                        updateForm={handleEditFormUpdate}
                        submitForm={submitEditForm}
                        deleteOrg={deleteOrg}
                    /> : null}
                    {showOrg ? <ShowOrg redirect={redirect} org={org} /> : null}

                    <Route exact path={path}>
                        <Home orgs={orgs}
                            org={org}
                            setOrg={setOrg}
                            setEditOrg={setEditOrg}
                            setShowOrg={setShowOrg}
                        /></Route>
                    {/* <Route path={`${path}/editorg/:id`}><EditOrg redirect={redirect}/></Route>
                    <Route path={`${path}/orgs/:id`}><ShowOrg redirect={redirect} /></Route> */}
                </div>
            </Switch>
        </>
    );
}

export default Dashboard;