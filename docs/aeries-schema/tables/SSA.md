# SSA

Summer School Availability

Rows: 91 · Primary key: SSC, TM, SCL · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SSC | smallint |  |  | FK → LOC.CD, SST.SSC |
| TM | varchar(1) |  |  | FK → SST.TM |
| SCL | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: SSA.SSC = LOC.CD
- declared FK → **SST**: SSA.SSC = SST.SSC AND SSA.TM = SST.TM
