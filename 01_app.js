const express = require('express');
const app = express();
const fs = require("fs");
const ObjectID = require('mongodb').ObjectID;
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs'); // générateur de template



//db.adresse.find().pretty()

app.get('/', function (req, res) {
	 var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD         
  res.render('gabarit.ejs', {adresses: resultat})  
  });
})
app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})

app.get('/delete/:id', (req, res) => {
	var critere = ObjectID(req.params.id)
	db.collection('adresse')
	.findOneAndDelete( {'_id': critere} ,(err, resultat) => {
		if (err) return res.send(500, err)
		var cursor = db.collection('adresse').find().toArray(function(err, resultat) {
			if (err) return console.log(err)
			res.render('gabarit.ejs', {adresses: resultat})
		})
	})
})

app.get('/trier/:cle/:ordre', (req, res) => {
	let cle = req.params.cle
	let ordre = (req.params.ordre == "asc" ? 1 : -1)
	console.log(ordre);
	let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat) {
		console.log(ordre);
		ordre == "asc"? ordre="dsc": ordre="asc"
		console.log(ordre);
		res.render('gabarit.ejs', {adresses: resultat, cle, ordre})
	})
})


app.post('/modifier', (req, res) => {
console.log('req.body' + req.body)
	 if (req.body['_id'] != __________){ 

	 console.log('sauvegarde') 

	 var oModif = {
		 "_id": ObjectID(req.body['_id']), 
		 nom: req.body._____,
		 prenom:req.body.______, 
		 telephone:req.body._______
	 }

	 var util = require("util");
	 console.log('util = ' + util.inspect(oModif));
	 
	}
	else{
		 console.log('insert')
		 console.log(req.body)
		 var oModif = {
		 nom: req.body.______,
		 prenom:req.body.______, 
		 telephone:req.body._______
	}
}
 db.collection('adresse').save(oModif, (err, result) => {
	 if (err) return console.log(err)
	 console.log('sauvegarder dans la BD')
	 res.redirect('/list')
 })
////////////////////////////connexion a MangoDB et au serveur node.js

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
 if (err) return console.log(err)
 db = database.db("carnet_adresse")
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})