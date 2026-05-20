import express from 'express'
import student from '../models/student.js'

const router = express.Router()

// GET all students
router.get('/', async (req, res) => {

  try {

    const students = await student.find()

    res.json(students)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

})

// ADD student
router.post('/', async (req, res) => {

  try {

    console.log(req.body)

    const newStudent = new student(req.body)

    const savedStudent = await newStudent.save()

    res.status(201).json(savedStudent)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

})

// UPDATE marks
router.put('/:id', async (req, res) => {

  try {

    const updated = await student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          mark: req.body.mark
        }
      },
      {
        new: true
      }
    )

    res.json(updated)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

})

// DELETE student
router.delete('/:id', async (req, res) => {

  try {

    await student.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Student deleted!'
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

})

export default router