import React, { useEffect, useState, useContext } from 'react';
import './showOrg.css'
import { AiOutlineClose } from 'react-icons/ai'
import NewShift from './newShift'
import { UserContext } from '../../../userContext';
import Axios from 'axios'

const ShowOrg = (props) => {

   const context = useContext(UserContext)
   const [showTable, setShowTable] = useState(false)
   const [editRowStatus, setEditRowStatus] = useState(false)
   const [row, setRow] = useState({})

   const editRow = (shift) => {
      setEditRowStatus(true)
      setRow(shift)
   }
   const handleRowChange = (e) => {
      setRow({
         ...row,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = () => {
      let shift = {
         id: row.id,
         start_time: row.start,
         end_time: row.end,
         break_length: row.breaks,
         organization_id: row.organization_id,
         user_id: row.user_id
      }
      let date = { shift_date: row.date }
      console.log({ shift, date })
      Axios.patch('/shifts', {shift, date})
         .then(resp => {
            console.log(resp.data.org)
            setEditRowStatus(false)
            props.setOrg(resp.data.org)
         })
   }

   const ShiftsTable = () => {
      return <div className='shifts-table'>
         <div className='shift-table-row' >
            <div className='col-1'>Employee Name</div>
            <div className='col-2'>Shift Date</div>
            <div className='col-3'>Start Time</div>
            <div className='col-4'>End Time</div>
            <div className='col-5'>Break Length (Minutes)</div>
            <div className='col-6'>Hours Worked</div>
            <div className='col-7'>Shift Cost</div>
            <div className='col-9'>Overnight?</div>
         </div>
         {props.org.shifts.map((s) => {
            return (
               <div key={s.id} className='shift-table-row' onDoubleClick={() => editRow(s)}>
                  <div className='col-1'>{s.employee}</div>
                  <div className='col-2'>{s.date}</div>
                  <div className='col-3'>{s.start}</div>
                  <div className='col-4'>{s.end}</div>
                  <div className='col-5'>{s.breaks}</div>
                  <div className='col-6'>{s.hours_worked}</div>
                  <div className='col-7'>${s.shift_cost}</div>
                  <div className='col-9'>{s.overnight}</div>
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

         {editRowStatus ? <div key='edit-shift' className='shift-table-row with-edit-form'>
            <div className='col-1'><input value={row.employee} name='employee' /></div>
            <div className='col-2'><input onChange={handleRowChange} type='text' value={row.date} name='date' /></div>
            <div className='col-3'><input type='text' onChange={handleRowChange} value={row.start} name='start' /></div>
            <div className='col-4'><input type='text' onChange={handleRowChange} value={row.end} name='end' /></div>
            <div className='col-5'><input type='text' onChange={handleRowChange} value={row.breaks} name='breaks' /></div>
            <div className='col-8'><button className='new-shift-button' onClick={handleSubmit} >Edit Shift</button></div>
         </div> : null}


      </div>
   );
}

export default ShowOrg;
