const express = require("express")
const router = express.Router();
const userController = require('../controller/userController')
const productController = require('../controller/productController')
const orderController = require('../controller/orderController')
const reviewController = require('../controller/reviewController')


//user routes
router.post('/register',userController.createUser)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/user',userController.getAllUsers)

//product routes
router.get('/product',productController.getAllProducts)
router.get('/product/:id',productController.getProductById)
router.post('/product',productController.createProduct)
router.put('/product/:id',productController.updateProduct)
router.delete('/product/:id',productController.deleteProduct)

//Order routes

router.get('/order',orderController.getAllOrders)
router.post('/order',orderController.createOrder)
router.put('/order/:id',orderController.updateStatusOfOrder)
router.delete('/order/:id',orderController.cancleOrder)


module.exports = router