# Projeto Compacine📽️🎞️

Este projeto é uma bilheteria digital que permite acessar sessões, tickets e filmes. Foi desenvolvido utilizando Node.js com TypeScript e outras tecnologias para garantir a qualidade e manutenibilidade do código.

## Tecnologias Utilizadas

| Tecnologia                          | Utilizada |
| ----------------------------------- | --------- |
| Node.js com TypeScript              | ✅        |
| Documentação com Swagger            | ✅        |
| Banco de dados SQLite               | ✅        |
| ORM TypeORM                         | ✅        |
| ESLint e Prettier                   | ✅        |
| Versionamento no GitHub             | ✅        |
| Conventional Commits, Small commits | ✅        |

## Requisitos Não Obrigatórios

| Requisito                            | Utilizada |
| ------------------------------------ | --------- |
| Testes unitários, e2e (Jest, Vitest) | ⏳        |
| Validação de rotas e payload/body    | ⏳        |

## Instalação

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão recomendada: 14.x ou superior)
- npm
- Postman
- Git

## Passo a passo:

1. Clone este repositório na sua máquina local:
   ```bash
   git clone https://github.com/FelipeMourah/Projeto-Compacine.git
   ```
2. Navegue até o diretório do projeto:
   ```cmd
   cd projeto-compacine
   ```
3. Instale as dependências:
   ```cmd
   npm install (ou npm i)
   ```

## Executando as migrations:

    npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run

## Executando a aplicação:

    npm start

## Para executar os testes unitários, rode:

    npm test

## Testing

##### Abra o Postman e siga os passos abaixo

### Get, Delete

1. Coloque a URL localhost:"portaNo.env"/api/v1/rotaQueDesejaTestar
2. Selecione o método HTTP
3. Clique em "Send"

   ![TestGet](https://i.imgur.com/kn2y0hP.png)

### Post, Put

1. Clique em "body"
2. Selecione "raw"
3. Selecione JSON
4. Digite a requisição
5. Clique em "Send"

   ![TestPostPut](https://i.imgur.com/f3LOJEr.png)

# Dados .env

    PORT = 3000
