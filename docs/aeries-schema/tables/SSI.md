# SSI


Rows: 0 · Primary key: ID, SCL · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| SCL | smallint |  |  |  |
| RM | varchar(6) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| MX | smallint |  |  |  |
| MS | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: SSI.ID = STF.ID
- inferred → **STU**: SSI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
