const express = require("express")
const router = express.Router();
const authController = require('../controller/authController')
const userController = require('../controller/userController')
const productController = require('../controller/productController')
const orderController = require('../controller/orderController')
const reviewController = require('../controller/reviewController')


// Authentication routes
router.post('/api/auth/login', authController.login);
router.post('/api/auth/logout', authController.logout);
router.post('/api/auth/register', authController.register);


// User routes
router.get('/api/users/:userId', authMiddleware.authenticate, userController.getUser);
router.put('/api/users/:userId', authMiddleware.authenticate, userController.updateUser);
router.delete('/api/users/:userId', authMiddleware.authenticate, userController.deleteUser);


//product routes
router.get('/api/products',productController.getAllProducts)
router.get('/api/products/:id',productController.getProductById)
router.post('/api/products',authMiddleware.authenticate,authMiddleware.authorize(['seller']),productController.createProduct)
router.put('/api/products/:id',authMiddleware.authenticate,authMiddleware.authorize(['seller']),productController.updateProduct)
router.delete('/api/products/:id',authMiddleware.authenticate,authMiddleware.authorize(['seller']),productController.deleteProduct)


//Order routes
router.get('/order',authMiddleware.authenticate,orderController.getAllOrders)
router.get('/api/orders/:orderId', authMiddleware.authenticate, orderController.getOrder);
router.post('/order',authMiddleware.authenticate,orderController.createOrder)
router.put('/order/:id', authMiddleware.authenticate, authMiddleware.authorize(['seller']),orderController.updateOrderStatus)
router.delete('/api/orders/:orderId', authMiddleware.authenticate, orderController.cancelOrder);


// Review routes
router.get('/api/products/:productId/reviews', reviewController.getProductReviews);
router.post('/api/products/:productId/reviews', authMiddleware.authenticate, authMiddleware.authorize(['buyer']), reviewController.createReview);
router.put('/api/products/:productId/reviews/:reviewId', authMiddleware.authenticate, authMiddleware.authorize(['buyer']), reviewController.updateReview);
router.delete('/api/products/:productId/reviews/:reviewId', authMiddleware.authenticate, authMiddleware.authorize(['buyer']), reviewController.deleteReview);

module.exports = router