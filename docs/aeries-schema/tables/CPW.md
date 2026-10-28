# CPW

Stores Career Pathways details for each student.

Rows: 10,041 · Primary key: ID, CD · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| CD | varchar(3) |  |  |  |
| CM | bit |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: CPW.ID = IDN.ID
- inferred → **STU**: CPW.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **CPE**: CPE.ID = CPW.ID AND CPE.CD = CPW.CD
- **CPH**: CPH.ID = CPW.ID AND CPH.CD = CPW.CD
- **CPO**: CPO.ID = CPW.ID AND CPO.CD = CPW.CD
