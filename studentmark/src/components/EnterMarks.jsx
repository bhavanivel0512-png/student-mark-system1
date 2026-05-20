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

      // Check array
      if (Array.isArray(data)) {

        setStudents(data)

      } else {

        setStudents([])

      }

    } catch (err) {

      console.log(err)

      alert('Failed to load students')

    }

  }

  // Load students
  useEffect(() => {

    const loadStudents = async () => {

      // Render backend wake up
      await new Promise((resolve) => setTimeout(resolve, 4000))

      fetchStudents()

    }

    loadStudents()

  }, [])

  // Handle input change
  const handleChange = (e) => {

    setMarks({
      ...marks,
      [e.target.name]: Number(e.target.value)
    })

  }

  // Save marks
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

          body: JSON.stringify({
            mark: marks
          })
        }
      )

      const data = await res.json()

      console.log(data)

      alert('Marks updated successfully ✅')

      // Reset form
      setMarks({
        tamil: '',
        english: '',
        maths: '',
        science: '',
        social: ''
      })

      setSelectedId('')

      // Reload students
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

        <option value="">
          Select Student
        </option>

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