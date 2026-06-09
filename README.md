# 📦 Catálogo Digital para Distribuidoras

Sistema de gestão de catálogo digital desenvolvido para distribuidoras, permitindo o controle completo de produtos, categorias, estoque e relatórios por meio de uma API REST moderna e segura.

---

## 📖 Sobre o Projeto

O **Catálogo Digital para Distribuidoras** resolve o problema de distribuidoras que gerenciam seus produtos de forma manual ou em planilhas desconexas, oferecendo uma plataforma centralizada, acessível via web e mobile, com controle de acesso por perfil de usuário.

**Público-alvo:** distribuidoras de pequeno e médio porte que precisam digitalizar e escalar sua operação de catálogo de produtos.

**Problema resolvido:**
- Catálogo de produtos descentralizado e sem controle de versão
- Falta de rastreabilidade de movimentações de estoque
- Ausência de relatórios e indicadores de gestão
- Dificuldade de acesso mobile para equipes externas

---

## 🏗️ Visão Geral da Arquitetura

```
Cliente (Web / Mobile)
        ↓
   Firebase Auth
   (login / token)
        ↓
  Backend Node.js
  (Express + TypeScript)
        ↓
  Firebase Firestore      Firebase Storage
  (banco de dados)        (imagens de produtos)
        ↓
    Response JSON
```

A aplicação segue **Clean Architecture** com separação clara entre camadas:

```
Request → Route → Middleware → Controller → UseCase → Repository → Firebase → Response
```

---

## 🚀 Stack Tecnológica

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | LTS | Runtime |
| Express | latest | Servidor HTTP |
| TypeScript | 6.x | Tipagem estática |
| Firebase Admin SDK | latest | Acesso ao Firebase no servidor |
| Zod | latest | Validação de dados |
| Multer | latest | Upload de arquivos |
| tsyringe | latest | Injeção de dependências |
| dotenv | latest | Variáveis de ambiente |
| cors | latest | Cross-Origin Resource Sharing |

### Banco de Dados e Serviços Firebase
| Serviço | Uso |
|---|---|
| Firebase Firestore | Banco de dados principal (NoSQL) |
| Firebase Authentication | Autenticação de usuários (Email/Senha) |
| Firebase Storage | Armazenamento de imagens dos produtos |

### Frontend *(não incluído neste repositório)*
| Tecnologia | Uso previsto |
|---|---|
| Next.js + React | Interface web |
| TypeScript | Tipagem |
| TailwindCSS | Estilização |
| shadcn/ui + Radix UI | Componentes de interface |

---

## 📁 Estrutura do Projeto

Este é um repositório **monorepo** contendo frontend e backend no mesmo projeto.

```
catalogo-digital/                  # Raiz do repositório
│
├── frontend/                      # Aplicação web (Next.js)
│   ├── src/
│   │   ├── app/                   # App Router (Next.js 14+)
│   │   ├── components/            # Componentes reutilizáveis (shadcn/ui)
│   │   ├── hooks/                 # Custom hooks React
│   │   ├── services/              # Chamadas à API do backend
│   │   ├── store/                 # Estado global
│   │   └── types/                 # Tipagens TypeScript
│   ├── public/
│   ├── .env.local
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                       # API REST (Node.js + Express)
│   ├── src/
│   │   ├── modules/               # Módulos de domínio
│   │   │   ├── auth/              # Autenticação e usuários
│   │   │   │   ├── controllers/
│   │   │   │   ├── middlewares/
│   │   │   │   ├── repositories/
│   │   │   │   ├── routes/
│   │   │   │   └── useCases/
│   │   │   ├── products/          # Gestão de produtos
│   │   │   │   ├── controllers/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   ├── routes/
│   │   │   │   ├── useCases/
│   │   │   │   └── validators/
│   │   │   ├── categories/        # Categorias de produtos
│   │   │   ├── inventory/         # Controle de estoque
│   │   │   ├── uploads/           # Upload de imagens
│   │   │   └── reports/           # Relatórios e dashboard
│   │   │
│   │   ├── shared/                # Código compartilhado
│   │   │   ├── infra/
│   │   │   │   ├── firebase/      # Configuração Firebase Admin
│   │   │   │   └── http/          # Rotas globais
│   │   │   ├── middlewares/       # Middlewares globais
│   │   │   ├── errors/            # Tratamento de erros (AppError)
│   │   │   ├── types/             # Tipagens globais (express.d.ts)
│   │   │   └── utils/
│   │   │
│   │   ├── config/                # Configurações gerais
│   │   └── main/
│   │       ├── app.ts             # Configuração do Express
│   │       └── server.ts          # Entrada da aplicação
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── .env
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                          # Documentação e diagramas
│   └── projeto_catalogo_digital.drawio
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚙️ Como Executar

### Pré-requisitos
- Node.js LTS
- Conta no Firebase com projeto criado
- Firestore, Authentication (Email/Senha) e Storage habilitados

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/catalogo-digital.git
cd catalogo-digital
```

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env`:

```env
PORT=3333

FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@seu-projeto.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
```

> **Atenção:** a `FIREBASE_PRIVATE_KEY` deve estar entre aspas duplas, sem espaço após o `=`.

Para obter as credenciais: Firebase Console → Configurações do projeto → Contas de serviço → Gerar nova chave privada.

```bash
# Desenvolvimento
npm run dev       # http://localhost:3333

# Build
npm run build

# Produção
npm start
```

### 3. Frontend

```bash
cd frontend
npm install
```

Crie o arquivo `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

```bash
# Desenvolvimento
npm run dev       # http://localhost:3000

# Build
npm run build

# Produção
npm start
```

---

## 🔑 Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Descrição | Obrigatório |
|---|---|---|
| `PORT` | Porta do servidor | Não (padrão: 3333) |
| `FIREBASE_PROJECT_ID` | ID do projeto Firebase | Sim |
| `FIREBASE_PRIVATE_KEY` | Chave privada da service account | Sim |
| `FIREBASE_CLIENT_EMAIL` | Email da service account | Sim |
| `FIREBASE_STORAGE_BUCKET` | Bucket do Firebase Storage | Sim |

### Frontend (`frontend/.env.local`)

| Variável | Descrição | Obrigatório |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base do backend | Sim |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Web API Key do Firebase | Sim |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação | Sim |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto Firebase | Sim |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket do Storage | Sim |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID do Firebase | Sim |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID do Firebase | Sim |

---

## 🌐 API REST — Endpoints

Todas as rotas (exceto login) exigem o header:
```
Authorization: Bearer <idToken_do_Firebase>
```

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/sincronizar` | Criar/sincronizar perfil no Firestore após login | ✅ |
| GET | `/auth/perfil` | Retornar dados do usuário autenticado | ✅ |

> **Login:** feito diretamente via Firebase Authentication REST API — não passa pelo backend.
> ```
> POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=WEB_API_KEY
> ```

### 📦 Produtos

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/products` | Criar produto | ✅ |
| GET | `/products` | Listar todos os produtos | ✅ |
| GET | `/products/:id` | Buscar produto por ID | ✅ |
| PUT | `/products/:id` | Atualizar produto | ✅ |
| DELETE | `/products/:id` | Remover produto | ✅ |

### 🗂️ Categorias

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/categories` | Criar categoria | ✅ |
| GET | `/categories` | Listar categorias | ✅ |
| GET | `/categories/:id` | Buscar categoria por ID | ✅ |
| PUT | `/categories/:id` | Atualizar categoria | ✅ |
| DELETE | `/categories/:id` | Remover categoria | ✅ |

### 📦 Estoque

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/inventory/movements` | Registrar entrada ou saída | ✅ |
| GET | `/inventory` | Consultar estoque atual | ✅ |
| GET | `/inventory/movements` | Histórico de movimentações | ✅ |

### 🖼️ Upload

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/upload/product-image` | Upload de imagem de produto (multipart/form-data) | ✅ |

### 📊 Relatórios

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| GET | `/reports/dashboard` | KPIs e indicadores gerais | ✅ |
| GET | `/reports/export/csv` | Exportar produtos em CSV | ✅ |
| GET | `/reports/export/pdf` | Exportar relatório em PDF | ✅ |

---

## 🗄️ Banco de Dados — Coleções Firestore

### `users`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | UID do Firebase Auth |
| `nome` | string | Nome do usuário |
| `email` | string | Email |
| `fotoperfil` | string | URL da foto de perfil |
| `cargo` | string | Cargo na empresa |
| `role` | UserRole | Nível de acesso (ADMIN, GERENTE, VENDEDOR) |
| `ativo` | boolean | Conta ativa |
| `ultimoLogin` | Date | Data do último login |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Última atualização |

### `products`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | ID gerado pelo Firestore |
| `nome` | string | Nome do produto |
| `descricao` | string | Descrição |
| `codigo` | string | Código do produto |
| `preco` | number | Preço unitário |
| `quantidade` | number | Quantidade em estoque |
| `imagem` | string[] | URLs das imagens no Storage |
| `categoriaId` | string | Referência à categoria |
| `ativo` | boolean | Produto ativo/inativo |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Última atualização |

### `categories`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | ID gerado pelo Firestore |
| `nome` | string | Nome da categoria |
| `descricao` | string | Descrição |
| `icone` | string | Ícone da categoria |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Última atualização |

### `inventory_movements`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | ID gerado pelo Firestore |
| `produtoId` | string | Referência ao produto |
| `tipo` | string | `ENTRADA` ou `SAIDA` |
| `quantidade` | number | Quantidade movimentada |
| `quantidadeMinima` | number | Limite mínimo para alerta |
| `ultimaMovimentacao` | Date | Data da movimentação |
| `uid` | string | Usuário responsável |
| `createdAt` | Date | Data de criação |

### `reports`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | ID gerado pelo Firestore |
| `titulo` | string | Título do relatório |
| `tipo` | ReportType | Tipo do relatório |
| `periodo` | DateRange | Período analisado |
| `geradoPor` | string | UID do usuário |
| `createdAt` | Date | Data de geração |

---

## 🧱 Arquitetura e Princípios

### Clean Architecture
Cada módulo é isolado e segue a hierarquia:

```
Route → Controller → UseCase → Repository → Firebase
```

- **Controllers:** recebem a requisição HTTP, delegam ao UseCase e retornam a resposta
- **UseCases:** contêm a lógica de negócio, orquestram repositories
- **Repositories:** abstraem o acesso ao Firebase Firestore
- **Entities/DTOs:** definem os contratos de dados entre camadas

### Princípios SOLID aplicados
| Princípio | Aplicação |
|---|---|
| **S** — Single Responsibility | Cada classe tem uma única responsabilidade (Controller não acessa banco, Repository não valida) |
| **O** — Open/Closed | Repositories implementam interfaces, podendo ser trocados sem alterar UseCases |
| **L** — Liskov Substitution | `FirebaseProductRepository` implementa `IProductRepository` |
| **I** — Interface Segregation | Interfaces separadas por módulo (IProductRepository, IUserRepository) |
| **D** — Dependency Inversion | Controllers e UseCases dependem de abstrações, não de implementações concretas |

---

## 🔐 Autenticação e Permissões

O sistema usa **Firebase Authentication** com fluxo:

```
1. Cliente faz login via Firebase (email/senha)
2. Firebase retorna idToken (JWT válido por 1h)
3. Cliente envia idToken no header: Authorization: Bearer <token>
4. Middleware ensureAuthenticated valida o token via firebase-admin
5. req.user é populado com { uid, email }
6. Controller acessa os dados do usuário autenticado
```

**Roles disponíveis:**
- `ADMIN` — acesso total
- `GERENTE` — gerencia produtos, categorias e estoque
- `VENDEDOR` — visualização e consulta

---

## 🔄 Fluxos Principais

### Cadastro e primeiro acesso
```
1. POST Firebase Auth (criar usuário)
2. POST /auth/sincronizar  → cria perfil no Firestore
3. GET  /auth/perfil       → confirma perfil criado
```

### Gestão de produtos
```
1. POST /categories         → criar categoria
2. POST /products           → criar produto (com categoriaId)
3. POST /upload/product-image → vincular imagem ao produto
4. PUT  /products/:id       → atualizar dados
5. POST /inventory/movements → registrar entrada de estoque
```

### Relatórios
```
1. GET /reports/dashboard   → KPIs gerais
2. GET /reports/export/csv  → download CSV
3. GET /reports/export/pdf  → download PDF
```

---

## 🗺️ Roadmap

### ✅ Implementado
- Configuração base do projeto (Node.js + Express + TypeScript)
- Integração Firebase Admin (Firestore, Auth, Storage)
- Middleware de autenticação via Firebase token
- Módulo Auth (sincronizar, perfil)
- Módulo Produtos (CRUD completo)
- Módulo Categorias (CRUD completo)
- Módulo Estoque (movimentações, consulta)
- Upload de imagens para Firebase Storage
- Dashboard com KPIs básicos
- Exportação CSV

### 🔧 Em Desenvolvimento
- Exportação PDF (pendente implementação com pdfkit ou puppeteer)
- Middleware de autorização por role (`authorize(['ADMIN'])`)
- Tratamento centralizado de erros (`AppError`)

### 📋 Planejado
- Frontend (Next.js + TailwindCSS + shadcn/ui)
- Testes unitários, de integração e e2e
- Login com Google (Firebase OAuth)
- Recuperação de senha
- Paginação nas listagens
- Filtros e busca de produtos
- Notificações de estoque baixo
- Deploy (Firebase Hosting + Cloud Run ou Railway)
- Documentação Swagger/OpenAPI

---

## 🧪 Testando a API

### 1. Gerar token (Firebase REST API)
```http
POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=SUA_WEB_API_KEY

{
  "email": "admin@seudominio.com",
  "password": "SuaSenha",
  "returnSecureToken": true
}
```

### 2. Usar o token
```
Authorization: Bearer eyJhbGci...
```

### 3. Criar perfil (primeira vez)
```http
POST http://localhost:3333/auth/sincronizar

{
  "nome": "Administrador",
  "role": "ADMIN"
}
```

### Ordem recomendada de testes
```
POST /auth/sincronizar     → criar perfil
GET  /auth/perfil          → validar
POST /categories           → criar categoria, copiar id
POST /products             → criar produto com categoriaId
POST /upload/product-image → vincular imagem (form-data)
POST /inventory/movements  → entrada de estoque
GET  /reports/dashboard    → ver totais
```

---

## 📄 Licença

Este projeto está licenciado para **fins educativos e profissionais**.

Você pode usar, estudar, modificar e distribuir este código para aprendizado, portfólio, projetos acadêmicos e aplicações profissionais, desde que mantenha a atribuição ao projeto original.

Consulte o arquivo [LICENSE](./LICENSE) para os termos completos em inglês.

---

> Documentação gerada com base no código do backend, guia de desenvolvimento e diagrama de classes do projeto.
