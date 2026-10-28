# RUN

Set of procedures that can be run at night to expedite use of the program during the day

Rows: 9 · Primary key: seq · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| seq | smallint |  |  |  |
| proc | varchar(50) |  |  |  |
| time | datetime | yes |  |  |
| sun | varchar(1) |  |  |  |
| mon | varchar(1) |  |  |  |
| tue | varchar(1) |  |  |  |
| wed | varchar(1) |  |  |  |
| thu | varchar(1) |  |  |  |
| fri | varchar(1) |  |  |  |
| sat | varchar(1) |  |  |  |
| tag | varchar(1) |  |  |  |
| last | datetime | yes |  |  |
| user | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |
