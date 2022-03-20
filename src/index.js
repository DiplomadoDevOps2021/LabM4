import express from 'express';
// seguridad & relacionado
import cors from 'cors';
// var csurf = require('csurf')
import session from 'express-session';
import helmet from 'helmet';
// TODO : CSRF, XSS, JWT
//

const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const { helpers } = require('handlebars');

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//middlewares
// --> SEC
// var csrfProtection = csrf({ cookie: true });
// var parseForm = bodyParser.urlencoded({ extended: false });

app.use(session({
    secret: "fJEf5g4qPa",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false
    }
  })
)

const corsOptions = {methods: ['GET', 'POST', 'PUT', 'PATCH' ,'DELETE' , 'OPTIONS']}
app.use(cors(corsOptions));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css", "https://use.fontawesome.com", "http://localhost:9000"],
      "script-src-elem": ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.3/axios.min.js", "https://fonts.googleapis.com", "https://code.jquery.com", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js", "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"],
      "style-src": null,
    },
  })
);


// <-- SEC

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Variables
app.use((req, res, next) => {
    next();
});

//Routes
import retiro10 from './routes/retiro10.js';
app.use('/', retiro10);


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
