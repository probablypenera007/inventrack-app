const express = require('express');
const { getItems, addItem, updateItem, deleteItem } = require('../controllers/itemController');
const { itemValidation, updateItemValidation } = require('../middlewares/validateItem');
const router = express.Router();

router.get('/', getItems);
router.post('/', itemValidation, addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
