# ANL

Stores Attendance Notification Log.

Rows: 57,287 · Primary key: NID, SC, SN, ID, DT · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | int |  |  | FK → ANC.NID |
| SC | smallint |  |  | → STU, LOC |
| SN | int |  |  | → STU |
| ID | int |  |  | FK → IDN.ID |
| DT | datetime |  |  |  |
| SG | nvarchar(255) |  |  |  |
| MT | nvarchar(max) |  |  |  |
| DID | nvarchar(max) |  |  |  |
| ERR | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ANC**: ANL.NID = ANC.NID
- declared FK → **IDN**: ANL.ID = IDN.ID
- inferred → **STU**: ANL.SC = STU.SC AND ANL.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: ANL.SC = LOC.CD (school code)
