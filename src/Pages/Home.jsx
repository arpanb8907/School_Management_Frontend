import React, { useEffect, useState } from 'react'

export default function Home() {

  const [students,setstudents] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000').
    then((res)=>res.json()).
    then((data)=>setstudents(data)). 
    catch((error)=>console.error('error fetching data',error));
  },[])

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
