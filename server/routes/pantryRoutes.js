const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const PantryItem = require('../models/pantryItemModel');

router.get('/', protect, async (req, res)=>{
    const items = await PantryItem.find({user: req.user.id});
    res.json(items);
});

router.post('/', protect, async (req, res)=>{
    const {name, quantity} = req.body;
    const newItem = new PantryItem({name, quantity, user: req.user.id});
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
})

router.delete('/:id', protect, async (req, res)=>{
    const item = await PantryItem.findById(req.params.id);
    if(!item){
        return res.status(404).json({message: "Item not found"});
    }
    if(item.user.toString() !== req.user.id){
        return res.status(401).json({message: "Not authorized"});
    }
    await item.deleteOne();
    res.json({message: "Item Removed"});
});
module.exports = router;