# HIS_backup_20260807


Rows: 1,060,401 · Primary key: (none declared) · Columns: 38

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| MK | varchar(3) |  |  |  |
| CR | money |  |  |  |
| GR | smallint |  |  |  |
| TE | smallint |  |  |  |
| YR | smallint |  |  |  |
| CO | varchar(30) |  |  |  |
| ST | int |  |  |  |
| CC | money |  |  |  |
| RT | varchar(1) |  |  |  |
| CI | varchar(1) |  |  |  |
| SQ | smallint |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| TD | smallint |  |  |  |
| AB | smallint |  |  |  |
| EA | smallint |  |  |  |
| UA | smallint |  |  |  |
| SU | smallint |  |  |  |
| SE | smallint |  |  |  |
| SID | int |  |  |  |
| HR | money |  |  |  |
| SRC | varchar(3) |  |  |  |
| SDE | int |  |  |  |
| ABG | varchar(1) |  |  |  |
| DC | datetime | yes |  |  |
| PF | nvarchar(2) |  |  |  |
| CH | money |  |  |  |
| AC | nvarchar(1) |  |  |  |
| SA | varchar(6) |  |  |  |
| AMK | nvarchar(3) |  |  |  |
| MAG | varchar(200) |  |  |  |
| MAA | bit |  |  |  |
| SSC | smallint |  |  |  |
| CTM | nvarchar(4) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **CRS**: HIS_backup_20260807.CN = CRS.CN (course number)
