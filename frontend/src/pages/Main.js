import React, { useEffect, useState } from 'react';
import Home from './Home';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom'
import '../styles/global.css'


function Main() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [employees, setEmployees] = useState([]);


  const onHandleNameChange = (e) => {
    setName(e.target.value)
  }

  const onHandleAddressChange = (e) => {
    setAddress(e.target.value)
  }


  useEffect(() => {
    const getEmployees = async () => {
      const response = await fetch('http://localhost:8000/employees')

      const people = await response.json()
      setEmployees(people)

    }
    getEmployees()
  })

  //Post data...
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setName('')
    setAddress('')
    await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
      }),
    });
  }


  return (
    <div className="w-screen block">
      {/* <Container className='w-full'> */}
      <div className='w-screen bg-black'>
        <div className=" flex  place-content-between py-4">
          <div className='text-red-500 py-4 text-3xl text-sans font-bold ml-4'>DECENTPAYROLL</div>
          <div>
            <Link to="/pay" >
              <div className='mr-4 mt-4'>
                <button className='py-2 px-4 bg-red-500 rounded-md text-normal'>Pay Up</button>
              </div>
            </Link>
            <Link to="/History" >
              <div className='mr-4 mt-4'>
                <button className='py-2 px-4 bg-red-500 rounded-md text-normal'>History</button>
              </div>
            </Link>
          </div>

        </div>
      </div>
      <Container maxWidth='xl' className='pb-16 pt-8 w-screen '>
        <form onSubmit={onSubmitHandler} className=" mx-auto">

          <div className='w-screen mx-auto flex py-8'>
            <label className='text-base  w-36' >Name:</label>
            <input
              className='outline-none bg-red-50 py-2 rounded-sm '
              type="text"
              name="name"
              onChange={onHandleNameChange}
              value={name}
            />
          </div>

          <div className='w-screen mx-auto flex py-8'>
            <label className='text-base  w-36' >Wallet_Address:</label>
            <input
              className='outline-none bg-red-50 py-2  rounded-sm'
              type="text"
              name="address"
              onChange={onHandleAddressChange}
              value={address}
            />
          </div>
          <div className='w-full place-items-center flex justify-items-stretch '>
            <input type="submit" value="Add" className='bg-red-500 py-2 px-8 rounded-md mx-auto justify-self-center' />
          </div>
        </form>
      </Container>
      <Home employees={employees} />

    </div>
  );
}

export default Main;