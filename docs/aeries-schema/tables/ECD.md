# ECD

Early Childhood Development

Rows: 0 · Primary key: ID, SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RS | varchar(2) |  |  |  |
| FC | varchar(10) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| FSD | datetime | yes |  |  |
| PT | varchar(2) |  |  |  |
| TOC | varchar(2) |  |  |  |
| RC | bit |  |  |  |
| PTC | varchar(2) |  |  |  |
| SIT | varchar(2) |  |  |  |
| FT1 | varchar(2) |  |  |  |
| FT2 | varchar(2) |  |  |  |
| CT | varchar(2) |  |  |  |
| ET | varchar(2) |  |  |  |
| PKT | nvarchar(2) |  |  |  |
| PRE | nvarchar(1) |  |  |  |
| SQ | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
| SPID | varchar(10) |  |  |  |

## Joins

- declared FK → **IDN**: ECD.ID = IDN.ID
- inferred → **STU**: ECD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
