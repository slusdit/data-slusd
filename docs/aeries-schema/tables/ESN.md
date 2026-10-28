# ESN

Aeries Web Only. Define sections of an exam, exam section can be tied to test part

Rows: 0 · Primary key: EID, SID · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → EXM.EID |
| SID | int |  |  |  |
| NM | varchar(255) |  |  |  |
| TPT | smallint |  |  |  |
| LT | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: ESN.EID = EXM.EID

## Referenced by (declared FKs)

- **EPL**: EPL.EID = ESN.EID AND EPL.SID = ESN.SID
- **ESQ**: ESQ.EID = ESN.EID AND ESQ.SID = ESN.SID
