const router = require('express').Router()
const productsCtrl = require('../controllers/productsCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
router.route("/product")
.get(productsCtrl.getProduct)
.post(auth,authAdmin,productsCtrl.createProduct)

router.route("/product/:id")
.put(auth,authAdmin,productsCtrl.updateProduct)
.delete(auth,authAdmin,productsCtrl.deleteProduct)


module.exports = router