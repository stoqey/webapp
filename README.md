# NextJS + SSR + Couchbase + Apollo Client
## Configuration

### Step 1. Set up a Couchbase database

Set up a Couchbase server either locally or any cloud provider.

### Step 2. Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `COUCHBASE_URL`=couchbase://localhost 
- `COUCHBASE_BUCKET`=stq
- `COUCHBASE_USERNAME`=admin
- `COUCHBASE_PASSWORD`=123456


### Step 3. Run migration script

You'll need to run a migration to create the necessary table for the example.

```bash
npm run migrate
# or
yarn migrate
```

### Step 4. Run Next.js in development mode

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```