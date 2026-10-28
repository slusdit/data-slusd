# SST

Summer School Terms

Rows: 8 · Primary key: SSC, TM · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SSC | smallint |  |  | FK → LOC.CD |
| TM | varchar(1) |  |  | COD SST.TM (8 codes) |
| NT | varchar(max) |  |  |  |
| ATM | varchar(1) |  |  |  |
| OSS | nvarchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: SST.SSC = LOC.CD

## Referenced by (declared FKs)

- **SSA**: SSA.SSC = SST.SSC AND SSA.TM = SST.TM
- **SSC**: SSC.SSC = SST.SSC AND SSC.TM = SST.TM
