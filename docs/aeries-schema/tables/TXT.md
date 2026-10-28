# TXT

Stores letters developed in the QUERY Letter Text Editor, some of which can be District Standard

Rows: 15 · Primary key: SC, ID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(20) |  |  | → STU |
| TX | nvarchar(max) |  |  |  |
| AU | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: TXT.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: TXT.SC = LOC.CD (school code)
