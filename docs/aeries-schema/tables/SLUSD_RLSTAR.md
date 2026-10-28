# SLUSD_RLSTAR (view)


Primary key: (none declared) · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| StudentID | int |  |  | from TST.PID |
| TestDate | datetime | yes |  | from TST.TD |
| ScaleScore | smallint |  |  | from TST.SS |
| Percentile | money |  |  | from TST.PR |
| TestID | varchar(8) |  |  | from TST.ID |
| TestPart | smallint |  |  | from TST.PT |
| TestingAdministration | varchar(6) |  |  | from TST.TA |
| PPerformanceLevel | int | yes |  |  |
