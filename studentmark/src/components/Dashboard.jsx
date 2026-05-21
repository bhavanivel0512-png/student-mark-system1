import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true)

        // backend wake up delay
        await new Promise(r => setTimeout(r, 4000))

        const res = await fetch(
          'https://student-mark-backend.onrender.com/api/students'
        )

        const data = await res.json()

        console.log("DATA:", data)

        setStudents(Array.isArray(data) ? data : [])

      } catch (err) {
        console.log(err)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    loadData()

  }, [])

  return (
    <div style={{ padding: 20 }}>

      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <p>Total Students: {students.length}</p>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="3">No Data</td>
                </tr>
              ) : (
                students.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.rollno}</td>
                    <td>{s.class}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </>
      )}

    </div>
  )
}

export default Dashboard