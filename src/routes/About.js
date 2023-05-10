import React from 'react'
import { useState, useEffect } from 'react'
import facade from '../apiFacade'

function About({user}) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
      const url = user.roles.split(',').includes('user') ? '/api/info/user' : '/api/info/admin';
      facade.fetchData(url).then(res => {
          console.log(res);
          setDataFromServer(res.msg)});
  }, []);

  return (
    <div className='about'>
        <div className='title'>
            <h1>About Page</h1>
        </div>
        <div className='content'>
            {dataFromServer}
        </div>
    </div>
  )
}

export default About
