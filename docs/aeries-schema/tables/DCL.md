# DCL

Table used by Parent Data Confirmation to store a log of parent access to each document and records if they digitally confirmed the information in the document

Rows: 96,875 · Primary key: SC, SN, SQ · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → STU.SC |
| SN | int |  |  | FK → STU.SN |
| SQ | smallint |  |  |  |
| DID | varchar(255) |  |  | FK → DCS.DID |
| DT | datetime |  |  |  |
| TY | varchar(1) |  |  |  |
| CL | varchar(2) |  |  | FK → DCS.CL |
| HSH | varchar(255) |  |  |  |
| SGN | nvarchar(255) |  |  |  |
| SRC | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DCS**: DCL.DID = DCS.DID AND DCL.CL = DCS.CL
- declared FK → **STU**: DCL.SC = STU.SC AND DCL.SN = STU.SN
- inferred → **STU**: DCL.SC = STU.SC AND DCL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: DCL.SC = LOC.CD (school code)
