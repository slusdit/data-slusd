# ACR

Stores Alternate Course Requests

Rows: 4,565 · Primary key: SC, SN, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SQ | smallint |  |  |  |
| CN | varchar(6) |  |  | FK → CRS.CN |
| SRT | float |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CRS**: ACR.CN = CRS.CN
- declared FK → **STU**: ACR.SC = STU.SC AND ACR.SN = STU.SN
- inferred → **STU**: ACR.SC = STU.SC AND ACR.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **CRS**: ACR.CN = CRS.CN (course number)
- inferred → **LOC**: ACR.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ACA**: ACA.SC = ACR.SC AND ACA.SN = ACR.SN AND ACA.ASQ = ACR.SQ
