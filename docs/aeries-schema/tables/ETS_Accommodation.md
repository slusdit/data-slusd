# ETS_Accommodation


Rows: 158 · Primary key: ID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | → STU |
| CD | nvarchar(50) |  |  |  |
| CAT | nvarchar(500) |  |  |  |
| DE | nvarchar(500) |  |  |  |
| GRP | nvarchar(100) |  |  |  |
| SQ | smallint |  |  |  |
| GR | varchar(50) |  |  |  |
| TY | smallint |  |  |  |
| ST | varchar(2) |  |  |  |

## Joins

- inferred → **STU**: ETS_Accommodation.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **ETS_Accommodation_Test**: ETS_Accommodation_Test.AID = ETS_Accommodation.ID
