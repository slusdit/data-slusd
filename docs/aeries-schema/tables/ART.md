# ART

Records instructional ranges (Instructional Periods or Instructional Minutes) for use in calculating Instructional Minutes in Texas schools.

Rows: 0 · Primary key: SC, TR · Columns: 16

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TR | varchar(1) |  |  |  |
| IP | nvarchar(2) |  |  |  |
| LP | smallint |  |  |  |
| HP | smallint |  |  |  |
| LT | datetime | yes |  |  |
| HT | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: ART.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **ARP**: ARP.SC = ART.SC AND ARP.TR = ART.TR
