var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  title: String,
  quantity: {type: Number, default: 0},
	selected: Boolean, // is this correct? I didn't have this in the other one, so if it doesn't work try deleting it. .-.
	price: {type: Number, default: 0},
	pictureURL: String
});
ProductSchema.methods.purchase = function(cb)
{
	this.quantity += 1;
	this.save(cb); // call cb when it's all done
};

mongoose.model('Product', ProductSchema);
