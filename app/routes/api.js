var bodyParser 	= require('body-parser'); 	
var User       	= require('../models/user');
var Empresa 	= require('../models/empresa');
var Evento      = require('../models/evento');

var jwt        	= require('jsonwebtoken');
var config     	= require('../../config');

// super secret para crear los tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();


	// Ruta para autentificar al usuario (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // Encontrar un user
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    //Error (No se encuentra el nombre)
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Error no se ha encontrado el usuario' 
	    	});
	    } else if (user) {

	      // Error (Mal el password)
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'La contraseña no es correcta.' 
	      	});
	      } else {
	      	
	        //Todo OK
	        //Se crea un token para el usuario
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // dura 24 horas
	        });

	        //devolvemos toda la info como json
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// Middleware para validar el token
	apiRouter.use(function(req, res, next) {
		
		console.log('Acceso de usuario a la aplicacion' );

	  // Comprobar le toquen de varias maneras por si acaso
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  //Verificacion del token
	  if (token) {    
	    jwt.verify(token, superSecret, function(err, decoded) {      
	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Fallo al comprobar el token.' 
	    	});  	   
	      } else {         
	        req.decoded = decoded;	            
	        next(); 
	      }
	    });
	  } else {
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No se encuentra el token.' 
   	 	});	    
	  }
	});

	// Ruta de prueba para postman
	// GET http://localhost:1744/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Bienvenido a la API de CRM SINCA' });	
	});

	
	/**************************************************************************
		USUARIOS
	**************************************************************************/
	// Para las rutas de usuarios
	// ----------------------------------------------------
	apiRouter.route('/users')

		
		.post(function(req, res) {			
			var user      = new User();		
			user.name     = req.body.name;  
			user.username = req.body.username;  
			user.password = req.body.password;  

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'Ya existe un usuario con ese nombre.'});
					else 
						return res.send(err);
				}
				res.json({ message: 'Usuario creado correctamente.' });
			});

		})

		
		.get(function(req, res) {
			User.find({}, function(err, users) {
				if (err) res.send(err);
				res.json(users);
			});
		});

	// para las rutas de usuarios especificos
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) user.name         = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// Para las rutas del usuario activo
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});


	/**************************************************************************
		EMPRESA
	**************************************************************************/
	// para las rutas de empresa
	// ----------------------------------------------------
	apiRouter.route('/empresas')		
		.post(function(req, res) {			
			var empresa       = new Empresa();	
			
			empresa.nombre               = req.body.nombre	
			empresa.sector               = req.body.sector;  
			empresa.estado				 = req.body.estado;
			empresa.actividad            = req.body.actividad;  
			empresa.website              = req.body.website;  
			empresa.interes              = req.body.interes;
			empresa.descripcionSituacion = req.body.descripcionSituacion;  			  
			empresa.Ubiciudad            = req.body.Ubiciudad;
			empresa.Ubizip               = req.body.Ubizip;
			empresa.Ubicalle             = req.body.Ubicalle;

			var newContacto = {
				nombreC: req.body.nombreC1,
				telefonoC: req.body.telefonoC1,
				emailC : req.body.emailC1
			};
			empresa.contactos.push(newContacto);

					var newProyecto = {
						nombre : req.body.nombreP,
						fecha:req.body.fechaP,
						descripcion:req.body.descripcionP,
						linea_de_negocio: req.body.lineaP,
						codigo: req.body.codigoP,
						servicio: req.body.servicioP,
						cliente: req.body.clienteP,
						fecha_de_inicio: req.body.fechaP2,
						plazo_previsto_fin_de_proyecto: req.body.plazoP,
						tecnico_responsable: req.body.tecnicoP,
						director_de_proyecto: req.body.directorP,
						presupuesto_aceptado : req.body.presupuestoP,
						persona_de_contacto: req.body.personaP
					};
					empresa.proyectos.push(newProyecto);
				
			

			empresa.save(function(err) {
				if (err) {					
					if (err.code == 11000) 
						return res.json({ success: false, message: 'Ya existe una empresa con ese nombre.'});
					else 
						return res.send(err);
				}
				res.json({ message: 'Empresa creada correctamente' });
			});
		})

		// GET de todas las empresas
		.get(function(req, res) {
			Empresa.find({}, function(err, empresas) {
				if (err) res.send(err);	

				res.json(empresas);
			});
		});

	// para empresas concretas por ID.
	// ----------------------------------------------------
	apiRouter.route('/empresas/:empresa_id')

		// get empresa por ID concreta
		.get(function(req, res) {
			Empresa.findById(req.params.empresa_id, function(err, empresa) {
				if (err) res.send(err);
				res.json(empresa);
			});
		})

		// updates a una empresa concreta por ID
		.put(function(req, res) {
			Empresa.findById(req.params.empresa_id || req.body.empresaID._id, function(err, empresa) {
				if (err) res.send(err);
				
				// set the new user information if it exists in the request
				if(req.body.nombre ) empresa.nombre                            = req.body.nombre; 
				if(req.body.Ubiciudad ) empresa.Ubiciudad                      = req.body.Ubiciudad; 
				if(req.body.Ubizip) empresa.Ubizip                             = req.body.Ubizip; 
				if(req.body.Ubicalle) empresa.Ubicalle                         = req.body.Ubicalle; 
				if(req.body.sector) empresa.sector                             = req.body.sector; 
				if(req.body.estado)	empresa.estado							   = req.body.estado;
				if(req.body.descripcionSituacion) empresa.descripcionSituacion = req.body.descripcionSituacion;
				 
				if(req.body.actividad) empresa.actividad                       = req.body.actividad;  
				if(req.body.website) empresa.website                           = req.body.website; 
				if(req.body.interes) empresa.interes                           = req.body.interes;	
				if(req.body.nombreC1){					
					newContacto = {
						nombreC: req.body.nombreC1,
						telefonoC: req.body.telefonoC1,
						emailC : req.body.emailC1
					};
					empresa.contactos.push(newContacto);
				}

				if(req.body.nombreP){
					var newProyecto = {
						nombre : req.body.nombreP,
						fecha:req.body.fechaP,
						descripcion:req.body.descripcionP,
						linea_de_negocio: req.body.lineaP,
						codigo: req.body.codigoP,
						servicio: req.body.servicioP,
						cliente: req.body.clienteP,
						fecha_de_inicio: req.body.fechaP2,
						plazo_previsto_fin_de_proyecto: req.body.plazoP,
						tecnico_responsable: req.body.tecnicoP,
						director_de_proyecto: req.body.directorP,
						presupuesto_aceptado : req.body.presupuestoP,
						persona_de_contacto: req.body.personaP
					};
					empresa.proyectos.push(newProyecto);
				}

				empresa.save(function(err) {
					if (err) res.send(err);

				
					res.json({ message: 'empresa actualizada' });
				});

			});
		})

		// delete de empresa por ID
		.delete(function(req, res) {
			Empresa.remove({
				_id: req.params.empresa_id
			}, function(err, empresa) {
				if (err) res.send(err);

				res.json({ message: 'Empresa borrada' });
			});
			
		});

	apiRouter.route('/empresas/cont/:contacto_id/:empresa_id')	
		.delete(function(req, res) {	

			Empresa.findById(req.params.empresa_id,  function(err, empresa) {
				
				if (err) res.send(err);			
				var contId = req.params.contacto_id;
				empresa.contactos.pull({ _id: contId });
				res.json({ message: 'Contacto borrado' });
				empresa.save(function(err) {
					if (err) res.send(err);				
					
				});
				
			});
		});
				
		

	 /***********************************************************************\
	|	EVENTOS																  |
	 \***********************************************************************/
	// Rutas /evento
	// ----------------------------------------------------
	apiRouter.route('/eventos')

		// Crea un evento POST http://localhost:8080/evento)
		.post(function(req, res) {
			
			var evento = new Evento();		
			var probando = [];

			evento.nombre     = req.body.nombre;  
			evento.fecha      = req.body.fecha; 
			evento.descripcion = req.body.descripcion; 
			evento.datos      = req.body.datos;
			evento.tipo       = req.body.tipo;
			evento.empresaID 	  = req.body.empresaID;


			var newProbando = {
				name : req.body.probandoname,
				surname : req.body.probandosurname
			}; 

			evento.probando.push(newProbando);
				res.json(true);
		
	


			evento.save(function(err) {
				if (err) {					
					if (err.code == 11000) 
						return res.json({ success: false, message: 'El nombre del evento tiene que ser unico.'});
					else 
						return res.send(err);
				}
				res.json({ message: 'Evento creado.' });
			});

		})
		

		// Get para todos los eventos GET http://localhost:8080/api/eventos)
		.get(function(req, res) {
			Evento.find({}, function(err, eventos) {
				if (err) res.send(err);
				// return the users
				res.json(eventos);
			});
		});

	
	apiRouter.route('/eventos/:evento_id')

		
		.get(function(req, res) {
			Evento.findById(req.params.evento_id, function(err, evento) {
				if (err) res.send(err);
				
				res.json(evento);
			});
		})

		
		.put(function(req, res) {
			Evento.findById(req.params.evento_id, function(err, evento) {

				if (err) res.send(err);

				if (req.body.name) evento.nombre             = req.body.name;  
				if (req.body.fecha) evento.fecha           = req.body.fecha; 
				if (req.body.descrpcion) evento.descrpcion = req.body.descrpcion; 
				if (req.body.datos) evento.datos           = req.body.datos;
				if (req.body.tipo) evento.tipo      		 = req.body.tipo;


				
				
				evento.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'evento actualizado' });
				});

			});
		})

		
		.delete(function(req, res) {
			Evento.remove({
				_id: req.params.evento_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Evento borrado' });
			});
		});

	return apiRouter;
};

//Api for 