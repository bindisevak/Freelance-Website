
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/user');
var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use('/user', users);
app.get('/', routes.index);
app.get('/contact', routes.contact);

app.post('/contact', function (req, res) {
	  var mailOpts, smtpTrans;
	  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
	  smtpTrans = nodemailer.createTransport('SMTP', {
	      service: 'Gmail',
	      auth: {
	    	  type: "service_account",
	    	  project_id: "bindisevak",
	    	  private_key_id: "910cd429431f4a565e33e19e214108ed36241182",
	    	  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCg6u9vNDmnflqB\n7rP9S+h/ANTQRB5ovbibqIUU58LujH6dwLsLNTQPLzn0/JvTJT4X8oKBVariYgXy\nlfD52NNkolGrRgWE1/Tprg1e/0u4WV3W/RkEoPu0Il2WkB85HnRCUdHHR/EG/bAj\nPYg8ISmN8N1MOx2zkLq3E/aIQLMFIGxBOZ8EXo9YjYeOF3lXMlsGQr+HosNZ0J3K\nXTmFrcgwyHRbqtdsYmpwSz55Q3JALN3JKgPDa7xWcdIHLJ4nGAPGGArkjGTZsMD4\nIOE+ynpxTL6f4Jeyfp9v3tP2434+EKueznzDtsiek7or1uVTMOCrYefwNHfW+3E7\nnitbe99PAgMBAAECggEAGnqOK55MXmNMQVUmCOgUudFJM3wCBPozBmoUe/wm91nm\n+85a+N0oU9dRkh5/BZ97ODWPg/i0xcubbu99V592KXkMN0KuZc2jX1Bkot0feJY7\n+sRq+XgD8wA0pjHQ8XUxbDhKbKBJ6PyVnzbg1AQg8lpQD9sqaAHIt5dxWbpLuuv4\nFTvsYbwwV3jb9K8avHrIt5NH1nkEiWhNjmK9JQaH2GaIuhif/xcCIKuY0ZHMZocc\ncnQRKyy8EahvIceYzs1uqviUtad3TarwmCOMtRoFhOGa2Xl+K3QYNFUylE0T12TJ\nVXj6dhibykme67uo8m5bIJI14oKAKOva+qwWKpO8AQKBgQDO7eAQ8UHO3WQI1AeJ\n8eEr8s18ZACfVNdsfKIJxlyXk9K1WrSEPGZZll6gZxwG3iYhkmGbxiTa8F/6RCoC\nieMcq8j6AG65VIMg9Pncl0ka/41F8mhUIg1cyn+MHQR4cI7ItqV9VCP8+YjdNR4M\nF6P8lEDBalnwstsZdFeegihLEQKBgQDHE9MPRQucT6TbFPT7Rmul535kVP1qm9Z2\npvt7hwQpCsRXrV6JUZ9cQOj5S6KHrAIbUn9k+AJXLoJAWaPH5r51ViYNg7teS2Rc\nVLc8SGPf2aZo14blQD8JeP6kTVhfVaicZXJOFLkc25u8jUKc4uDjvGpNiFA1lowe\npnFzPh/EXwKBgAoh2avatFc1vfU0tJ3LizQEso0ZtHIYzGeSfritztDZOyMIKvii\noHxYgY+nHNc1P3a7XS4seJeD159AgTIYoFdCDhg3tzQ58CXH+QgVHE5HHxrCsNsV\nw8O8Ypxwu0xObp9jWh0V5qE3cr0qIauD6NKwS69szrSbfWD0smmfg+uRAoGAcLYf\nrCiKX1CUZNmjrlR7hC3h2IpqBB8BOKJoBdM2nsoSyhVFTffhgwjZHrQc7DWN58w4\nhoEISjXx1t8ppHdW4/YHi2VHAycqRkBMkhvmOAnxdrB4Fnneds2DVqDX5PoJgarK\nIb0H5XfM398WlN67NxUpFoaT6xM2d/ACkZ3dvH8CgYEAsw+13ouQJATnUMX/IQPc\nncVOnkc3+9Hq1Dg0mRk7dFTLOCtkELtNKmJkqv4hEzQhyOo95n/Hnt+lB5JUeTug\n2VErw5fzqzxeCJKANJbBuKmXRE4SSkNb6nU9sMXcQVTzvPd/lqvuxwDDzO8BmZR4\n7IkY+Gln3BaQgFOx6NuNISo=\n-----END PRIVATE KEY-----\n",
	    	  client_email: "srushtienterprise@bindisevak.iam.gserviceaccount.com",
	    	  client_id: "115723816674794850356",
	    	  auth_uri: "https://accounts.google.com/o/oauth2/auth",
	    	  token_uri: "https://accounts.google.com/o/oauth2/token",
	    	  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	    	  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/srushtienterprise%40bindisevak.iam.gserviceaccount.com"
	      }
	  });
	  //Mail options
	  mailOpts = {
	      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
	      to: 'bindisevak90@gmail.com',
	      subject: 'Website contact form',
	      text: req.body.message
	  };
	  smtpTrans.sendMail(mailOpts, function (error, response) {
	      //Email not sent
	      if (error) {
	          res.render('index', { title: 'Contact', msg: 'Error occured, message not sent.', err: true})
	          console.log("I am here. Error");
	      }
	      //Yay!! Email sent
	      else {
	          res.render('index', { title: 'Contact', msg: 'Message sent! Thank you.', err: false})
	          console.log("I am here. Success");
	      }
	  });
	  smtpTrans.close(); 
	});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;