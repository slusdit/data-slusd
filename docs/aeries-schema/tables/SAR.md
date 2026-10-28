# SAR

Summer Alternate Course Requests

Rows: 0 · Primary key: ID, SSC, SQ · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SSC | smallint |  |  | FK → SSC.SSC |
| SQ | smallint |  |  |  |
| TM | varchar(1) |  |  | FK → SSC.TM |
| CN | varchar(6) |  |  | FK → SSC.CN |
| SRT | float |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SAR.ID = IDN.ID
- declared FK → **SSC**: SAR.SSC = SSC.SSC AND SAR.TM = SSC.TM AND SAR.CN = SSC.CN
- inferred → **STU**: SAR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: SAR.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **SAA**: SAA.ID = SAR.ID AND SAA.SSC = SAR.SSC AND SAA.ASQ = SAR.SQ
