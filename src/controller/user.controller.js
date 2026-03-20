import { UserServices } from "../services/index.js";

/*
Funções do controller:
-receber as requisições do cliente
-chamar as funções do service
-tratar as respostas do service e enviar para o cliente
-tratar dados de entrada (validações, formatações, etc)
-status http: 200 (ok), 201 (created), 400 (bad request), 404 (not found), 500 (internal server error)
*/

class UserController {
    crudUsuario = async (req, res) => {
        try {
            const {name, email} = req.body;
            
            if(!name || !email) {
                return res.status(400).json({
                    error: "Nome e email são obrigatórios"
                });
            }
            if(!email.includes("@")){
                return res.status(400).json({
                    error:"O Email precisa de um @"
                })
            }
            if(name.length < 3) {
                return res.status(400).json({
                    error: "O nome deve conter no mínimo 3 caracteres"
                });
            }
            const user = await UserServices.createUser({name, email});

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso",
                data: user
            });

        }
        catch (error) {
            if (error.message === "Email já existe") {
                return res.status(400).json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: "Erro ao cadastrar usuário"
            });
        }
    }

    readUser = async (req, res) => {
        /*adicionar busca espeficica  */
        try {
            const user = await UserServices.ReadUser()
            return res.status(200).json({
                message: "usuarios listados com sucesso",
                data: user
            });
        }
        catch (error) {
            if (error.message === "usuario não encontrado") {
                return res.status(400).json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: "Erro ao buscar usuários"
            });
        }
    }
    updateUser = async (req, res) => {
        try {
            const {id} = req.params;
            const {name, email} = req.body;

            const user = await UserServices.UpdateUser({
                where: { id},
                data: {name, email}
            }
            );
            return res.status(200).json({
                message: "usuario atualizado com sucesso",
                data: user
            });
        }
        catch (error) {
            if(error.type === "NOT_FOUND") {
                return res.status(404).json({
                    error: error.message
                });
            }
            if(error.type === "INTERNAL_ERROR") {
                return res.status(500).json({
                    error: error.message
                });
            }
        }
    }

    deleteUser = async (req, res) => {
        try {
            const user = await UserServices.DeleteUser(req.params.id);

            return res.status(201).json({
                message: "usuario deletado com sucesso",
                data: user
            });
        }
        catch (error) {
            if(error.type === "NOT_FOUND") {
                return res.status(404).json({
                    error: error.message
                });
            }
            if (error.type ==="INTERNAL_ERROR") {
                return res.status(500).json({
                    error: error.message
                });
            }
        }
    }
}
export default new UserController();
