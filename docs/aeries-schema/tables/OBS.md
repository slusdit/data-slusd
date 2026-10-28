# OBS

Observations

Rows: 0 · Primary key: SQ · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | int |  |  |  |
| ID | int |  |  | FK → IDN.ID |
| SID | int |  |  |  |
| SCL | smallint |  |  |  |
| CD | varchar(15) |  |  | FK → OBC.CD |
| LC | varchar(6) |  |  |  |
| DT | datetime | yes |  |  |
| TM | datetime | yes |  |  |
| PD | int |  |  |  |
| SE | smallint |  |  |  |
| TG | varchar(1) |  |  |  |
| CO | varchar(max) |  |  |  |
| CX | varchar(6) |  |  |  |
| VL | money |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime |  |  |  |

## Joins

- declared FK → **IDN**: OBS.ID = IDN.ID
- declared FK → **OBC**: OBS.CD = OBC.CD
- inferred → **STU**: OBS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
