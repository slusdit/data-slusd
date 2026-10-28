# FTF

Flex Periods used for Flex Scheduling

Rows: 0 · Primary key: SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | smallint |  |  |  |
| SC | smallint |  |  | → LOC |
| YR | varchar(9) |  |  |  |
| STI | varchar(6) |  |  |  |
| DE | varchar(50) |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| TY | varchar(1) |  |  |  |
| TT | varchar(2) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUT | varchar(255) |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUT | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| CSQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: FTF.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **CHD**: CHD.FSQ = FTF.SQ
- **FTT**: FTT.FSQ = FTF.SQ
