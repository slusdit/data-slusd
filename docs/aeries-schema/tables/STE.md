# STE

Stores imported credential data from standard CTC file layout distributed to counties and districts

Rows: 0 · Primary key: ID, SQ · Columns: 41

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → STF.ID |
| SQ | smallint |  |  |  |
| DN | varchar(255) |  |  |  |
| TY | varchar(4) |  |  |  |
| ATY | varchar(2) |  |  |  |
| TM | varchar(2) |  |  |  |
| BS | varchar(2) |  |  |  |
| AU1 | varchar(4) |  |  |  |
| AU2 | varchar(4) |  |  |  |
| AU3 | varchar(4) |  |  |  |
| AU4 | varchar(4) |  |  |  |
| RN1 | varchar(4) |  |  |  |
| RN2 | varchar(4) |  |  |  |
| RN3 | varchar(4) |  |  |  |
| RN4 | varchar(4) |  |  |  |
| LO | varchar(2) |  |  |  |
| HI | varchar(2) |  |  |  |
| RC1 | varchar(1) |  |  |  |
| RD1 | nvarchar(max) |  |  |  |
| RC2 | varchar(1) |  |  |  |
| RD2 | nvarchar(max) |  |  |  |
| DI | datetime | yes |  |  |
| EX | datetime | yes |  |  |
| ODI | datetime | yes |  |  |
| MJ1 | varchar(4) |  |  |  |
| MJ2 | varchar(4) |  |  |  |
| MJ3 | varchar(4) |  |  |  |
| MJ4 | varchar(4) |  |  |  |
| MJ5 | varchar(4) |  |  |  |
| MJ6 | varchar(4) |  |  |  |
| MJ7 | varchar(4) |  |  |  |
| MN1 | varchar(4) |  |  |  |
| MN2 | varchar(4) |  |  |  |
| MN3 | varchar(4) |  |  |  |
| MN4 | varchar(4) |  |  |  |
| MN5 | varchar(4) |  |  |  |
| MN6 | varchar(4) |  |  |  |
| MN7 | varchar(4) |  |  |  |
| LV | nvarchar(2) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **STF**: STE.ID = STF.ID
- inferred → **STU**: STE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
