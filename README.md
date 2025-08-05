# 📚 Catálogo de Cursos - Angular

Uma aplicação web Angular para gerenciamento de catálogo de cursos de uma empresa, desenvolvida como parte de um desafio técnico.

## 🎯 Objetivo

Criar uma aplicação web Angular que simule a visualização e o gerenciamento de um catálogo de cursos de uma empresa, demonstrando domínio das tecnologias e boas práticas de desenvolvimento.

## ✨ Funcionalidades

### Requisitos Funcionais Implementados
- ✅ **Listagem de cursos** com todos os campos (nome, categoria, descrição, carga horária)
- ✅ **Filtro por categoria** com interface intuitiva
- ✅ **Página de detalhes** de cada curso
- ✅ **Formulário de cadastro/edição** de cursos
- ✅ **Validação de campos obrigatórios** com feedback visual
- ✅ **Interface responsiva** (mobile e desktop)

### Requisitos Técnicos Implementados
- ✅ **Angular 20.1.0** (superior ao 14 requerido)
- ✅ **Componentes reutilizáveis** com separação clara de responsabilidades
- ✅ **Input/Output, EventEmitter, ViewChild** utilizados adequadamente
- ✅ **RxJS** (Observables, BehaviorSubjects) para gerenciamento de estado
- ✅ **Roteamento com lazy loading** para otimização de performance
- ✅ **Services** com separação clara de responsabilidades
- ✅ **Guard de autenticação** para proteção de rotas
- ✅ **Interceptor HTTP** para logs e headers automáticos
- ✅ **Angular Material** para interface moderna e acessível
- ✅ **Responsividade** com Flexbox/Grid
- ✅ **SCSS** para estilos organizados e reutilizáveis
- ✅ **Mock API** com JSON Server
- ✅ **Clean Code** e componentização adequada

## 🛠️ Tecnologias e Bibliotecas

### Core
- **Angular 20.1.0** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa

### UI/UX
- **Angular Material** - Componentes de interface
- **SCSS** - Pré-processador CSS
- **Flexbox/Grid** - Layout responsivo

### Backend Mock
- **JSON Server** - API mock para desenvolvimento

### Desenvolvimento
- **Angular CLI** - Ferramentas de desenvolvimento
- **Vite** - Bundler e dev server

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── header/                 # Componente de cabeçalho
│   ├── features/
│   │   └── courses/                # Feature module de cursos
│   │       ├── pages/
│   │       │   ├── course-list/    # Lista de cursos
│   │       │   ├── course-details/ # Detalhes do curso
│   │       │   └── course-form/    # Formulário de criação/edição
│   │       └── services/
│   │           └── courses.service.ts
│   ├── guards/
│   │   └── auth.guard.ts          # Guard de autenticação
│   ├── interceptors/
│   │   └── logging.interceptor.ts  # Interceptor HTTP
│   └── services/
│       └── auth.service.ts         # Service de autenticação
├── assets/
└── styles/
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd catalogo-cursos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor mock (JSON Server)**
```bash
npm run json-server
```
O servidor estará disponível em: http://localhost:3000

4. **Em outro terminal, inicie a aplicação Angular**
```bash
npm start
```
A aplicação estará disponível em: http://localhost:4200

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run json-server` - Inicia o servidor mock
- `npm test` - Executa os testes unitários

## 🎮 Como Usar a Aplicação

### Navegação Principal
1. **Lista de Cursos**: Página inicial com todos os cursos
2. **Filtros**: Use o dropdown para filtrar por categoria
3. **Detalhes**: Clique em "Ver detalhes" para ver informações completas
4. **Edição**: Clique em "Editar" para modificar um curso
5. **Novo Curso**: Clique em "Novo Curso" para criar um novo

### Funcionalidades de Autenticação
- **Usuário Simulado**: João Silva (admin)
- **Áreas Protegidas**: Criação e edição de cursos
- **Logout**: Disponível no menu do usuário no header

### API Mock
- **Endpoint**: http://localhost:3000/courses
- **Métodos**: GET, POST, PUT, DELETE
- **Dados**: Cursos com nome, categoria, descrição e carga horária

## 🔧 Configurações

### Angular Material
Todos os componentes do Angular Material estão configurados e funcionando:
- MatCard, MatButton, MatIcon
- MatFormField, MatInput, MatSelect
- MatToolbar, MatMenu, MatDivider
- MatSnackBar para notificações

### Interceptor HTTP
- Adiciona headers automáticos em todas as requisições
- Rastreia requisições para debugging
- Configurado para funcionar com JSON Server

### Guard de Autenticação
- Protege rotas de criação/edição de cursos
- Simula verificação de autenticação
- Mostra mensagens informativas para usuários

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Interface touch-friendly com menu compacto

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📦 Build de Produção

Para gerar o build de produção:
```bash
npm run build
```

---

**Nota**: README.md e db.json foram criados com IA
