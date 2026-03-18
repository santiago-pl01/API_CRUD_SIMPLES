import req from "express/lib/request.js";
import { UserServices } from "../services/index.js";

class UserController {
    crudUsuario = async (req, res) => {
        try {
            const user = await UserServices.CreateUser(
                req.body.name,
                req.body.email
            );

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
        }

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
        });
    }

    readUser =async(req, res)=>{
        try{
            const user = await UserServices.ReadUser()
            console.log(user)
            return res.status(200).json({
                message: "usuarios listados com sucesso",
                data: user
            });
        }

        catch(error){
              if(error.message === "usuario não encontrado") {
                return res.status(400).json({
                    error: error.message,
                });
            }
        }

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
        });
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

            return res.status(201).json({
                message: "usuario atualizado com sucesso",
                data: user
            });
        }
        catch {
            if (error.message === "Email já existe") {
                return res.status(400).json({
                    error: error.message,
                });
            }
        }

        return res.status(200).json({
            message: "usuario cadastrado com sucesso"
        })

    }

    deleteUser = async (req, res) => {
        try {
            const user = await UserServices.DeleteUser({
                where: { id: req.params.id },
            }
            );

            return res.status(201).json({
                message: "usuario deletado com sucesso",
                data: user
            });
        }
        catch {
            if (error.message === "Email já existe") {
                return res.status(400).json({
                    error: error.message,
                });
            }
        }

        return res.status(200).json({
            message: "usuario cadastrado com sucesso"
        })

    }
}

export default new UserController();
