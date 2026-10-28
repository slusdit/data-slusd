# GSS

Contains Gradebook overall grade information for a point in time.

Rows: 0 · Primary key: ID, SCL, SE, GP · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SCL | smallint |  |  | FK → GPD.SC |
| SE | int |  |  |  |
| GP | nvarchar(10) |  |  | FK → GPD.GP |
| MK | nvarchar(3) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GPD**: GSS.SCL = GPD.SC AND GSS.GP = GPD.GP
- inferred → **STU**: GSS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
