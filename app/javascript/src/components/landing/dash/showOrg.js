import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../userContext';
import './showOrg.css'

const ShowOrg = (props) => {

   const findUserName = (id) => {
      let user = props.org.users.find(u => u.id == id);
      if (user) return user.name 
   }

   const ShiftsTable = () => {
      return <div className='shifts-table'>
         {props.org.shifts.map((s) => {
            return (
               <div key={s.id} className='shift-table-row'>
                  <div className='col-1'>{findUserName(s.user_id) }</div>
                  <div className='col-2'>{s.start_time}</div>
                  <div className='col-3'>{s.end_time}</div>
                  <div className='col-3'>{s.break_length}</div>
                  <div className='col-3'>{'hours worked'}</div>
                  <div className='col-3'>{'shift cost'}</div>
               </div>
            )
         })}
      </div>
   }

   return (
      <div className='show-div'>
         <h2>{props.org.name}</h2>
         <h4>hourly rate: ${props.org.hourly_rate}</h4>
         <h3>{props.org.description}</h3>
         <ShiftsTable/>
      </div>
   );
}

export default ShowOrg;
