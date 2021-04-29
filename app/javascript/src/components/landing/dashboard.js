import React, {useState, useEffect} from 'react';

const Dashboard = (props) => {
    const [user, setUser] = useState(props.user) 
    return ( 
        <div className='dash-container'>
         <h1>Welcome to Adnat, {user.name}</h1>
         {user.organizations}
        </div>
     );
}
 
export default Dashboard;