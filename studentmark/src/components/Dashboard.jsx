import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])

  useEffect(() => {

    fetch('https://student-mark-backend.onrender.com/api/students')

      .then((res) => res.json())

      .then((data) => {

        console.log(data)

        // Check if data is array
        if (Array.isArray(data)) {

          setStudents(data)

        } else {

          setStudents([])

          console.log("Not an array")

        }

      })

      .catch((err) => {

        console.log(err)

      })

  }, [])

  return (

    <div>

      <h2>Dashboard</h2>

      <p>Total Students: {students.length}</p>

      <table border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s) => (

            <tr key={s._id}>

              <td>{s.name}</td>
              <td>{s.rollno}</td>
              <td>{s.class}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Dashboard