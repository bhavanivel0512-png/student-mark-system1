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

      console.log("API DATA:", data)

      setStudents(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log(err)
      setStudents([])
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // DELETE
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete student?")
    if (!ok) return

    try {
      await fetch(
        `https://student-mark-backend.onrender.com/api/students/${id}`,
        { method: 'DELETE' }
      )

      fetchStudents()

    } catch (err) {
      console.log(err)
      alert("Delete failed")
    }
  }

  // EDIT
  const handleEdit = (student) => {
    setEditStudent(student)
    setForm({
      name: student.name,
      rollno: student.rollno,
      class: student.class
    })
  }

  // UPDATE
  const handleUpdate = async () => {
    try {
      await fetch(
        `https://student-mark-backend.onrender.com/api/students/${editStudent._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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
    <div style={{ padding: "20px" }}>

      <h2>Dashboard</h2>
      <p>Total Students: {students.length}</p>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>

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

                <td style={{ display: "flex", gap: "10px" }}>

                  <button
                    onClick={() => handleEdit(s)}
                    style={{ background: "orange", color: "white", padding: "5px 10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    style={{ background: "red", color: "white", padding: "5px 10px" }}
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
        <div style={{ marginTop: "20px" }}>

          <h3>Edit Student</h3>

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <br /><br />

          <input
            value={form.rollno}
            onChange={(e) => setForm({ ...form, rollno: e.target.value })}
            placeholder="Roll No"
          />
          <br /><br />

          <input
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            placeholder="Class"
          />
          <br /><br />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditStudent(null)}>Cancel</button>

        </div>
      )}

    </div>
  )
}

export default Dashboard