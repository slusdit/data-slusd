# SSR

Summer School Course Requests

Rows: 0 · Primary key: ID, SSC, SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SSC | smallint |  |  | FK → SSC.SSC |
| TM | varchar(1) |  |  | FK → SSC.TM |
| CN | varchar(6) |  |  | FK → SSC.CN |
| TG | varchar(1) |  |  |  |
| PF | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| SE | smallint |  |  |  |
| TN | smallint |  |  |  |
| RT | varchar(2) |  |  |  |
| SQ | smallint |  |  |  |
| AC | varchar(6) |  |  |  |
| AT | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SSR.ID = IDN.ID
- declared FK → **SSC**: SSR.SSC = SSC.SSC AND SSR.TM = SSC.TM AND SSR.CN = SSC.CN
- inferred → **STU**: SSR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: SSR.CN = CRS.CN (course number)

## Referenced by (declared FKs)

- **SAA**: SAA.ID = SSR.ID AND SAA.SSC = SSR.SSC AND SAA.PSQ = SSR.SQ
