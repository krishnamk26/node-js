import React from 'react'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import { toast } from 'react-toastify';
import useLogout from '../Hooks/useLogout';

function Dashboard() {
  let token = sessionStorage.getItem('token')
  let logout = useLogout()
  let [data, setDate] = useState([])

  let handleGetData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/user/all`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        toast.success(res.data.message)
        setDate(res.data.users)
      }
    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message)
      if (error.response.status === 401)
        logout()
    }
  }

  useEffect(() => {
    if (token) {
      handleGetData()
    }
    else {
      logout()
    }
  }, [])
  return <div className='container'>
    <div className='icon-but'>
    <div className='icon-refresh'>
    <Button onClick={handleGetData}><i className="fa-solid fa-rotate-right"></i></Button>
    <Button onClick={logout}><i className="fa-solid fa-right-from-bracket"></i>Logout</Button>
    </div>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e, i) => {
            return <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.mobile}</td>
              <td>{e.status.toString()}</td>
              <td>{e.createdAt}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
  </div>
}

export default Dashboard