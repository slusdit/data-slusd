# CBD

District Attendance Letter Details

Rows: 0 · Primary key: ID, BID, CSQ, OC, MD · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| BID | varchar(32) |  |  | FK → CBS.BID |
| CSQ | int |  |  |  |
| OC | bit |  |  |  |
| CL | varchar(2) |  |  |  |
| PT | int |  |  |  |
| NO | smallint |  |  |  |
| DOC | varbinary(max) | yes |  |  |
| TY | varchar(2) |  |  |  |
| MD | tinyint |  |  |  |
| UN | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| SDT | datetime | yes |  |  |
| AD | varchar(50) |  |  |  |
| CY | varchar(24) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| TL | varchar(10) |  |  |  |
| EM | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CBS**: CBD.BID = CBS.BID
- inferred → **STU**: CBD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
