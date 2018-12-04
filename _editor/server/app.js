const express    = require('express');
const nunjucks   = require('express-nunjucks');
const bodyParser = require('body-parser');
const config     = require('../config');

const app   = express();
const port  = process.env.PORT || 3000;
const isDev = app.get('env') === 'development';

app.set('views', config.editorDir);

const njk = nunjucks(app, {
    watch: isDev,
    noCache: isDev
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD
const routes = config.routes;
for (var route in routes) {
    require('./routes'+routes[route])(app);
}

// Views

app.get('/', (req, res) => {
    res.render(config.templatesDir + 'index');
});

app.get('/editor', (req, res) => {
    res.render(config.templatesDir + 'editor');
});

app.get('/sections', (req, res) => {
    res.render(config.templatesDir + 'sections');
});

app.get('/section_editor', (req, res) => {
    res.render(config.templatesDir + 'section_editor');
});

app.use(express.static('.'));
app.use(express.static(config.editorDir));

app.listen(port);
