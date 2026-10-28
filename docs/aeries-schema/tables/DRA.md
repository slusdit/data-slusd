# DRA

Aeries Web Only. Contains all of the individual district resource assignments (who they're checked out to)

Rows: 112 · Primary key: RID, RIN, SQ · Columns: 19

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| RID | int |  |  | FK → DRI.RID |
| RIN | int |  |  | FK → DRI.RIN |
| SQ | int |  |  |  |
| ID | int |  |  | → STU |
| ST | varchar(1) |  |  |  |
| PD | smallint |  |  |  |
| RM | varchar(6) |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| SE | smallint |  |  |  |
| CC | varchar(1) |  |  |  |
| CD | varchar(1) |  |  |  |
| CO | nvarchar(max) |  |  |  |
| SCL | smallint |  |  |  |
| DT | datetime | yes |  |  |
| RD | datetime | yes |  |  |
| DD | datetime | yes |  |  |
| TG | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DRI**: DRA.RID = DRI.RID AND DRA.RIN = DRI.RIN
- inferred → **STU**: DRA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: DRA.CN = CRS.CN (course number)
