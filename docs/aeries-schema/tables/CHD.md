# CHD

Attendance History Details for Flex Scheduling

Rows: 0 · Primary key: ID, CD, YR, SCL, FSQ · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SCL | smallint |  |  |  |
| CD | varchar(1) |  |  |  |
| YR | varchar(9) |  |  |  |
| DE | varchar(20) |  |  |  |
| FSQ | smallint |  |  | FK → FTF.SQ |
| PC | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FTF**: CHD.FSQ = FTF.SQ
- declared FK → **IDN**: CHD.ID = IDN.ID
- inferred → **STU**: CHD.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
