import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])

  const [editStudent, setEditStudent] = useState(null)

  const [form, setForm] = useState({
    name: '',
    rollno: '',
    class: ''
  })

  // GET students
  const fetchStudents = async () => {

    try {

      const res = await fetch(
        'https://student-mark-backend.onrender.com/api/students'
      )

      const data = await res.json()

      console.log(data)

      if (Array.isArray(data)) {
        setStudents(data)
      } else {
        setStudents([])
      }

    } catch (err) {
      console.log(err)
      setStudents([])
    }

  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // DELETE student
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this student?")

    if (!confirmDelete) return

    try {

      await fetch(
        `https://student-mark-backend.onrender.com/api/students/${id}`,
        {
          method: 'DELETE'
        }
      )

      fetchStudents()

    } catch (err) {
      console.log(err)
      alert("Delete failed")
    }

  }

  // EDIT click
  const handleEdit = (student) => {

    setEditStudent(student)

    setForm({
      name: student.name,
      rollno: student.rollno,
      class: student.class
    })

  }

  // UPDATE student
  const handleUpdate = async () => {

    try {

      await fetch(
        `https://student-mark-backend.onrender.com/api/students/${editStudent._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        }
      )

      setEditStudent(null)

      fetchStudents()

    } catch (err) {
      console.log(err)
      alert("Update failed")
    }

  }

  return (

    <div style={{ padding: '20px' }}>

      <h2>Dashboard</h2>

      <p>Total Students: {students.length}</p>

      {/* TABLE */}
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

                  <button onClick={() => handleEdit(s)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    style={{ background: 'red', color: 'white' }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {/* EDIT FORM */}
      {editStudent && (

        <div style={{ marginTop: '20px' }}>

          <h3>Edit Student</h3>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <br /><br />

          <input
            placeholder="Roll No"
            value={form.rollno}
            onChange={(e) =>
              setForm({ ...form, rollno: e.target.value })
            }
          />

          <br /><br />

          <input
            placeholder="Class"
            value={form.class}
            onChange={(e) =>
              setForm({ ...form, class: e.target.value })
            }
          />

          <br /><br />

          <button onClick={handleUpdate}>
            Update
          </button>

          <button onClick={() => setEditStudent(null)}>
            Cancel
          </button>

        </div>

      )}

    </div>

  )
}

export default Dashboard