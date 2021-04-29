import React, {useState, useEffect} from 'react';

const Dashboard = (props) => {
    const user = props.user 
    return ( 
        <div className='dash-container'>
         <h1>Welcome to Adnat, { user ? user.name : 'name isnt loading'}</h1>
         {user ? user.organizations : ''}
        </div>
     );
}
 
export default Dashboard;