# Product Price

Trata-se da API de uma simulação de uma aplicação utilizada para atualizar o valor de determinados produtos, onde é possível validar as informações enviadas para atualizar os produtos e, caso os dados estejam de acordo com o padrão, atualizar uma listagem de produtos.

# Sumário
- [Licença](#licenca)
- [Tecnologias utilizadas](#tecnologias)
- [Instruções para rodar o projeto](#instrucoes)
  - [.env](#env)
  - [Iniciando o projeto](#start)
- [Rotas e autenticação](#rotas)
- [Banco de dados](#db)

# Licença <a name="licenca"></a>

Este projeto está sob licença do [MIT](https://github.com/danielbped/product-price-api/blob/master/LICENSE)

## Tecnologias Utilizadas <a name="tecnologias"></a>
- **[Node.js](https://nodejs.org/en/)**: Plataforma de desenvolvimento para construção do ambiente de servidor.
- **[Express](https://expressjs.com/pt-br/)**: Framework web para Node.js utilizado na construção da API.
- **[TypeScript](https://www.typescriptlang.org/)**: Linguagem de programação que adiciona tipagem estática ao JavaScript, proporcionando maior robustez ao código.
- **[TypeORM](https://typeorm.io/)**: ORM (Object-Relational Mapping) para TypeScript e JavaScript que simplifica o acesso e manipulação de banco de dados relacionais.
- **[MySQL](https://www.mysql.com/)**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados da aplicação.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: Módulo que carrega variáveis de ambiente a partir de um arquivo .env para o processo do Node.js.
- **[Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)**: Middleware para Express que habilita o controle de acesso HTTP (CORS).
- **[Http Status Codes](https://www.npmjs.com/package/http-status-codes)**: Status Codes: Pacote que fornece uma lista de constantes para códigos de status HTTP.
- **[Docker](https://docs.docker.com/compose/)**: Uma ferramenta para definir e executar aplicações multi-contêineres. É a chave para desbloquear uma experiência de desenvolvimento e implantação simplificada e eficiente.
- **[Swagger](https://swagger.io/)**: Ferramente utilizada para criar documentações exemplificando a utilização das rotas, de uma forma prática.

## Instruções para rodar o projeto <a name="instrucoes"></a>

### Será necessário ter instalado na sua máquina:

```
  Git
  Node v20.11.1
  Docker
```

- Clone o repositório com o comando git clone:

```
  git clone git@github.com:danielbped/product-price-api.git
```

- Entre no diretório que acabou de ser criado:

```
  cd product-price-api
```
- Para o projeto funcionar na sua máquia, será necessário instalar suas dependências, para isso, utilize **npm install**:
```
  npm install
```

Outro passo importante é instanciarmos o banco de dados. Para isso, foi criado um arquivo **docker-compose** para gerar uma banco de dados local, o banco de dados utilizado é com a linguagem de consulta **MySQL**. Então, para instanciar o banco de dados, basta rodar o comando abaixo no terminal:

```
  docker-compose up -d
```

## .env <a name="env"></a>
Na raiz do projeto, será necessário criar um arquivo .env, com as seguintes informações:

```
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=
MYSQL_PASSWORD=
MYSQL_DB=product-price
HOST_DB=localhost

```

Um arquivo com estas definições já está presente no projeto, o **.env.example**, para que funcione corretamente, basta renomear para apenas **.env**, e alterar os dados **MYSQL_USER**, **MYSQL_PASSWORD** e **MYSQL_ROOT_PASSWORD** de acordo com os dados de usuário do banco de dados local. Em relação às outras variáveis, podem ser usadas as credenciais presentes no arquivo, são responsáveis pela criação do banco de dados.

## Iniciando o projeto <a name="start"></a>

Para rodar o projeto na sua máquina, basta utilizar o comando a seguir:

```
  npm start
```

Caso tudo esteja de acordo, você verá as seguintes mensagens no terminal:

```
  Docs available at http://localhost:3000/docs
  Server running on port 3000
  Database connected successfully
```

## Rotas e autenticação <a name="rotas"></a>

Para visualizar as rotas disponíveis, também como seus respectivos conteúdos de body e parametros, basta navegar para a rota **http://localhost:3000/docs**, onde está disponibilizada uma documentação exclusiva das rotas, desenvolvida utilizando Swagger.


## Banco de dados <a name="db"></a>

O banco de dados foi desenvolvido utilizando **MySQL** com o auxílio da ORM **TypeORM** nas migrations e nas queries. A arquitetura do banco possui duas tabelas (Products e Packs), e suas colunas podem ser observadas a seguir:

```
  Products

  code            number
  name            string
  cost_price      number
  sales_price     number
  createdAt       Date
  updatedAt       Date


  Packs

  id              number
  pack_id         number
  product_id      number
  qty             number
  createdAt       Date
  updatedAt       Date

```

Um [arquivo](https://github.com/danielbped/product-price-api/blob/master/database.sql) de queries pode ser encontrado nos diretórios do projeto, nele há comandos SQL para criação e população das tabelas, a criação das tabelas será feita automaticamente ao instanciar o container do Docker.