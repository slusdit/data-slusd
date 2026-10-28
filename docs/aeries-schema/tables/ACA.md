# ACA

Stores the linking of Alternate Course Requests

Rows: 51 · Primary key: SC, SN, PSQ, ASQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → ACR.SC, SSS.SC |
| SN | int |  |  | FK → ACR.SN, SSS.SN |
| PSQ | smallint |  |  | FK → SSS.SQ |
| ASQ | smallint |  |  | FK → ACR.SQ |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ACR**: ACA.SC = ACR.SC AND ACA.SN = ACR.SN AND ACA.ASQ = ACR.SQ
- declared FK → **SSS**: ACA.SC = SSS.SC AND ACA.SN = SSS.SN AND ACA.PSQ = SSS.SQ
- inferred → **STU**: ACA.SC = STU.SC AND ACA.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: ACA.SC = LOC.CD (school code)
