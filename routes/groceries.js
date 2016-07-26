var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var pg = require('pg');

var config = {
  database: 'grocery-list',
  port: 5432
};

router.get('/', function(request, response){
  var client = new pg.Client(config);
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('SELECT * FROM groceries ORDER BY id;', function(err, result){
      var groceryList = {};
      groceryList = result.rows;
      if(err){
        // console.log('Query error', err);
        response.sendStatus(500);
      } else {
        // console.log('Great success', peopleList);
        response.send(groceryList);
      }

      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      });
    });
  });
});

router.post('/add', jsonParser, function(request, response){
  var client = new pg.Client(config);
  var name = request.body.name;
  var qty = request.body.qty;
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('INSERT INTO groceries (name, qty) VALUES ($1, $2)', [name, qty], function(err, rows){
      if(err){
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })
    })
  })
});

router.put('/modify', jsonParser, function(request, response){
  var client = new pg.Client(config);
  var id = request.body.id;
  var name = request.body.name;
  var qty = request.body.qty;
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('UPDATE groceries SET name = $2, qty = $3 WHERE id = $1', [id, name, qty], function(err, rows){
      if(err){
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })
    })
  })
});

router.delete('/remove/:id', function(request, response){
  var client = new pg.Client(config);
  var id = request.params.id;
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('DELETE FROM groceries WHERE id = $1', [id], function(err, rows){
      if(err){
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })
    })
  })
});

module.exports = router;
