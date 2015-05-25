var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

/*var contactosSchema = new Schema({
		nombreC: String,
		telefonoC: String,
		emailC: String
	});*/

var EmpresaSchema   = new Schema({
	nombre: { type:String, required:true, index:{ unique:true}},
	Ubiciudad:String,
	Ubizip:String,
	Ubicalle:String,
	sector:String,
	targetE:String,
	cliente:String,
	website:String,
	interes:String,
	nombreC1: String,
	telefonoC1: String,
	emailC1: String,
	nombreP1: String,
	fechaP1: Date,
	descripcionP1:String,
	archivoP1:String,
	nombreO1:String,
	descripcionO1:String,
	fechaO1:Date,
	archivoO1:String,
	terminadoO1:Boolean,
	nombreC2: String,
	telefonoC2: String,
	emailC2: String,
	nombreP2: String,
	fechaP2: Date,
	descripcionP2:String,
	archivoP2:String,
	nombreO2:String,
	descripcionO2:String,
	fechaO2:Date,
	archivoO2:String,
	terminadoO2:Boolean
	/*URGENTE MEJORAR SCHEMA*/
	/*contactos:[contactosSchema],
	proyectos:[{
		nombreP: String,
		fechaP: Date,
		descripcionP:String,
		archivoP:String
	}],
	ofertas:[{
		nombreO:String,
		descripcionO:String,
		fechaO:Date,
		archivoO:String,
		terminadoO:Boolean
	}]*/
});


module.exports = mongoose.model('Empresa', EmpresaSchema);



