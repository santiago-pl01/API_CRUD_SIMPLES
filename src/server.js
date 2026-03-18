import express from 'express';
import dotenv from 'dotenv';
import { UserController } from './controller/index.js'; 
import { PrismaClient } from './generated/prisma/client.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const prisma= new PrismaClient();

app.use(express.json());

/*app.get(
    '/users',
    UserController.readUser
)*/

// Rota para criar um novo usuário
app.post(
    '/users_create',
    UserController.crudUsuario
)

// Rota para atualizar um usuário existente
app.put(
    '/users_update/:id',
    UserController.updateUser
)

// Rota para deletar um usuário existente
app.delete(
    
    '/users_delete/:id', 
    UserController.deleteUser
)


// Rota para listar todos
app.get('/users', async ( req, res)=>{

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