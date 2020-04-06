var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/api/heroes/:id', (req, res) => {
    //const details = { '_id': '5dc2648caa8506291cfba9d8' };
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const myADB = db.db('test');
    myADB.collection('heroes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  app.post('/api/heroes', (req, res) => {
    const note = { name: req.body.name, level: req.body.level,  age: req.body.age, cls: req.body.cls, power: req.body.power};
    const myADB = db.db('test');

    myADB.collection('heroes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/api/heroes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const myADB = db.db('test');
    myADB.collection('heroes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });
  app.put ('/api/heroes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { name: req.body.name, level: req.body.level,  age: req.body.age, cls: req.body.cls, power: req.body.power };
    const myADB = db.db('test');
    myADB.collection('heroes').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(note);
      }
    });
  });
};
