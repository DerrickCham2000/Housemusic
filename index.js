const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const {Pool} = require('pg');
var pool;
pool = new Pool({
   connectionString: process.env.DATABASE_URL
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));
  app.get('/database', (req,res) => {
      var getfname = `SELECT * FROM fname`;
      pool.query(getUsersQuery, (error, result)=>{
        if (error)
            res.end(error);
        var results = {'rows':result.rows};
        res.render('pages/db', results);
      })
      res.render('pages/db', data);
  });
  app.post('/adduser', (req, res) => {
      console.log("post request for /adduser");
      var fname = req.body.fname;
      var lname = req.body.lname;
      var size = req.body.size;
      var height = req.body.height;
      var type = req.body.type;
      res.send(`First Name: ${fname}, Last name: ${lname}, Size: ${size}, Height: ${height}, Type: ${type}`);
  });
  app.post('/delete', (req, res) => {
      res.send(`That person has been deleted.`);
  });
  app.post('/deleteall', (req, res) => {
      res.send(`All Data Has Been Deleted.`);
  });

  app.post('/view', (req, res) => {
      res.send(`No Data on such person.`);
  });

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
