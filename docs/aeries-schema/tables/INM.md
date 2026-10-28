# INM

Contains meeting information (comments, attendees, etc.) regarding the student intervention

Rows: 128 · Primary key: PID, SQ, SQ1 · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → INV.PID |
| SQ | smallint |  |  | FK → INV.SQ |
| SQ1 | smallint |  |  |  |
| DT | datetime | yes |  |  |
| TY | varchar(2) |  |  | COD INM.TY (8 codes) |
| CO | nvarchar(max) |  |  |  |
| AT | nvarchar(max) |  |  |  |
| ND | datetime | yes |  |  |
| NM | varchar(255) |  |  |  |
| LCN | nvarchar(255) |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **INV**: INM.PID = INV.PID AND INM.SQ = INV.SQ
