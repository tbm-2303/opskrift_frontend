import React from 'react'
import { useState, useEffect } from 'react'
import facade from '../apiFacade'

const Test = ({user}) => {

    const [dataFromServer, setDataFromServer] = useState("You are not an admin...");

    useEffect(() => {
        const url = '/api/info/admin'
        facade.fetchData(url).then(res => {
            //console.log(res);
            setDataFromServer(res.msg)});
    }, []);
  

  return (
    <div>
      <h1>test</h1>
     <p>{dataFromServer}</p>
    </div>
  )
}

export default Test
