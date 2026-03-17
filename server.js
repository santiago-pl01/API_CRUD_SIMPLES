import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
const PORT = process.env.PORT || 3000;
const app = express();
const prisma= new PrismaClient();

app.use(express.json());

// Rota para criar um novo usuário
app.post('/users_create', async (req, res)=>{
    
    await prisma.user.create({
        data:{
            name: req.body.name,
            email: req.body.email,
    
        }
    })

    res.status(201).send("Dados recebidos")
    //res.status(201) indica que a requisição foi bem sucedida e um novo recurso foi criado como resultado. 
})

// Rota para atualizar um usuário existente
app.put('/users_update/:id', async (req, res)=>{
    
    await prisma.user.update({

        where:{
            id: req.params.id
        },

        data:{
            name: req.body.name,
            email: req.body.email,
    
        }
    })

    res.status(201).send("Dados atualizados")
    //res.status(201) indica que a requisição foi bem sucedida e um novo recurso foi criado como resultado. 
})

// Rota para deletar um usuário existente
app.delete('/users_delete/:id', async (req, res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).send("Usuário deletado")
})

// Rota para listar todos
app.get('/users', async (req, res)=>{

    const users = await prisma.user.findMany();

    res.status(200).json(users)
})

app.get('/', (req, res) =>{
    res.send("Servidor ")
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

/*
     Criar nossa API de Usuário:
     -listar usuarios
     -criar usuario
     -deletar usuario
     -atualizar/editar usuario

*/