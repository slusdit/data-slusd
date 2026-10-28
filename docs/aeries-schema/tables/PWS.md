# PWS

Stores the students that can be seen by each PWA account. Student numbers are stored by Permanent ID Number – Can be DISTRICT MANAGED

Rows: 38,008 · Primary key: AID, ID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | int |  |  | FK → PWA.AID |
| ID | int |  |  | → STU |
| AST | varchar(1) |  |  |  |
| PCC | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **PWA**: PWS.AID = PWA.AID
- inferred → **STU**: PWS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`FOOD_SERVICE_CUSTOMERS`, `SLUSD_MISSING_PORTAL_ACCOUNTS`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary`, `SLUSD_eTrition`
