# SLUSD Data v2.0

## Frontend

NextJS 14 server using Prisma ORM is running on [https://data.slusd.us](https://data.slusd.us)

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

Open [https://data.slusd.us](https://data.slusd.us) or URL with your browser to see the result.

## Backend

### Query Builder

Built with direct connection to Aeries database using config in `/lib/aeries.ts`

## To Do

- [ ] Query output
  - [ ] Move from `table` to `datatable`
    - [x] Add Sorting
    - [ ] Add Filtering
    - [x] Add row selection
  - [x] Add export options
    - [x] to csv
    - [x] to xlsx
- [ ] Add Query form
  - [ ] run query to validate before submit
  - [ ] find way to remove comments (stored as single line in DB)
- [ ] Dashboard
  - [ ] Render using parallel routes?
  - [ ] Hold dashboard items in user settings


