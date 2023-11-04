const express = require('express')

const { addProductCart } = require('../dao/controllers/cartController')
const { getCartById, getCartPopulated, buyCart } = require('../dao/repositories/cartRepository')
const { isUser } = require('../middleweres/authMiddlewere')
const ERRORS = require('../handlers/errorHanlder')



const router = express.Router()

/* router.post('/', async (req, res) =>{
    res.send(await cartsManager.createCartInMongo())
})
 */
/* router.get('/:cid', async (req, res) =>{
    const { cid } = req.params

    const response = await cartsManager.getProductsByIdFromMongo(Number(cid))
    if(response.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }

}) */

router.post('/:cid/products/:pid', isUser, async (req, res) =>{
    const { cid, pid } = req.params
    console.log(cid, pid)
    const response = await addProductCart(cid, pid)
    console.log(response)
    if(response){
        res.redirect('/api/cart')
    }
    

})

router.post('/:cid/purchase', isUser, async (req, res) => {
    const { cid } = req.params;
  
    try {
        let productsNotProcessed = await buyCart(cid,req.user.email)
        console.log(productsNotProcessed)
      return res.status(200).json({ status: 'success', message: 'Compra realizada con éxito' });
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      return res.status(ERRORS.GENERATE_TICKET_ERROR.status).json(ERRORS.GENERATE_TICKET_ERROR);
    }
  });
  
 
  


router.get('/', isUser,  async (req, res) =>{
    let cartComplete = await getCartPopulated(req.user.cart)
    console.log(cartComplete.products)
    res.render('cart', {user: req.user, cart: cartComplete})
})


/* 
router.put('/:cid/products/:pid/:units', async (req, res) =>{
    const {cid, pid, units} = req.params
    const response = await cartsManager.updateCartFromMongo(Number(cid), Number(pid), Number(units))
    if(result.ok){
        res.status(200).send(response)
    }else{
        res.status(400).send(response)
    }
}) */
/* 
router.delete('/:cid/products/:pid/:unit', async (req, res)=>{
    const {cid, pid, unit} = req.params
    const response = await cartsManager.deleteProductsFromCartInMongo(Number(cid), Number(pid), Number(unit))
    if(response?.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }
}) */
/* 
router.delete('/:cid', async (req, res) =>{
    const {cid} = req.params
    const response = await cartsManager.deleteAllProductsFromCartInMongo(Number(cid))
    if(response.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }
}) */

/* 
router.post('/:cid/purchase', async (req, res) => {
    const { cid } = req.params;
    const response = await cartsManager.purchaseCartInMongo(Number(cid));
  
    if (response.ok) {
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  });
 */
module.exports = router