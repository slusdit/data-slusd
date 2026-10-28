# ESI

Stores identifying fields from 3rd party products such as Google (G Suite).

Rows: 2,683 · Primary key: TY, ID, SCL, VNM · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| SCL | smallint |  |  |  |
| VNM | varchar(255) |  |  |  |
| EID | varchar(255) |  |  |  |
| UN | varchar(255) |  |  |  |
| EM | varchar(255) |  |  |  |
| ST | varchar(10) |  |  |  |
| TY | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: ESI.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
