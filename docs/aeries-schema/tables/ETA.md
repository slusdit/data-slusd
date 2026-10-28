# ETA

Aeries Web Only. Define Testing Administrations of an exam.

Rows: 0 · Primary key: EID, TA · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXM.EID |
| TA | int |  |  |  |
| NM | varchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: ETA.EID = EXM.EID

## Referenced by (declared FKs)

- **ETS**: ETS.EID = ETA.EID AND ETS.TA = ETA.TA
