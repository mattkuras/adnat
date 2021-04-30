import React from 'react';

const EditOrg = (props) => {

    let { orgId } = useParams();
    const organization = () => {
        return props.orgs.filter(org => org.id == orgId)
    }

    return ( 
        <div onClick={e => console.log(orgId, props.orgs, organization())}>
           create org{orgId}
        </div>
     );
}
 
export default EditOrg;
