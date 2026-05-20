import { useState } from 'react'

function AddStudent() {
  const [form, setForm] = useState({
    name: '',
    rollno: '',
    class: '',
    email: ''
    
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

  try {

    const res = await fetch(
      'https://student-mark-backend.onrender.com/api/students',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(form)
      }
    )

    const data = await res.json()

    console.log(data)

    // Check response status
    if (res.ok) {

      alert('Student added successfully ✅')

      setForm({
        name: '',
        rollno: '',
        class: '',
        email: ''
      })

    } else {

      alert(data.message)

    }

  } catch (err) {

    console.log(err)

    alert('Error: ' + err.message)

  }

}

  return (
    <div>
      <h2>Add Student</h2>
      <input
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      /><br/><br/>
      <input
        placeholder="Roll No"
        name="rollno"
        value={form.rollno}
        onChange={handleChange}
      /><br/><br/>
      <input
        placeholder="Class"
        name="class"
        value={form.class}
        onChange={handleChange}
      /><br/><br/>
      <input
  placeholder="Email"
  name="email"
  value={form.email}
  onChange={handleChange}
/><br/><br/>
      
      <button onClick={handleSubmit}>Add Student</button>
    </div>
  )
}

export default AddStudent