"use client"

import { Card } from '@/components/Card';
import axios from 'axios'
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const {data} = await axios.get('http://localhost:5000/getAllUsers')
      setUsers(data)
    }

    getUsers()
  }, [])
  

  return (
    <div className='ml-10'>
      <h1 className=' mt-6 text-3xl mb-5'>All Users: </h1>
      <Card />
      {
        users.map(() => {
          return <Card />
        })
      }
    </div>
  )
}

export default page