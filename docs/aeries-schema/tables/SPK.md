# SPK


Rows: 0 · Primary key: SC, CD · Columns: 14

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CD | varchar(6) |  |  |  |
| DE | varchar(50) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
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

- inferred → **LOC**: SPK.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **MSP**: MSP.SC = SPK.SC AND MSP.CD = SPK.CD
- **SMP**: SMP.SC = SPK.SC AND SMP.CD = SPK.CD
