# SLUSD Data v2.0

## Frontend

NextJS 14 server using Prisma ORM is running on [http://localhost:3000](http://localhost:3000)

### Prisma  setup

Using Prisma to connect to mySQL database.

First, sync the database:

```bash
npx prisma db push
```

:warning:If you get an error about missing dependencies, run `npx prisma generate` to fix it.

#### Prisma Studio

For direct access to the Prisma Studio, run the following command:

```bash
npx prisma studio
```

### NextJS Getting Started

First install the dependencies:

```bash
npm install
```

Finally, run the development server:

```bash
npm run host
# or
npm run dev
```

:warning: **Forwarding port 3000 if development server is not on non-local server**

Open [http://localhost:3000](http://localhost:3000) or URL with your browser to see the result.

## Backend

Look at backend branch...