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

### Query Builder

Built with direct connection to Aeries database using config in `/lib/aeries.ts`

~~Fast API server is running on [http://localhost:8000](http://localhost:8000)
Using same .env file as frontend~~

~~### FastAPI Getting Started~~

~~First install the dependencies:~~

```bash
pip install -r requirements.txt
```

~~Then, run the development server:~~

:warning: **Forwarding port 8000 if development server is not on non-local server**



```bash
python main.py
# or
python3 main.py
```

~~Open [http://localhost:8000/docs](http://localhost:8000/docs) or URL with your browser to see the result.~~

