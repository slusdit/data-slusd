# SLUSD Data v2.0 

community branch

## Frontend

NextJS 14 server using Prisma ORM is running on [https://data.slusd.us](https://data.slusd.us)

Requires `.env` file in the root directory with the following values

```.env
# Prisma
DATABASE_URL="mysql://YOUR_DB_USERNAME:YOUR_DB_PASSWORD@DB_IP:3306/YOUR_DATABASE_SCHEMA_NAME"

# Google OAuth for Auth.js
AUTH_GOOGLE_ID='' # From Google Cloud Console
AUTH_GOOGLE_SECRET='' # From Google Cloud Console

# Auth.js Setip
AUTH_SECRET="" # Random string
NEXTAUTH_SECRET="" # Random string
NEXTAUTH_URL='http://localhost:3000' # Change to domain if exposed on web
JWT_SIGNING_PRIVATE_KEY='' # Random string if using JWT auth

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
- [ ] [Ideas from Thom](https://docs.google.com/spreadsheets/d/1sciIq4W_Z122uuzMvqx6YvsvNEHl2CpDHn_FQvHyh6g/edit?usp=sharing) - Site Admin "Home Dashboard"

- [ ] Admin dashboard
  - [ ] Add queries
  - [ ] Add categories
  - [ ] Add roles
  - [ ] Impersonate user view
- [ ] Query output
  - [ ] Move data fetch to external async function to try and fix `loading.tsx` from not loading
  - [ ] Move from `table` to `datatable`
    - [x] Add Sorting
    - [X] Add Column Sorting
    - [x] Add row selection
  - [x] Add export options
    - [x] to csv
    - [x] to xlsx
- [ ] Add Query form
  - [ ] Add edit mode
  - [ ] run query to validate before submit
    - [ ] Disable `Add+` button until after `Validate` button is clicked and successful.
  - [x] find way to remove comments (stored as single line in DB) `Should be working`
- [ ] Dashboard
  - [ ] Render using parallel routes?
  - [ ] Hold dashboard items in user settings?
- [x] Teacher active class middleware with Aeries at signin
  - [x] Develop middleware
    - [x] Add missing classes to local storage
    - [x] Delete out of sync classes from local storage
  - [x] Run middleware function every time user signs in
  - [x] Add classes to session.user.classes
  - [x] Run sign in tests for middleware
- [x] Query security by user role
- [x] Query List
  - [x] Add accordian option to query list categories 

  
## Additional Features

- [ ] [Ticket #341596](https://osticket.slusd.us/scp/tickets.php?id=22460)
  - Is there a way to set alerts for focal students? ie: If a particular student is absent in the first period it will automatically send an email to a particular staff?
