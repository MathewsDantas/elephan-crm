# Projeto Express com Cache, Logs e Testes e integração com Ploomes

Este é um projeto backend criado com **Express** para fornecer uma API, **Redis** para cache de respostas, **Axios** para realizar requisições HTTP, **Swagger** para documentação da API, **Winston** para logs e **Jest** para testes automatizados. O projeto também é configurado para ser executado com **Docker**.

## Tecnologias Utilizadas

- **Express**: Framework minimalista para construção de APIs em Node.js.
- **Jest**: Framework de testes para JavaScript/Node.js.
- **Redis**: Armazenamento em cache para melhorar a performance da API.
- **Axios**: Cliente HTTP para fazer requisições para APIs externas.
- **Swagger**: Ferramenta para documentar e testar endpoints da API.
- **Winston**: Biblioteca de logging para capturar e salvar logs do sistema.
- **Docker**: Contêinerização para facilitar o ambiente de desenvolvimento e produção.

## Funcionalidades

- **Cache com Redis**: As respostas das requisições são armazenadas em cache no Redis para melhorar a performance, evitando requisições repetitivas.
- **Documentação com Swagger**: A API é documentada automaticamente com Swagger para facilitar a exploração e entendimento dos endpoints.
- **Logs com Winston**: Todos os logs são centralizados usando Winston, incluindo logs de erro, sucesso e operações do sistema.
- **Testes com Jest**: O sistema inclui testes automatizados para garantir a qualidade e confiabilidade da aplicação.
- **Docker**: O ambiente de desenvolvimento e produção é configurado usando Docker, facilitando o processo de setup e deploy.

## Estrutura de Pastas

- `src/`: Contém o código-fonte da aplicação.
  - `controllers/`: Controladores que definem a lógica dos endpoints.
  - `middlewares/`: Middlewares, como o de erro.
  - `services/`: Serviços auxiliares (ex.: integração com APIs externas).
  - `config/`: Configurações de inicialização, como a do Redis e Winston.
  - `routes/`: Definições de rotas da API.
  - `tests/`: Arquivos de testes unitárioso.

- `docker-compose.yml`: Configurações para rodar o Redis e a aplicação no Docker.

- `Dockerfile`: Definições de como criar a imagem Docker para o servidor Express.


## Instalação

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Docker** (para rodar o Redis e a aplicação no contêiner)

### Passos para rodar o projeto localmente

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/MathewsDantas/elephan-crm.git
   cd nome-do-projeto

2. **Rodar o Docker(Ambiente Dev)**

   ```bash
   docker-compose up --build express-dev

3. **Acessar a aplicação**
   
   Após rodar o comando acima, a aplicação estará disponível em http://localhost:3000.

4. **Acessar a documentação Swagger**

   A documentação da API estará disponível em:
    
   http://localhost:3000/api-docs

5. **Executar os testes**

   ```bash
   docker-compose exec express-dev npm test
