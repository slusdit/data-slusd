# ATR

Relationships of Staff IDs to Supplemental Attendance Session numbers

Rows: 47 · Primary key: SC, SE, ID · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → ATS.SC |
| SE | int |  |  | FK → ATS.SE |
| ID | int |  |  | FK → STF.ID |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ATS**: ATR.SC = ATS.SC AND ATR.SE = ATS.SE
- declared FK → **STF**: ATR.ID = STF.ID
- inferred → **STU**: ATR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **MST**: ATR.SC = MST.SC AND ATR.SE = MST.SE (section number)
- inferred → **LOC**: ATR.SC = LOC.CD (school code)
