# OCM


Rows: 0 · Primary key: CDS, OCN, OTE · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| MID | int |  |  |  |
| CDS | varchar(50) |  |  | FK → ODC.CDS |
| OCN | varchar(6) |  |  | FK → ODC.OCN |
| OTE | int |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| CO | nvarchar(30) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **ODC**: OCM.CDS = ODC.CDS AND OCM.OCN = ODC.OCN
- inferred → **CRS**: OCM.CN = CRS.CN (course number)
