# PHL

Stores username, school, student id, date, and page information accessed by parents or students through the Parent Portal, Mobile Portal app, Aeries Student app or other vendor Student apps.

Rows: 1,721,788 · Primary key: TID · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TID | int |  |  |  |
| AID | int |  |  |  |
| UID | int |  |  |  |
| UN | varchar(255) |  |  |  |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| ID | int |  |  |  |
| IP | varchar(255) |  |  |  |
| PG | varchar(255) |  |  |  |
| TY | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: PHL.SC = STU.SC AND PHL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: PHL.SC = LOC.CD (school code)
