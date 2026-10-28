# SLI

Aeries Web Only. Contains images and other documents related to each Service Learning Log (SLL) record.

Rows: 0 · Primary key: ID, RSQ, LSQ, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SLL.ID |
| RSQ | smallint |  |  | FK → SLL.RSQ |
| LSQ | smallint |  |  | FK → SLL.SQ |
| SQ | smallint |  |  |  |
| IMG | varbinary(max) | yes |  |  |
| TY | varchar(255) |  |  |  |
| URL | varchar(255) |  |  |  |
| FN | varchar(255) |  |  |  |
| CT | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SLL**: SLI.ID = SLL.ID AND SLI.RSQ = SLL.RSQ AND SLI.LSQ = SLL.SQ
- inferred → **STU**: SLI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
