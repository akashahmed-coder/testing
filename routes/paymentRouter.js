const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.route("/payment")
 .get(auth,authAdmin,paymentCtrl.getPayment)
 .post(auth,paymentCtrl.createPayment)
 router.route("/payment/:id")
 .patch(auth,authAdmin,paymentCtrl.updateStatus)

 module.exports = router