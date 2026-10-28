# ARP

Attendance Reporting Periods for use in Texas

Rows: 0 · Primary key: SC, TR, RP · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → ART.SC |
| TR | varchar(1) |  |  | FK → ART.TR |
| RP | smallint |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| TD | smallint |  |  |  |
| IP | nvarchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ART**: ARP.SC = ART.SC AND ARP.TR = ART.TR
- inferred → **LOC**: ARP.SC = LOC.CD (school code)
