# ETS_Test


Rows: 12 · Primary key: ID · Columns: 6

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| CD | nvarchar(50) |  |  |  |
| DE | nvarchar(500) |  |  |  |
| SQ | smallint |  |  |  |
| TY | smallint |  |  |  |
| ST | varchar(2) |  |  |  |

## Joins

- inferred → **STU**: ETS_Test.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **ETS_Accommodation_Test**: ETS_Accommodation_Test.TID = ETS_Test.ID
