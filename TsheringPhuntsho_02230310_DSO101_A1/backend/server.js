require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

const taskSchema = new mongoose.Schema({
    title: String
})

const Task = mongoose.model("Task", taskSchema)

// CREATE
app.post("/tasks", async (req,res)=>{
    const task = new Task({title:req.body.title})
    await task.save()
    res.json(task)
})

// READ
app.get("/tasks", async (req,res)=>{
    const tasks = await Task.find()
    res.json(tasks)
})

// UPDATE
app.put("/tasks/:id", async (req,res)=>{
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {title:req.body.title},
        {new:true}
    )
    res.json(task)
})

// DELETE
app.delete("/tasks/:id", async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.json({message:"Deleted"})
})

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port", process.env.PORT)
})