var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

var contactosSchema = new Schema({
	nombreC: String,
	telefonoC: String,
	emailC: String
});

var proyectosSchema = new Schema({
	nombreP: String,
	fechaP: Date,
	descripcionP:String,
	archivoP:String
});

var ofertasSchema = new Schema({
	nombreO:String,
	descripcionO:String,
	fechaO:Date,
	archivoO:String,
	terminadoO:Boolean
})



var EmpresaSchema   = new Schema({
	nombre: { type:String, required:true, index:{ unique:true}},
	Ubiciudad:String,
	Ubizip:String,
	actividad:String,
	Ubicalle:String,
	sector:String,
	estado:String,
	website:String,
	interes:String,
	descripcionSituacion: String,
	
	contactos:[contactosSchema],
	proyectos:[proyectosSchema],
	ofertas:  [ofertasSchema]	
});


module.exports = mongoose.model('Empresa', EmpresaSchema);



