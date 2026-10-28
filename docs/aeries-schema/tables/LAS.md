# LAS

Contains a test history of Language Assessments test taken by the student – Can be DISTRICT MANAGED.

Rows: 1,579 · Primary key: ID, SQ · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → LAC.ID |
| SQ | smallint |  |  |  |
| DT | datetime | yes |  |  |
| OS | smallint |  |  |  |
| OL | smallint |  |  |  |
| RS | smallint |  |  |  |
| RL | smallint |  |  |  |
| WS | smallint |  |  |  |
| WL | smallint |  |  |  |
| LF | varchar(4) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| CS | smallint |  |  |  |
| CL | smallint |  |  |  |
| GR | smallint |  |  |  |
| SS | smallint |  |  |  |
| SL | smallint |  |  |  |
| LS | smallint |  |  |  |
| LL | smallint |  |  |  |
| IT | varchar(6) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| VL | smallint |  |  |  |
| VS | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LAC**: LAS.ID = LAC.ID
- inferred → **STU**: LAS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
