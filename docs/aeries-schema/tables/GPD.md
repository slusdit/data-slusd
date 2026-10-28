# GPD

Stores school defined data ranges for each marking period

Rows: 0 · Primary key: SC, GP · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| TM | varchar(1) |  |  |  |
| GP | nvarchar(10) |  |  |  |
| DE | nvarchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| IFA | bit |  |  |  |
| MP | smallint |  |  |  |
| ATG | bit |  |  |  |
| IC | bit |  |  |  |
| CL | varchar(6) |  |  |  |
| SP | bit |  |  |  |
| SMP | smallint |  |  |  |
| H | varchar(3) |  |  |  |
| S | varchar(3) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: GPD.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GPC**: GPC.SC = GPD.SC AND GPC.GP1 = GPD.GP
- **GPS**: GPS.SC = GPD.SC AND GPS.GP = GPD.GP
- **GSS**: GSS.SCL = GPD.SC AND GSS.GP = GPD.GP
