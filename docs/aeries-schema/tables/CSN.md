# CSN

Contains descriptions of Content Standards Tests and Test Parts populated when loading STAR – Can be DISTRICT MANAGED

Rows: 557 · Primary key: ID, PT · Columns: 21

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | varchar(8) |  |  | → STU |
| PT | smallint |  |  |  |
| NM | varchar(255) |  |  |  |
| A1 | varchar(4) |  |  |  |
| A2 | varchar(4) |  |  |  |
| A3 | varchar(8) |  |  |  |
| A4 | varchar(8) |  |  |  |
| AD | smallint |  |  |  |
| AT | smallint |  |  |  |
| TO | smallint |  |  |  |
| KY | varchar(100) |  |  |  |
| FM | varchar(2) |  |  |  |
| LV | varchar(2) |  |  |  |
| VSN | varchar(2) |  |  |  |
| GR | varchar(2) |  |  |  |
| NYR | smallint |  |  |  |
| NTY | varchar(2) |  |  |  |
| NPD | varchar(1) |  |  |  |
| LNG | varchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: CSN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
