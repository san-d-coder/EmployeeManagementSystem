const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

//Get All

router.get('/', verifyToken, async (req,res)=>{
    console.log('Get all called');
    try{
        const employees = await Employee.find();
        res.json(employees)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get One

router.get('/:email', verifyToken, getEmployee, (req,res)=>{
    console.log('Get one called');
    res.status(200).json( res.employee )
    
})

//Update One

router.patch('/:email', verifyToken, getEmployee, async (req,res)=>{
    console.log('Update one called');
    if(req.body.name != null)
        res.employee.name = req.body.name
    if(req.body.email != null)
        res.employee.email = req.body.email
    if(req.body.phone != null)
        res.employee.phone = req.body.phone
    try{
        const updatedEmployee = await res.employee.save()
        res.status(200).json(updatedEmployee)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
    
})

//Delete One

router.delete('/:email', verifyToken, getEmployee, async (req,res)=>{
    console.log('Delete one called');
    try{
        await res.employee.remove()
        res.status(200).json({message:'Deleted Employee'})
    }   
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Create One

router.post('/', verifyToken, async (req,res)=>{
    console.log('Create one called');
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//Middlewares

//Route Guard

function verifyToken(req,res,next){
    console.log('Verify token called')
    if(!req.headers.authorization){
       return res.status(401).json({message: 'Unauthorized request'})
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).json({message: 'Unauthorized request'})
    }
    try{
    let payload = jwt.verify(token, 'secretKey')
    req.username = payload.subject
    next()
    }
    catch(err){
        return res.status(401).json({message: err.message})
    }
    
}

//Search for user

async function getEmployee(req,res,next){
    let employeeEmail = req.params.email
    Employee.findOne({email:employeeEmail},(error,employee)=>{
        if (error) {
            console.log(error)
            res.status(500).send({ message: error.message })
        } else
            if (!employee) {
                res.status(404).send('Not Found')
            } else{
            res.employee = employee
            next()
            }
    })
//     let employee
// try{
//     employee = await Employee.findById(req.params.id)
//     console.log(employee)
//     if(employee == null)
//         return res.status(404).json({message: 'Employee Not Found'})
// }
// catch(err){
//     return res.status(500).json({message: err.message})
// }
// res.employee = employee
// next()
}


module.exports = router;