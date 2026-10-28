# EXR

Aeries Web Only. Aeries Analytics Table for Exam Responses.

Rows: 0 · Primary key: ID, EID, SQ · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| EID | int |  |  | FK → EXM.EID |
| SQ | int |  |  |  |
| DT | datetime | yes |  |  |
| NC | money |  |  |  |
| NP | money |  |  |  |
| PC | money |  |  |  |
| CO | nvarchar(max) |  |  |  |
| VN | varchar(1) |  |  |  |
| EI | varbinary(max) | yes |  |  |
| MCP | money |  |  |  |
| MCC | money |  |  |  |
| RPP | money |  |  |  |
| RPE | money |  |  |  |
| TA | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **EXM**: EXR.EID = EXM.EID
- inferred → **STU**: EXR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **EXA**: EXA.ID = EXR.ID AND EXA.EID = EXR.EID AND EXA.SQ = EXR.SQ
