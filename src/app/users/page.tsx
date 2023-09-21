"use client"

import { Card } from '@/components/Card';
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
      const res = await axios.get('')
  }

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