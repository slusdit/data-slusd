# IPR

Stores the programs that the district offers. (CSIS use ONLY). - Can be DISTRICT MANAGED.

Rows: 0 · Primary key: CD, SQ · Columns: 35

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CD | varchar(3) |  |  |  |
| OC | varchar(1) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| FS | varchar(1) |  |  |  |
| PO | varchar(75) |  |  |  |
| OO | varchar(30) |  |  |  |
| OFS | varchar(50) |  |  |  |
| GID | varchar(20) |  |  |  |
| SO | varchar(100) |  |  |  |
| OS | varchar(30) |  |  |  |
| SFS | varchar(50) |  |  |  |
| SDY | varchar(100) |  |  |  |
| SC | smallint |  |  | → LOC |
| BT | varchar(75) |  |  |  |
| OB | varchar(30) |  |  |  |
| CST | int |  |  |  |
| CS | varchar(75) |  |  |  |
| OCS | varchar(50) |  |  |  |
| CSP | varchar(100) |  |  |  |
| IS | varchar(3) |  |  |  |
| PC | varchar(1) |  |  |  |
| OP | varchar(50) |  |  |  |
| NPV | smallint |  |  |  |
| SP1 | varchar(1) |  |  |  |
| SP2 | varchar(1) |  |  |  |
| SP3 | varchar(1) |  |  |  |
| FM | int |  |  |  |
| RM | int |  |  |  |
| AA | varchar(50) |  |  |  |
| NA | varchar(100) |  |  |  |
| TA | smallint |  |  |  |
| SQ | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: IPR.SC = LOC.CD (school code)
