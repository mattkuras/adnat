import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../userContext';
import './showOrg.css'

const ShowOrg = (props) => {
   

   return (
      <div className='show-div'>
      <h2>{props.org.name}</h2>
      <h4>hourly rate: ${props.org.hourly_rate}</h4>
      <h3>{props.org.description}</h3>
      </div>
   );
}

export default ShowOrg;
