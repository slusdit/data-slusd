# EVT

Stores the contents of the Event Calendar.

Rows: 28 · Primary key: EID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| EID | int |  |  |  |
| DT | datetime |  |  |  |
| ED | datetime |  |  |  |
| T1 | datetime | yes |  |  |
| T2 | datetime | yes |  |  |
| TY | varchar(1) |  |  |  |
| CAT | varchar(3) |  |  |  |
| TI | varchar(255) |  |  |  |
| DE | nvarchar(max) |  |  |  |
| SCP | varchar(50) |  |  |  |
| AS1 | varchar(50) |  |  |  |
| AS2 | varchar(50) |  |  |  |
| AS3 | varchar(50) |  |  |  |
| DL | varchar(255) |  |  |  |
| OWN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
