const express = require('express');
const app = express();
const users = require('./routes/User.route');
const meetings = require('./routes/Meeting.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors =require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');




const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



///authorization

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8000',
  clientID: 'dYYsfRf1zgx8Gj8HIOC6WDOdAwxuPAje',
  issuerBaseURL: 'https://dev-ri76cc1v.us.auth0.com'
};
const uriCli=`http://127.0.0.1:5500/client/index.html`
app.use(auth(config));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const { requiresAuth } = require('express-openid-connect');
app.use(cors());
app.use('/users', requiresAuth(), users);
// app.use('/users', requiresAuth(), userController);
app.use('/meetings', meetings);
app.use('/login',(req, res) => res.render(login))


app.get('/', (req, res) => {
  console.log("kjdl");
  if(req.oidc.isAuthenticated())
  {
    res.cookie(req.cookie);
    res.send(res.redirect(uriCli));
  }  else{
    res.send("logged out");
  }
  
    
});
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
app.listen(port, () => {
    console.log('listening on port ' + port);
});




