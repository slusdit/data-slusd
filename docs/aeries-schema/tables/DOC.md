# DOC

Stores any type of documentation. The table is ID based and it is not cached because of its potential big size

Rows: 36,214 · Primary key: ID, SQ · Columns: 24

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| GR | smallint |  |  |  |
| CT | varchar(3) |  |  | COD DOC.CT (11 codes) |
| NM | varchar(255) |  |  |  |
| XT | varchar(255) |  |  |  |
| RB | varbinary(max) | yes |  |  |
| SZ | int |  |  |  |
| LK | bit |  |  |  |
| SRC | varchar(3) |  |  |  |
| SCT | varchar(3) |  |  | COD DOC.SCT (3 codes) |
| TY | varchar(4) |  |  |  |
| UN | varchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| RID | varchar(255) |  |  |  |
| APV | nvarchar(3) |  |  |  |
| FID | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: DOC.ID = IDN.ID
- inferred → **STU**: DOC.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Used in views

`IEPD`
