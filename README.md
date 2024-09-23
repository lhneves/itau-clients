# Itaú Clients

A interface do projeto Itaú Clientes foi inspirada em páginas e tipografias das páginas do itaú na web.

## Como rodar o projeto

Faça o download em formato zip deste projeto ou rode o comando:

```zsh
git clone https://github.com/lhneves/itau-clients.git
```

Após ter o projeto baixado, existem duas maneiras para executa-lo:

### 1. Docker

Caso você possua docker na sua máquina, abra o `Docker Desktop`, ou dê start no docker engine pelo terminal.

Abra um terminal no diretório raíz do projeto itau-clients e rode:

```zsh
docker-compose up --build
```

Esse comando irá buildar duas imagens do docker e subir ambas as imagens, uma para simular o backend com `json-server` e outra para iniciar o frontend, que se encontrará no endereço [http://localhost:4200/](http://localhost:4200/).

### 2. Node

Caso não tenha Docker instalado, mas tenha `Node` e `npm`:

Abra um terminal no diretório raíz do projeto e rode:

```zsh
npm run server
```

Em _**OUTRO**_ terminal, no mesmo diretório, e rode:

```zsh
ng serve
```

A aplicação se encontrará no endereço [http://localhost:4200/](http://localhost:4200/).

## Resumo

Backend

- `json-server` com db.json com lista de clientes
- `Dockerfile` para o backend

Frontend

- Responsividade
- Requests http para json-server, cobrindo todas operações CRUD
- Validação de formulário
- Validação de criação de clientes com código já existente
- Testes para todos os casos de uso de `ClientCardComponent`
- UI Library - Prime NG
- `Dockerfile` para o frontend

Docker

- `docker-compose` para lidar com dois containers ao mesmo tempo
