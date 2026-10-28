# FAP

Contains the accommodations that each 504 student needs.

Rows: 2,706 · Primary key: ID, SQ, SQ1 · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → FOF.ID |
| SQ | smallint |  |  | FK → FOF.SQ |
| SQ1 | smallint |  |  |  |
| AD | varchar(6) |  |  | COD FAP.AD (33 codes) |
| AC | nvarchar(max) |  |  | COD FAP.AC (3 codes) |
| PS | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| RL | varchar(50) |  |  |  |
| FN | varchar(50) |  |  |  |
| CD | varchar(6) |  |  | COD FAP.CD (36 codes) |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FOF**: FAP.ID = FOF.ID AND FAP.SQ = FOF.SQ
- inferred → **STU**: FAP.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
