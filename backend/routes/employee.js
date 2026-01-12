import express from "express"
import { getAllEmployee, getSpecificEmployee, addEmployee, editSpecificEmployee, deleteSpecificEmployee } from "../controllers/employee.js" 

const router = express.Router()

//router.get("/", (req, res) => {
    //res.send("Get all employee data, my friend")
//})

router.get("/", getAllEmployee)

//router.get("/:id", (req, res) => {
  //  res.send("Get specific employee data, my friend")
//})

router.get("/:ID", getSpecificEmployee)

//router.post("/", (req, res) => {
  //  res.send("Add employee data, my friend")
//})

router.post("/", addEmployee)

//router.put("/:id", (req, res) => {
    //res.send("Updated employee data, my friend")
//})

router.put("/:ID", editSpecificEmployee)

//router.delete("/:id", (req, res) => {
   // res.send("Deleted employee data, my friend")
//})

router.delete("/:ID", deleteSpecificEmployee)

export default router