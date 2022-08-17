// Configuração inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');
const personRoutes = require('./routes/personRoutes');

//Forma de ler o JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

//Rotas da API
app.use('/person', personRoutes)


//Rota inicial / endpoint
app.get('/',(req, res)=>{
    //Mostrar requisição

    res.json({message: 'Oi Express'})
})

//Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nrc3pi6.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log("Conectamos ao MongoDB")
    app.listen(3000);
})
.catch((err)=> console.log(err));


// String de conexão: mongodb+srv://mbfreitas0:<mbf@190377>@cluster0.nrc3pi6.mongodb.net/?retryWrites=true&w=majority
