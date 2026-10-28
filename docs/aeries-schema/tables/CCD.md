# CCD

Class Calendar dates for Flex Scheduling

Rows: 2,880 · Primary key: CSQ, DT · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CSQ | smallint |  |  | FK → CCL.SQ |
| DT | datetime |  |  |  |
| IP | varchar(1) |  |  |  |
| RS | varchar(1) |  |  |  |
| RA | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CCL**: CCD.CSQ = CCL.SQ

## Used in views

`SLUSD_Instructional_Minutes`
