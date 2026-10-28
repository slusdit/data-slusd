# RTM

Stores system and user messages specific to a records transfer (RTR or RTO) record.

Rows: 0 · Primary key: RID, SQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | varchar(255) |  |  |  |
| SQ | int |  |  |  |
| TY | tinyint |  |  |  |
| NM | varchar(255) |  |  |  |
| IP | varchar(255) |  |  |  |
| DT | datetime | yes |  |  |
| RDT | datetime | yes |  |  |
| DX | tinyint |  |  |  |
| CO | nvarchar(max) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
