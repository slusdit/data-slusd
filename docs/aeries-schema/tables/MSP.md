# MSP


Rows: 0 · Primary key: SC, CD, SE · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | FK → MST.SC, SPK.SC |
| CD | varchar(6) |  |  | FK → SPK.CD |
| SE | smallint |  |  | FK → MST.SE |
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

- declared FK → **MST**: MSP.SC = MST.SC AND MSP.SE = MST.SE
- declared FK → **SPK**: MSP.SC = SPK.SC AND MSP.CD = SPK.CD
- inferred → **MST**: MSP.SC = MST.SC AND MSP.SE = MST.SE (section number)
- inferred → **LOC**: MSP.SC = LOC.CD (school code)
