import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])

  const fetchStudents = async () => {
    try {
      const res = await fetch('https://student-mark-backend.onrender.com/api/students')
      const data = await res.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch {
      setStudents([])
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return

    await fetch(
      `https://student-mark-backend.onrender.com/api/students/${id}`,
      { method: 'DELETE' }
    )

    fetchStudents()
  }

  const handleEdit = async (student) => {
    const name = prompt("Edit Name", student.name)
    const rollno = prompt("Edit Roll No", student.rollno)
    const Class = prompt("Edit Class", student.class)

    await fetch(
      `https://student-mark-backend.onrender.com/api/students/${student._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rollno, class: Class })
      }
    )

    fetchStudents()
  }

  return (
    <div>

      <h2>Dashboard</h2>
      <p>Total Students: {students.length}</p>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No Students Found</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.rollno}</td>
                <td>{s.class}</td>

                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                  <button onClick={() => handleDelete(s._id)}>Delete</button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  )
}

export default Dashboard