import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])

  // Fetch students
  const fetchStudents = async () => {
    try {

      const res = await fetch(
        'https://student-mark-backend.onrender.com/api/students'
      )

      const data = await res.json()

      console.log(data)

      setStudents(data)

    } catch (err) {

      console.log(err)
      alert('Failed to load students')

    }
  }

  useEffect(() => {

    const loadStudents = async () => {

      // Wait for Render backend wakeup
      await new Promise((resolve) => setTimeout(resolve, 4000))

      fetchStudents()

    }

    loadStudents()

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