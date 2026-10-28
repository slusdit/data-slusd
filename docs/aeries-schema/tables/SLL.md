# SLL

Aeries Web Only. Contains a log of Service Learning Hours worked by students for specific organizations.

Rows: 0 · Primary key: ID, RSQ, SQ · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SLR.ID |
| RSQ | smallint |  |  | FK → SLR.SQ |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| STM | datetime | yes |  |  |
| ETM | datetime | yes |  |  |
| HR | money |  |  |  |
| DE | nvarchar(max) |  |  |  |
| SNM | varchar(255) |  |  |  |
| STL | varchar(255) |  |  |  |
| ST | varchar(1) |  |  |  |
| STC | nvarchar(max) |  |  |  |
| AC | varchar(50) |  |  |  |
| HT | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SLR**: SLL.ID = SLR.ID AND SLL.RSQ = SLR.SQ
- inferred → **STU**: SLL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **SLI**: SLI.ID = SLL.ID AND SLI.RSQ = SLL.RSQ AND SLI.LSQ = SLL.SQ
