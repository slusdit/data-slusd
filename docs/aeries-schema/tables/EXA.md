# EXA

Aeries Web Only. Aeries Analytics Table for Exam Response Answers.

Rows: 0 · Primary key: ID, EID, SQ, QID · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → EXR.ID |
| EID | int |  |  | FK → EXR.EID |
| SQ | int |  |  | FK → EXR.SQ |
| QID | smallint |  |  |  |
| SR | nvarchar(255) |  |  |  |
| ANS | nvarchar(255) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| QN | smallint |  |  |  |
| QA | bit |  |  |  |
| WT | money |  |  |  |
| TY | varchar(1) |  |  |  |
| AA | nvarchar(255) |  |  |  |
| LBL | varchar(5) |  |  |  |
| RL | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXR**: EXA.ID = EXR.ID AND EXA.EID = EXR.EID AND EXA.SQ = EXR.SQ
- inferred → **STU**: EXA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
