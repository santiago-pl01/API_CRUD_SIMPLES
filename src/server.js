import express from 'express';
import dotenv from 'dotenv';
import { UserController } from './controller/index.js'; 

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

// Rota para listar todos os usuários
app.get(
    '/users',
    UserController.readUser
)

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

//rota do servidor
app.get('/', (req, res) =>{
    res.send("Servidor ")
})

// Iniciando o servidor
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