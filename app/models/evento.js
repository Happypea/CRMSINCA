var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema 
var probandoSchema = new Schema({ name: String, surname:String });

var EventoSchema   = new Schema({
	nombre: {type: String, required: true, index: { unique: true }},
	fecha:Date,
	descripcion:String,
	datos: String,
	tipo: String,
	probando:[probandoSchema]
});


module.exports = mongoose.model('Evento', EventoSchema);