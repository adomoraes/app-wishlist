```markdown
# Wishlist App usando Vue.js e JSON-Server

Para criar a aplicação utilizei o conceito de lista de desejos (wishlist) usando Vue.js como framework front-end, JSON-Server como backend simulado e Vuetify para estilização.

## Configuração Inicial

### Instalação
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

```bash
# Instalar o Vite globalmente
npm install -g create-vite

# Criar um novo projeto Vite
create-vite nome_do_projeto

# Entrar na pasta do projeto
cd nome_do_projeto

# Instalar as dependências
npm install vue-router axios vuetify
```

### Configuração do JSON-Server
- Crie um arquivo `db.json` com a seguinte estrutura:

```json
{
  "wishlistsItems": [],
  "status": [],
  "wishlists": []
}
```

- Inicie o JSON-Server apontando para o arquivo `db.json`:

```bash
json-server --watch db.json
```

## Desenvolvimento

### Configuração do Vue Router
- `router/index.js` para definir as rotas da aplicação.

### Criação de Componentes Vue
- `components/`

### Integração com o JSON-Server
- Utilizei JS para fazer requisições HTTP para o servidor JSON.

### Implementação da Lógica de Negócios
Implementei a lógica para manipular os dados recebidos do servidor, como exibir os clientes cadastrados, listar os produtos disponíveis, adicionar/remover produtos da wishlist, etc.

## Funcionalidades Principais

- Cadastro de Clientes/Produtos
- Listagem de Produtos/Produtos
- Visualização da Wishlist
- Update de status de Clientes/Produtos

## Exemplo de Fluxo de Trabalho

1. O usuário acessa a aplicação e pode se cadastrar como cliente.
2. Após preencher o formulário, o cliente pode navegar pela lista de produtos disponíveis.
3. O cliente pode adicionar produtos à sua wishlist.
4. O cliente pode visualizar e gerenciar sua wishlist.
5. As ações do cliente (cadastro, adição à wishlist, etc.) são refletidas no servidor JSON.

## Considerações Finais

- Teste a aplicação em vários navegadores e dispositivos para garantir uma experiência consistente.

Este é um guia geral para resolver um teste front-end usando Vue.js com base no cenário de wishlist. Dependendo dos requisitos específicos do teste e da complexidade da aplicação, se faz necessário ajustar ou expandir essas etapas.
```