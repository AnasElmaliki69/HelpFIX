const express = require('express');
const  { getPrestations, getPrestation, createPrestation, deletePrestation, updatePrestation } = require('../controllers/prestationController');


const router = express.Router();



// get 
router.get('/', getPrestations);
router.get('/:id',getPrestation);


// post
router.post('/', createPrestation);



// delete
router.delete('/:id', deletePrestation);

router.patch('/:id', updatePrestation);


module.exports = router;
