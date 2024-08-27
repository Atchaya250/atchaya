const express = require('express');
     const bodyParser = require('body-parser');
     const app = express();
     const PORT = 1700;

     // Middleware
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(express.static('public'));

     // Set EJS as templating engine
     app.set('view engine', 'ejs');

     // Sample user data for demonstration
     const users = {
       admin: 'password123',
     };

     // Routes
     app.get('/', (req, res) => {
       res.render('login');
     });

     app.post('/login', (req, res) => {
       const { username, password } = req.body;
       if (users[username] && users[username] === password) {
         res.send('Login successful');
       } else {
         res.send('Login failed');
       }
     });

     // Start server
     app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
     });