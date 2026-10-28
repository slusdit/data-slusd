# CCL

Class Calendars for Flex Scheduling

Rows: 31 · Primary key: SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | smallint |  |  |  |
| SC | smallint |  |  | → LOC |
| YR | varchar(9) |  |  |  |
| STI | varchar(6) |  |  |  |
| DE | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: CCL.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **CCD**: CCD.CSQ = CCL.SQ

## Used in views

`SLUSD_Instructional_Minutes`
