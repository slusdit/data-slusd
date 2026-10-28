# ESQ

Aeries Web Only. Store exam questions that belong to an exam section

Rows: 0 · Primary key: EID, SID, QID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  | FK → ESN.EID |
| SID | int |  |  | FK → ESN.SID |
| QID | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ESN**: ESQ.EID = ESN.EID AND ESQ.SID = ESN.SID
