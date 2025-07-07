# Simple Online Clothing Store

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Quick Start

1. Clone the repository
2. Open the project in Visual Studio Code
3. Run Dev Containers: Reopen in Container

## Backend Setup

```bash
# change directory to backend
cd backend

# copy env file
cp .env.example .env

# install dependencies
pnpm install
```

### Compile and run the project

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Frontend Setup

```bash
# change directory to frontend
cd frontend

# copy env file
cp .env.example .env

# Install dependencies
pnpm install
```

### Compile and run the project

```bash
# development
pnpm run dev

# build
pnpm run build

# production
pnpm run start

# add ui components
pnpm dlx shadcn@latest add
```

### Improvements

- [ ] implement authorization, remove backend hardcoded authorization
- [ ] add CI/CD pipeline for backend and frontend
- [ ] dockerize backend and frontend
- [ ] add tests
- [ ] move to monorepo structure
