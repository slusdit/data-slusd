# PRD

Stores parent response data for Housing Questionnaire

Rows: 0 · Primary key: RSQ, ID, TY, SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RSQ | smallint |  |  |  |
| ID | int |  |  | FK → PRS.ID |
| TY | smallint |  |  | FK → PRS.TY |
| SQ | smallint |  |  | FK → PRS.SQ |
| NM | nvarchar(255) |  |  |  |
| OID | int |  |  |  |
| GN | nvarchar(1) |  |  |  |
| BD | datetime | yes |  |  |
| GR | smallint |  |  |  |
| SNM | nvarchar(255) |  |  |  |
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

- declared FK → **PRS**: PRD.ID = PRS.ID AND PRD.TY = PRS.TY AND PRD.SQ = PRS.SQ
- inferred → **STU**: PRD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
