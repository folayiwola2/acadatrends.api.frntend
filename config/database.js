// //set up mongoose connection
const mongoose = require('mongoose');

let isDev = process.env.NODE_ENV !== 'production'
//const localDb = 'mongodb://localhost/AcadatrendsDb'
const localDb  = 'mongodb+srv://acadatrends:acadatrends_1@cluster0-mxdmn.mongodb.net/test?retryWrites=true&w=majority'
const productionDb = 'mongodb+srv://acadatrends:acadatrends_1@cluster0-mxdmn.mongodb.net/test?retryWrites=true&w=majority'
const db = isDev ? localDb : productionDb
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...',db))
    .catch(err => console.log("error is here", err));
 