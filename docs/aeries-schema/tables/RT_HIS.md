# RT_HIS

Records transfer holding table. Stores a copy of incoming HIS data before it's imported.

Rows: 0 · Primary key: RequestID, PID, SQ · Columns: 37

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RequestID | varchar(255) |  |  |  |
| Imported | bit |  |  |  |
| Import | bit |  |  |  |
| PID | int |  |  |  |
| CDS | varchar(14) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| MK | varchar(2) |  |  |  |
| CR | money |  |  |  |
| GR | smallint |  |  |  |
| TE | smallint |  |  |  |
| YR | smallint |  |  |  |
| CO | varchar(30) |  |  |  |
| ST | nvarchar(50) |  |  |  |
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
| MID | int |  |  |  |
| DC | datetime | yes |  |  |
| SNM | varchar(255) |  |  |  |
| CH | money |  |  |  |
| AMK | nvarchar(3) |  |  |  |
| MAG | varchar(200) |  |  |  |
| MAA | bit |  |  |  |
| SDE | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **CRS**: RT_HIS.CN = CRS.CN (course number)
