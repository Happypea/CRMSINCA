var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

var contactosSchema = new Schema({
	nombreC: String,
	telefonoC: String,
	emailC: String
});

var anotacionesSchema = new Schema({
	fecha:Date,
	cuerpo:String,
});

var proyectosSchema = new Schema({
	nombre: String,
	fecha: Date,
	descripcion:String,
	archivo:String,
	anotaciones:[anotacionesSchema],
	documentos:String,
	linea_de_negocio: String,
	codigo: String,
	servicio: String,
	cliente: String,
	fecha_de_inicio: Date,
	plazo_previsto_fin_de_proyecto: String,
	tecnico_responsable: String,
	director_de_proyecto: String,
	presupuesto_aceptado : String,
	persona_de_contacto: String
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



