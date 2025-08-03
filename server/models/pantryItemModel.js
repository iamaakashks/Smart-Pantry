const mongoose = require('mongoose');
const pantryItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        default: '1',
    },
}, {timestamps: true});

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);
module.exports = PantryItem;