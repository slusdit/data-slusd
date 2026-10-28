# CRD

Contains codes used to setup course request packets

Rows: 30 · Primary key: SC, CD · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CD | varchar(6) |  |  |  |
| DE | varchar(50) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| TR | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: CRD.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **CRP**: CRP.SC = CRD.SC AND CRP.CD = CRD.CD
