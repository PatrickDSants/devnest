# 🚀 DevNest – Descubra e Salve Projetos Open Source

![Captura de ecrã 2025-05-27 133858](https://github.com/user-attachments/assets/d160d128-d1e9-4d15-a003-10bb1bf88452)

O **DevNest** é uma plataforma para ajudar desenvolvedores iniciantes a encontrarem projetos open source ideais para contribuir. Com busca inteligente, autenticação com Google e GitHub, e integração com Firestore, o app permite salvar repositórios favoritos, marcar os que já foram concluídos e manter o histórico sincronizado entre dispositivos.

🔗 [Acesse o projeto online](https://devnest-zeta.vercel.app)  
📂 [Repositório no GitHub](https://github.com/PatrickDSants/devnest)

---

## ✨ Funcionalidades

- 🔍 **Busca de projetos** via API do GitHub
- 🧠 **Filtro por palavras-chave** e tecnologias
- 💾 **Salvar projetos** no Firestore (por usuário)
- ✅ **Marcar como "Feito"** com drag-and-drop interativo
- 🔐 **Login com Google e GitHub** (Firebase Auth)
- 🖼️ **Perfil com edição de nome e avatar**
- 🌌 **Animação com partículas** no fundo
- 💬 **Mensagens de erro amigáveis** e loading states
- 🎯 **Rotas protegidas** por autenticação
- 📱 **Responsivo e adaptado para mobile**

---

## ⚙️ Tecnologias Utilizadas

- **React.js + Vite** – Estrutura leve e rápida
- **TailwindCSS** – Estilização com classes utilitárias
- **Firebase**  
  - Auth (Google e GitHub OAuth2)  
  - Firestore (armazenamento por usuário)  
  - Storage (upload de avatar)  
- **React Router** – Navegação entre páginas
- **LocalStorage** – Persistência local opcional
- **Lucide Icons** – Ícones modernos
- **Vercel** – Deploy com CI integrado

---

## 🔐 Firebase: Recursos implementados

- `Authentication` com **Google** e **GitHub**
- Regras de segurança no Firestore com base no `UID` do usuário
- Dados salvos em duas coleções:
  - `salvos > {UID} > repos: []`
  - `feitos > {UID} > repos: []`
- Upload de avatar via Firebase Storage (em breve)

---

## 🧠 Aprendizados

Esse projeto consolidou conhecimentos em:

- Integração com APIs REST (GitHub)
- Autenticação OAuth com Firebase
- Operações CRUD assíncronas no Firestore
- Proteção de rotas com React Router
- Upload e preview de arquivos com Firebase Storage
- Organização de componentes reutilizáveis
- Deploy otimizado via Vercel

---

## 📦 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/PatrickDSants/devnest.git

# Acesse a pasta do frontend
cd devnest

# Instale as dependências
npm install

# Rode o projeto em ambiente de desenvolvimento
npm run dev
