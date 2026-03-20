import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

/*
Adicionar as seguintes regras:
- email: precisa ter um formato de email válido,
- name: precisa ter no mínimo 3 caracteres, campo obrigatório
-buscar usuario por id, nome ou email

*/

class UserService {
    createUser = async ({name, email}) => {
        try {
            const user = await prisma.user.create({
                data: {name, email}
            });
            return user;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error("Email já existe. Por favor, use um email diferente.");
            }
            throw error;
        }
    }
    //ReadUser (id = none, name=none, email=none)

    ReadUser = async () => {
        try {
            const user = await prisma.user.findMany()
            return user;
        }
        catch (error) {
            throw new Error("Erro ao buscar usuários");
        }
    }

    //UpdateUser precisa receber o id do usuario a ser atualizado, e os novos dados (name e email)
    UpdateUser = async ({ where, data }) => {
        try {
            const user = await prisma.user.update({
                where,
                data
            });
            return user;
        }
        catch (error) {
            //usuario não encontrado
            if (error.code === 'P2025') {
                const err = new Error("Usuario não encontrado");
                err.type = "NOT_FOUND";
                throw err;
            }
           const err = new Error("Erro ao atualizar usuário");
           err.type = "INTERNAL_ERROR";
           throw err;
        }
    }
    //DeleteUser precisa receber o id do usuario a ser deletado
    DeleteUser = async (id) => {
        try {
            const user = await prisma.user.delete({
                where: { id }
            });
            return user;
        }
        catch (error) {
            if (error.code === 'P2025') {
                const err = new Error("Usuario não encontrado");
                err.type = "NOT_FOUND";
                throw err;
            }
            const err = new Error("Erro ao deletar usuário");
            err.type = "INTERNAL_ERROR";
            throw err;
        }
    }
}



export default new UserService();