import express from 'express';
import student from '../models/student.js';
const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const students=await student.find();
        res.json(students);

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/', async (req, res) => {

  try {

    console.log(req.body)

    const newStudent = new student(req.body)

    const savedStudent = await newStudent.save()

    console.log(savedStudent)

    res.status(201).json(savedStudent)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: err.message
    })

  }

});
router.put('/:id', async (req, res) => {
  try {
    const updated = await student.findByIdAndUpdate(
      req.params.id,
      { $set: { mark: req.body.mark } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
