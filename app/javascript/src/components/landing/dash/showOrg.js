import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../userContext';


const ShowOrg = (props) => {
   

   return (
      <div >
         <p> {props.org.name} orggg</p>
      </div>
   );
}

export default ShowOrg;
