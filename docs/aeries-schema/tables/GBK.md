# GBK

Teacher gradebooks.

Aeries: Stores the different gradebooks created by the teachers

Rows: 1,384 · Primary key: GN · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → TCH, LOC |
| GN | int |  |  |  |
| TN | smallint |  |  | → TCH |
| NM | nvarchar(50) |  |  |  |
| TM | nvarchar(20) |  |  |  |
| PD | varchar(6) |  |  |  |
| D1 | datetime | yes |  |  |
| D2 | datetime | yes |  |  |
| CO | nvarchar(max) |  |  |  |
| AG | smallint |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| SD | varchar(20) |  |  |  |
| TY | varchar(1) |  |  |  |
| DLB | datetime | yes |  |  |
| TU | int |  |  |  |
| IT | bit |  |  |  |
| SID | int |  |  |  |
| MS | bit |  |  |  |
| GT | varchar(20) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **TCH**: GBK.SC = TCH.SC AND GBK.TN = TCH.TN (teacher number)
- inferred → **LOC**: GBK.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **GBR**: GBR.GN = GBK.GN
- **GBT**: GBT.GN = GBK.GN
- **GBA**: GBA.GN = GBK.GN
- **GBE**: GBE.GN = GBK.GN
- **GBU**: GBU.GN = GBK.GN
- **GTG**: GTG.GN = GBK.GN
