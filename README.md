# 📦 Cantina API

API desenvolvida com [NestJS](https://nestjs.com/) para gerenciar funcionalidades de uma cantina, incluindo autenticação, autorização baseada em papéis (roles) e interceptadores para logging.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (>= 18.x)
- **NestJS** (Framework principal)
- **TypeScript**
- **JWT** para autenticação
- **Guards** para controle de acesso baseado em roles
- **Interceptors** para logging
- **Class Validator & Class Transformer** para validação e transformação de dados
- **Banco de dados** (Definir: PostgreSQL, MySQL, MongoDB, etc.)
- **Docker** (opcional para ambiente de desenvolvimento)

---

## 📂 Estrutura de Pastas

```
src/
├── common/               # Decorators, interceptors, filtros globais
├── modules/              # Módulos da aplicação
│   ├── auth/              # Autenticação e autorização
│   ├── users/             # Gestão de usuários
│   └── ...
├── main.ts               # Arquivo de bootstrap
```

---

## ⚙️ Configuração do Ambiente

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/cantina-api.git
   cd cantina-api
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Criar arquivo `.env`**
   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/cantina
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRES_IN=1d
   ```

4. **Executar a aplicação**
   ```bash
   npm run start:dev
   ```

---

## 🔐 Autenticação e Autorização

O projeto utiliza **JWT** para autenticação e um **Roles Guard** personalizado para controle de acesso.

- **Decorator `@Roles()`**: Define as roles necessárias para acessar determinada rota.
- **RolesGuard**: Intercepta a requisição e verifica se o usuário possui a role exigida.

Exemplo:
```ts
@Roles('admin')
@Get('usuarios')
findAll() {
  return this.userService.findAll();
}
```

---

## 📜 Endpoints Principais

### **Auth**
| Método | Rota         | Descrição            |
|--------|-------------|----------------------|
| POST   | `/auth` | Login de usuário     |

### **Usuários**
| Método | Rota          | Descrição                 |
|--------|--------------|---------------------------|
| GET    | `/users`     | Lista todos os usuários    |
| GET    | `/users/:id` | Retorna um usuário por ID  |

---

## 🛡 Interceptadores e Logs

A aplicação conta com um **LoggerGlobalInterceptor** que registra as requisições e respostas para auxiliar no monitoramento e depuração.

---

## 🐳 Docker (opcional)

Se quiser rodar com Docker:
```bash
docker-compose up --build
```

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
