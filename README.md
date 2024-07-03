# SLUSD Data v2.0

## Frontend

NextJS 14 server using Prisma ORM is running on [https:#data.slusd.us](https:#data.slusd.us)

Requires `.env` file with the following values

```.env
# Prisma
DATABASE_URL="mysql://YOUR_DB_USERNAME:YOUR_DB_BASSWORD@DB_IP:3306/YOUR_DATABASE_SCHEMA_NAME"

# Google OAuth for Auth.js
AUTH_GOOGLE_ID='' # From Google Cloud Console
AUTH_GOOGLE_SECRET='' # From Google Cloud Console

# Auth.js Setip
AUTH_SECRET="" # Random string
NEXTAUTH_SECRET="" # Random string
NEXTAUTH_URL='http://localhost:3000' # Change to domain if exposed on web
JWT_SIGNING_PRIVATE_KEY=''# Random string if using JWT auth

# Aeries connection
DB_USER='' # Aeries Read-only user
DB_PASSWORD='' # Aeries Read-only password
DB_SERVER='' # Aeries host name
DB_DATABASE='' # Target Aeries Database

```

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

Open [https:#data.slusd.us](https:#data.slusd.us) or URL with your browser to see the result.

## Backend

### Query Builder

Built with direct connection to Aeries database using config in `/lib/aeries.ts`

## To Do

- [ ] Add suspence boundry around datatable
- [ ] Query output
  - [ ] Move from `table` to `datatable`
    - [x] Add Sorting
    - [ ] Add Filtering
      - [ ] Add `filterColumn` to `Query` model and form to explicitly state which filters to build per query.
    - [x] Add row selection
  - [x] Add export options
    - [x] to csv
    - [x] to xlsx
- [ ] Add Query form
  - [ ] run query to validate before submit
    - [ ] Disable `Add+` button until after `Validate` button is clicked and successful.
  - [ ] find way to remove comments (stored as single line in DB)
  - [ ] Add dropdown(?), or text input to name filtered columns. May need to run after query validation
- [ ] Dashboard
  - [ ] Render using parallel routes?
  - [ ] Hold dashboard items in user settings


