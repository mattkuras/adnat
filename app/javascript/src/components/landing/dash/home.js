import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


const Home = (props) => {
    const user = props.user
    const orgs = props.orgs
    let { path, url } = useRouteMatch();

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
                            <Link to={`${url}/editorg`}><h4>(edit</h4></Link>
                            <a><h4>join)</h4></a>
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
                {props.user == undefined ? null : <NoOrgsMessage />}
                <OrgsList />
        </div>
     );
}
 
export default Home;
