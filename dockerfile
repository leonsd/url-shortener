# Use a imagem oficial do Node.js 18.17
FROM node:18.17

# Crie uma pasta para a aplicação dentro do container
WORKDIR /usr/src/app

# Instale as dependências do projeto
COPY package*.json ./
RUN npm install

# Copie o código fonte da aplicação
COPY . .

# Exponha a porta 3000 para a API
EXPOSE 3000

# Inicie o servidor
CMD [ "npm", "start" ]
