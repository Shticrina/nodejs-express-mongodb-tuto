const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please include the name"],
	},
	description: {
		type: String,
		required: [true, "Please include the description"],
	},
	label: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false,
		default: '/images/product.jpg'
	},
	price: {
		type: Number,
		required: [true, "Please include the price"],
	},
	category: {
		type: String,
		required: [true, "Please select a category"],
	},
	units: {
		type: Number,
		required: [true, "Please include the quantity"],
	},
	stock: {
		type: Number,
		required: [true, "Please include the stock"],
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Product', productSchema);