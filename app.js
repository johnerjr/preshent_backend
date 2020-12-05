const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const adminRouter = require('./src/routes/admin');
const version1Router = require('./src/routes/version1');
const categoryRouter = require('./src/routes/category');
const productsRouter = require('./src/routes/products');
const question_answerRouter = require('./src/routes/question_answer');
const flow_builder = require('./src/routes/flow_builder');

const express =require("express");
const config = require('./src/config/config');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
app.use(cors());
const port = config.port ? config.port : "4251";

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/v1', version1Router);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productsRouter);
app.use('/api/question_answer', question_answerRouter);
app.use('/api/flow_builder', flow_builder);


app.listen(port,()=>{
    console.log('app.js web server is running on', `${port}`, 'Port..')
})