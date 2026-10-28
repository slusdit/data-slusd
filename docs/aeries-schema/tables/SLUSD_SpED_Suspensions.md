# SLUSD_SpED_Suspensions (view)


Primary key: (none declared) · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | from STU.SC |
| ID | int |  |  | from STU.ID |
| LN | nvarchar(100) |  |  | from STU.LN |
| FN | nvarchar(100) |  |  | from STU.FN |
| GR | smallint |  |  | from STU.GR |
| TG | varchar(1) |  |  | from STU.TG |
| RECORD# | bigint | yes |  |  |
| Type of Record | varchar(33) |  |  |  |
| ARD | int | yes |  | from SUP.ARD |
| DE | nvarchar(max) | yes |  | from COD.DE |
| English Learner? | varchar(3) |  |  |  |
| Enrollment Status | varchar(8) |  |  |  |
| SpED? | varchar(1) |  |  |  |
| At least one suspension | varchar(1) |  |  |  |
