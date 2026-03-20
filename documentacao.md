
## Documentação da API

#### Servidor rodando

```http
  GET /
```
#### Retorna:

````
Hi, i am servidor 
````

#### Retorna todos os itens

```http
  GET /users
```
#### Retorna:

#### status 201
````
{
  "message": "usuarios listados com sucesso",
  "data": {
    "id": "0000000000000000",
    "email": "Usuario@email.com",
    "name": "Usuario"
  },
  {
    "id": "0000000000000000",
    "email": "Usuario@email.com",
    "name": "Usuario"
  }
}
````
#### status 400
````
{
  "error": "email ja existe"
}
````


#### Cria um usuario

```http
  PUT/ users_creat
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Generico|
| `email`      | `string` | unico|

#### Retorna:

#### status 201
````
{
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "id": "69bd97258fcc080245e9caa2",
    "email": "Usuario@email.com",
    "name": "Usuario"
  }
}
````
#### status 400
````
{
  "error": "email ja existe"
}
````

#### status 500
````
{
  "error": "Erro ao cadastrar usuário"
}
````


#### Atualizar um usuario

```http
  PUT/ users_Update
```

| parms   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | ID do usuario que deseja atualizar|



| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Generico|
| `email`      | `string` | unico|

#### Retorna:

#### status 201
````
{
  "message": "Usuário atualizado com sucesso",
  "data": {
    "id": "0000000000000",
    "email": "Usuario@email.com",
    "name": "Usuario"
  }
}
````
#### status 404
````
{
  "error": "Usuario não encontrado"
}
````

#### status 500
````
{
  "error": "Erro ao atualizar usuário"
}
````

#### Deleatr um usuario

```http
  PUT/ users_delete
```

| parms   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | ID do usuario que deseja deletar|



| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Generico|
| `email`      | `string` | unico|

#### Retorna:

#### status 201
````
{
  "message": "Usuário deletado com sucesso",
  "data": {
    "id": "0000000000000",
    "email": "Usuario@email.com",
    "name": "Usuario"
  }
}
````
#### status 404
````
{
  "error": "Usuario não encontrado"
}
````

#### status 500
````
{
  "error": "Erro ao deletar usuário"
}
````
