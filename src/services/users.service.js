import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

class UserService {
    createUser = async (name, email) => {
        try {
            const user = await prisma.user.create({
                data: {
                    name, email
                }
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
        catch(error){
            throw new Error("Erro ao buscar usuários");
        }


    }

    UpdateUser = async (id, name, email) => {
        try {
            const user = await prisma.user.update({
                where: { id },
                data: { name, email }
            });
            return user;
        }
        catch (error) {
            if (error.code === '')
                throw new Error("não foi possivel atualizar")
        }
        throw error

    }

    DeleteUser = async (id) => {
        try {
            const user = await prisma.user.delete({
                where: { id }

            });
            return user;
        }
        catch (error) {
            if (error.code ==='2P2025')
                throw new Error("não foi possivel deletar usuario")
        }
        throw error
    }
}



export default new UserService();