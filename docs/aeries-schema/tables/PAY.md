# PAY

Record of payments made through the Billing process

Rows: 0 · Primary key: SC, TN, PN · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → BIL.SC |
| TN | int |  |  | FK → BIL.TN |
| PN | smallint |  |  |  |
| DT | datetime | yes |  |  |
| AM | money |  |  |  |
| FP | varchar(6) |  |  |  |
| CN | varchar(50) |  |  | → CRS |
| CO | nvarchar(max) |  |  |  |
| DD | datetime | yes |  |  |
| AD | money |  |  |  |
| RA | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **BIL**: PAY.SC = BIL.SC AND PAY.TN = BIL.TN
- inferred → **CRS**: PAY.CN = CRS.CN (course number)
- inferred → **TCH**: PAY.SC = TCH.SC AND PAY.TN = TCH.TN (teacher number)
- inferred → **LOC**: PAY.SC = LOC.CD (school code)
