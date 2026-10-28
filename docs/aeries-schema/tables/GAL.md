# GAL


Rows: 14,186 · Primary key: UID · Columns: 17

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  |  |
| ID | int |  |  | → STU |
| OTY | int |  |  |  |
| TY | varchar(4) |  |  |  |
| CP | varchar(2) |  |  |  |
| DP | varchar(255) |  |  |  |
| MK | varchar(255) |  |  |  |
| GN | int |  |  |  |
| AN | int |  |  |  |
| SDT | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | int |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: GAL.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
