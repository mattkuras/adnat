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
    const [orgToShowOrEdit, setOrg] = useState({})
    const [showOrg, setShowOrg] = useState(false)
    const [editOrg, setEditOrg] = useState(false)
    const [openShifts, setOpenShifts] = useState()




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
            setOrgs(resp.data.organizations)
            setOpenShifts(resp.data.stored_shifts)
            console.log(orgs, openShifts)
        })
    }
    // const fetchOpenShifts = () => {
    //     const token = localStorage.getItem("token")
    //     Axios.get('/openshifts', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(resp => {
    //         if (resp.data.success){
    //             console.log(resp.data.shifts)
    //         console.log(openShifts)
    //         }
    //         else {
    //             console.log(resp.data.error)
    //         }
    //     })
    // }


    let { path, url } = useRouteMatch();

    const handleEditFormUpdate = (e) => {
        setOrg({
            ...orgToShowOrEdit,
            [e.target.name]: e.target.value
        });
    }

    const submitEditForm = (e) => {
        e.preventDefault();
        let organization = {
            name: orgToShowOrEdit.name,
            description: orgToShowOrEdit.description,
            id: orgToShowOrEdit.id,
            hourly_rate: orgToShowOrEdit.hourly_rate
        };
        const token = localStorage.getItem("token")
        Axios.patch("/organizations", { organization }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        const token = localStorage.getItem("token")
        Axios.delete(`/organizations/${org.id}`, { organization }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
                    {editOrg ? <EditOrg setEditOrg={setEditOrg}
                        org={orgToShowOrEdit}
                        updateForm={handleEditFormUpdate}
                        submitForm={submitEditForm}
                        deleteOrg={deleteOrg}
                    /> : null}
                    {showOrg ? <ShowOrg openShifts={openShifts}
                        setOpenShifts={setOpenShifts}
                        setShowOrg={setShowOrg}
                        setOrg={setOrg}
                        org={orgToShowOrEdit}
                        setOrgs={setOrgs}
                        orgs={orgs} /> : null}

                    <Route exact path={path}>
                        <Home orgs={orgs}
                            setOrgs={setOrgs}
                            setOrg={setOrg}
                            org={orgToShowOrEdit}
                            setEditOrg={setEditOrg}
                            setShowOrg={setShowOrg}
                        /></Route>
                </div>
            </Switch>
        </>
    );
}

export default Dashboard;