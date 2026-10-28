# DVS


Rows: 1,642 · Primary key: ID, USR · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | varchar(50) |  |  | → STU |
| USR | varchar(255) |  |  |  |
| UST | nvarchar(10) |  |  |  |
| PLT | nvarchar(10) |  |  |  |
| APT | nvarchar(10) |  |  |  |
| DVT | nvarchar(25) |  |  |  |
| FBT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: DVS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
