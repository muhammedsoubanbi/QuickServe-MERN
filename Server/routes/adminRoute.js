import express from "express";
const adminRoute = express.Router()
import * as adminController from '../controller/adminController.js'
import {verifyToken} from '../middleware/Auth.js'
import { upload } from "../middleware/multer.js";



adminRoute.post('/login', adminController.adminLogin)
adminRoute.post('/Add-Service',upload.single('image'),adminController.AddService)
adminRoute.get('/getServices',adminController.getServices)
adminRoute.get('/loadDashboard',adminController.getUsers)
adminRoute.delete('/deleteService/:id',adminController.DeleteService)
adminRoute.get('/editUser/:id',adminController.editUser)
adminRoute.get('/editUser',adminController.editUser)
adminRoute.put('/updateUser/:id',upload.single('image'),adminController.UpdateUser)

export default adminRoute