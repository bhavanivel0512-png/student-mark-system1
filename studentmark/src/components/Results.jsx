import { useEffect, useState } from 'react'

function Results() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('https://student-mark-backend.onrender.com/api/students')
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data) ? data : []))
  }, [])

  return (
    <div>

      <h2>Results</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          {students.map(s => {

            const m = s.mark || { tamil:0, english:0, maths:0, science:0, social:0 }

            const total = m.tamil + m.english + m.maths + m.science + m.social

            return (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{total}</td>
              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}

export default Results