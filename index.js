var mysql = require('mysql');

//---------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//-----------------------------------------------------

var con = mysql.createConnection({
  host: "localhost",
  user: "seu usuario aqui",
  password: "Sua senha aqui",
  database: "Sua banco aqui"
});

/*
PARA VERIFICAR SE CONECTOU
con.connect(function(err) {
  if (err) throw err;
  console.log("Connectado!\n");
  
});*/

app.get('/', (req, res) => {
  var id = req.query.id;
  
  if(id == "nome" || id == "email" || id == "ddd"  ){
	  var s = 'SELECT '+ id +' FROM clientes';
  
	  con.query(s, function (err, result) {
        if (err) throw err;
		
		if(id =="nome"){
			var data = {};
			data['usuarios'] = result;
		}
		if(id =="email"){
			var data = {};
		    data['contatos'] = result;
		}
		if(id =="ddd"){
			var data = {};
		    data['numero'] = result;
		}
		
	    res.send(data);
	  });
  }else{
	 res.send("Coluna não existe na tabela"); 
  }
  
});

app.listen(3000);
