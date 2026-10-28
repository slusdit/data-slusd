# CTI


Rows: 0 · Primary key: ID, TY, SEQ · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| TY | varchar(2) |  |  |  |
| SEQ | smallint |  |  |  |
| CD | varchar(6) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
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

- declared FK → **IDN**: CTI.ID = IDN.ID
- inferred → **STU**: CTI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
