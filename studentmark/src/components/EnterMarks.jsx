import { useState, useEffect } from 'react'

function EnterMarks() {
  const [students, setStudents] = useState([])
  const [selectedId, setSelectedId] = useState('')
  
  const [marks, setMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  })

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
    fetchStudents()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    setMarks({
      ...marks,
      [e.target.name]: Number(e.target.value)
    })
  }

  // Submit marks
  const handleSubmit = async () => {
    if (!selectedId) {
      alert('Please select a student')
      return
    }

    try {
      const res = await fetch(
        `https://student-mark-backend.onrender.com/api/students/${selectedId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mark: marks })
        }
      )

      const data = await res.json()

      console.log(data)

      alert('Marks updated successfully ✅')

      // Clear form
      setMarks({
        tamil: '',
        english: '',
        maths: '',
        science: '',
        social: ''
      })

      setSelectedId('')

      // Refresh students list
      fetchStudents()

    } catch (err) {
      console.log(err)
      alert('Error: ' + err.message)
    }
  }

  return (
    <div>
      <h2>Enter Marks</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Student</option>

        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Tamil"
        name="tamil"
        value={marks.tamil}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="English"
        name="english"
        value={marks.english}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Maths"
        name="maths"
        value={marks.maths}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Science"
        name="science"
        value={marks.science}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Social"
        name="social"
        value={marks.social}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Save Marks
      </button>
    </div>
  )
}

export default EnterMarks