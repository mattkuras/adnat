import React from 'react';
import {useParams} from 'react-router-dom'


const Org = () => {
   const orgId = useParams() 
   console.log(orgId)
    return ( 
        <div>
           create org
        </div>
     );
}
 
export default Org;
