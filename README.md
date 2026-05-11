# Adega Smart POS

Sistema web MVP para PDV, estoque e gestão de adegas brasileiras, com foco em operação rápida de balcão e leitura de código de barras por câmera.

## Stack
- Next.js 14 + React + TypeScript
- TailwindCSS
- PostgreSQL (Neon) com Prisma ORM
- Autenticação JWT + controle de permissões (admin, manager, cashier)
- Scanner com BarcodeDetector + fallback ZXing
- Recharts (dashboard)
- Deploy alvo: Netlify

## Funcionalidades MVP
- Login por e-mail/senha.
- Rotas principais: `/login`, `/dashboard`, `/pos`, `/products`, `/composite-products`, `/stock`, `/sales`, `/cash`, `/reports`, `/users`, `/settings`.
- Base para produtos simples e compostos com ficha técnica.
- Base de estoque com movimentações.
- Estrutura de caixa e vendas.
- Seed com usuários e dados iniciais.

## Configuração `.env`
Copie `.env.example` para `.env`:

```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="troque-este-segredo"
NEXT_PUBLIC_APP_NAME="Adega Smart POS"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## Neon + Prisma
1. Crie o projeto no Neon e copie a `DATABASE_URL`.
2. Rode:
```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

## Executar localmente
```bash
npm run dev
```

## Usuários de teste
- `admin@adega.com` / `123456`
- `gerente@adega.com` / `123456`
- `caixa@adega.com` / `123456`

## Deploy Netlify
1. Conecte o repositório no Netlify.
2. O projeto já inclui `netlify.toml` com build `npm run build` e plugin oficial Next.js.
3. Configure as variáveis de ambiente (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_NAME`, etc.).
4. Antes do primeiro uso em produção, rode migrations no banco Neon: `npm run prisma:migrate -- --name init` (local/CI).
5. O script `postinstall` roda `prisma generate` automaticamente no ambiente de build.

## Scanner de câmera
- Primeiro tenta `BarcodeDetector` (nativo).
- Fallback automático com ZXing.
- Se a câmera falhar, o usuário recebe orientação para digitação manual.

## Próximos passos
- Finalizar RBAC em middleware e backend.
- Completar APIs de vendas/estoque com baixa automática de ingredientes.
- Dashboard com métricas em tempo real.
- Relatórios com filtros por período.
- Preparar integrações futuras (Cloudinary, NFC-e, delivery, multi-loja).


## Netlify (importante para evitar erro de build)
- **Base directory**: deixe vazio (`/`).
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Não use** comando de monorepo com `pnpm --filter ...` para este repositório.
- Se existir comando antigo salvo no painel da Netlify, substitua manualmente.

