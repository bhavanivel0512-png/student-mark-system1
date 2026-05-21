import { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetch('https://student-mark-backend.onrender.com/api/students')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStudents(data)
      })
  }, [])

  const handleChange = (e) => {
    setMarks({
      ...marks,
      [e.target.name]: Number(e.target.value)
    })
  }

  const handleSubmit = async () => {

    if (!selectedId) {
      alert("Select student")
      return
    }

    await fetch(
      `https://student-mark-backend.onrender.com/api/students/${selectedId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mark: marks })
      }
    )

    alert("Marks saved")

    setMarks({
      tamil: '',
      english: '',
      maths: '',
      science: '',
      social: ''
    })

    setSelectedId('')
  }

  return (
    <div>

      <h2>Enter Marks</h2>

      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Select Student</option>

        {students.map(s => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input name="tamil" placeholder="Tamil" onChange={handleChange} />
      <br /><br />

      <input name="english" placeholder="English" onChange={handleChange} />
      <br /><br />

      <input name="maths" placeholder="Maths" onChange={handleChange} />
      <br /><br />

      <input name="science" placeholder="Science" onChange={handleChange} />
      <br /><br />

      <input name="social" placeholder="Social" onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>Save</button>

    </div>
  )
}

export default EnterMarks