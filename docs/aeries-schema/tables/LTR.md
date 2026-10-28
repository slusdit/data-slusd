# LTR

Contains the contents of all letter texts available through Aeries

Rows: 748 · Primary key: SC, ID · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(255) |  |  | → STU |
| T1 | nvarchar(max) |  |  |  |
| T2 | nvarchar(max) |  |  |  |
| NO | smallint |  |  |  |
| HL | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: LTR.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: LTR.SC = LOC.CD (school code)
