import {query} from "../utils/connectToDB.js"
import { createRolesQuery, 
    createEmployeeDataQuery, 
    addEmployeeValueQuery, 
    getAllEmployeeDataQuery, 
    getSpecificEmployeeDataQuery, 
    updateEmployeeDataQuery,
    deleteEmployeeDataQuery } from "../utils/sqlQuery.js"
import { errorMessages } from "../utils/error.js"

export async function getAllEmployee(req, res, next) {
    try {
        const response = await query(`SELECT to_regclass('employee_data')`)
        console.log(response)
        if(!response.rows[0].to_regclass) {
            await query(createRolesQuery)
            await query(createEmployeeDataQuery)
        }
        const {rows} = await query(getAllEmployeeDataQuery)
        res.status(200).json(rows)
        //es.send("OK")  
        //throw new Error("Putra")


    } catch (error) {
        console.log(error.message)
        return next(errorMessages(400, "Sorry, Couldn't get employee data!"))

        
    }
}

export async function getSpecificEmployee(req, res, next) {
    const id = req.params.ID
    const data = await query(getSpecificEmployeeDataQuery, [id])
    console.log(data)
    if(!data.rows.length) {
        return next(errorMessages(400, "Specified Employee doesn't found!"))
    }
    res.status(200).json(data.rows[0])

}

export async function addEmployee(req, res, next) {
    try {
    const {Name, Email, Age, Salary, Roles} = req.body
    if (!Name || !Email || !Age || !Salary) {
        return res.status(400).json({error: "There is missing fields!"})
    }
    const data = await query(addEmployeeValueQuery, [Name, Email, Age, Salary, Roles])
    res.status(201).json(data.rows[0])
    } catch (error) {
        console.log(error.message)
        return next(errorMessages(400, error.messages))
    }

}

export async function editSpecificEmployee(req, res, next) {
    try {
        const {ID} = req.params
        const {Name, Email, Age, Roles, Salary} = req.body
        const result = await query(updateEmployeeDataQuery, [Name, Email, Age, Salary, Roles, ID])
        console.log(result)

        if(result.rowCount === 0) {
            return res.status(400).json({error: "Employee ID not found, Couldn't edit specified data"})
        }
        res.status(200).json(result.rows[0])


    } catch(error) {
        res.status(400).json({error: error.message})
    
    }

}


export async function deleteSpecificEmployee(req, res, next) {
    const id = req.params.ID
    const data = await query(deleteEmployeeDataQuery, [id])
    console.log(data)
    
    if(!data.rowCount) {
        return next(errorMessages(400, "Couldn't deleted specific employee data"))
    }
    res.status(200).json({message: "Deleted successfully employee data"})
    
} 