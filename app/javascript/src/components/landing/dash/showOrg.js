import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../userContext';
import './showOrg.css'
import { AiOutlineClose } from 'react-icons/ai'
import NewShift from './newShift'
import NewOrgForm from './newOrgForm';

const ShowOrg = (props) => {

   const [showTable, setShowTable] = useState(false)


   const ShiftsTable = () => {
      return <div className='shifts-table'>
         <div className='shift-table-row'>
            <div className='col-1'>Employee Name</div>
            <div className='col-2'>Shift Date</div>
            <div className='col-3'>Start Time</div>
            <div className='col-4'>End Time</div>
            <div className='col-5'>Break Length (Minutes)</div>
            <div className='col-6'>Hours Worked</div>
            <div className='col-7'>Shift Cost</div>
         </div>
         {props.org.shifts.map((s) => {
            return (
               <div key={s.id} className='shift-table-row'>
                  <div className='col-1'>{s.employee}</div>
                  <div className='col-2'>{s.date}</div>
                  <div className='col-3'>{s.start}</div>
                  <div className='col-4'>{s.end}</div>
                  <div className='col-5'>{s.breaks}</div>
                  <div className='col-6'>{s.hours_worked}</div>
                  <div className='col-7'>${s.shift_cost}</div>
               </div>
            )
         })}
         <NewShift setOrg={props.setOrg} orgs={props.orgs} org={props.org} setOrgs={props.setOrgs} />
      </div>
   }

   return (
      <div className='show-div'>
         <span onClick={() => props.setShowOrg(false)}><AiOutlineClose className="close-icon" /></span>
         <h1>{props.org.name}</h1>
         <h3>{props.org.description}</h3>
         <h3>hourly rate: ${props.org.hourly_rate}</h3>
         {showTable ? <ShiftsTable /> : <h4 onClick={() => { setShowTable(true) }}>Show Shifts</h4>}
      </div>
   );
}

export default ShowOrg;
