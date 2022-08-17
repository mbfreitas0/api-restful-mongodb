const router = require('express').Router();
const Person = require('../models/Person'); 

//Rotas da API
router.post('/', async(req, res)=>{

    //req.body
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }
    if(!name) {
        res.status(422).json({error: 'O campo nome é obrigatorio'})
    }

    try {
        //Criando dados
        await Person.create(person)
        res.status(201).json({message: 'Pessoa enserida com sucesso no sistema !'})

    }catch(error){
        res.status(500).json({ error: error })
    }

})

//Read - Leitura de dados
router.get('/:id', async (req, res)=>{
    //Extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
       const person = await Person.findOne({_id: id})
        
        if(!person) {
            res.status(422).json({message:'O usuário não foi encontrado'})

            return
        }

    }catch(error){
        res.status(500).json({error: error})
    }

})

//Update - atualização de dados (PUT / PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = { 
        name,
        salary,
        approved,
    }


    try {
        const updatedPerson = await Person.updateOne({_id:id}, person)
        res.status(200).json(person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message:'O usuário não foi encontrado'})
            return
        }        

    }catch(error){
        res.status(500).json({error: error})
    }
})

//Delete - deletar dados
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    try {

        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'Usuário removido com sucesso'})

        if(!person) {
            res.status(422).json({message:'O usuário não foi encontrado'})
            return 
        }
    }catch(error){
        res.status(500).json({ error: error })
    }
})


module.exports = router