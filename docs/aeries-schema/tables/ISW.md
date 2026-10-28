# ISW

Independent Study Production Work Hours

Rows: 0 · Primary key: ID, SQ, SQ1 · Columns: 20

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → ISA.ID |
| SQ | smallint |  |  | FK → ISA.SQ |
| SQ1 | smallint |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| HWC | money |  |  |  |
| DE | smallint |  |  |  |
| NT | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| SE | smallint |  |  |  |
| SP | nvarchar(6) |  |  |  |
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

- declared FK → **ISA**: ISW.ID = ISA.ID AND ISW.SQ = ISA.SQ
- inferred → **STU**: ISW.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
