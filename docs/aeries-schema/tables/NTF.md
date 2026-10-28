# NTF


Rows: 2,730 · Primary key: NID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| NID | varchar(50) |  |  |  |
| NMG | nvarchar(max) |  |  |  |
| MSH | nvarchar(255) |  |  |  |
| UID | int |  |  |  |
| SC | smallint |  |  | → LOC |
| URL | nvarchar(255) |  |  |  |
| CDT | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: NTF.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **NTU**: NTU.NID = NTF.NID
