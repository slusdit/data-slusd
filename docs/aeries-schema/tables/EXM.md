# EXM

Aeries Web Only. Aeries Analytics Table for Exams.

Rows: 0 · Primary key: EID · Columns: 32

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| TY | varchar(1) |  |  |  |
| ID | varchar(8) |  |  | → STU |
| CO | nvarchar(max) |  |  |  |
| DAS | varchar(1) |  |  |  |
| NQ | smallint |  |  |  |
| BID | nvarchar(255) |  |  |  |
| YR | smallint |  |  |  |
| DOC | varbinary(max) | yes |  |  |
| CDT | datetime | yes |  |  |
| MDT | datetime | yes |  |  |
| LKD | bit |  |  |  |
| SRC | varchar(2) |  |  |  |
| OW | varchar(255) |  |  |  |
| SA | varchar(3) |  |  |  |
| FID | int |  |  |  |
| G0 | bit |  |  |  |
| G1 | bit |  |  |  |
| G2 | bit |  |  |  |
| G3 | bit |  |  |  |
| G4 | bit |  |  |  |
| G5 | bit |  |  |  |
| G6 | bit |  |  |  |
| G7 | bit |  |  |  |
| G8 | bit |  |  |  |
| G9 | bit |  |  |  |
| G10 | bit |  |  |  |
| G11 | bit |  |  |  |
| G12 | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: EXM.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **ESN**: ESN.EID = EXM.EID
- **ETA**: ETA.EID = EXM.EID
- **EXH**: EXH.EID = EXM.EID
- **EXL**: EXL.EID = EXM.EID
- **EXQ**: EXQ.EID = EXM.EID
- **EXR**: EXR.EID = EXM.EID
