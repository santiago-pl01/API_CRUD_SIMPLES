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
            const {name} = req.body;
            const {email} = req.body;

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
            const user = await UserServices.UpdateUser({
                where: { id: req.params.id },
                data: {
                    name: req.body.name,
                    email: req.body.email
                }
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
            return res.status(500).json({
                error: "Erro ao deletar usuário"
            })
        }
    }
}

export default new UserController();
