const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var application = express();

hbs.registerPartials(__dirname + '/views/partials');
application.set('view engine', 'hbs');
application.use(express.static(__dirname + '/public'));
application.use((request, response, next) => {
  var now = new Date().toString();
  var logEntry = `${now}: ${request.method} ${request.originalUrl}`;

  console.log(logEntry);
  fs.appendFile('server.log', logEntry + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});
// application.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

application.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home page',
    greeting: 'Welcome to my home page'
  });
  // response.send('<h1>Hello user.</h1>');
  // response.send({
  //   name: 'Edward',
  //   likes: [
  //     'Programming',
  //     'Working out'
  //   ]
  // });
});

application.get('/about', (request, response) => {
  // response.send('About page.');
  response.render('about.hbs', {
    pageTitle: 'About page',
  });
});

application.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects page'
  });
});

application.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to fulfill the request.'
  });
});

application.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
