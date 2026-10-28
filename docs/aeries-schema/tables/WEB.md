# WEB

Contains information about the valid users of ABI - Not used for Aeries Web

Rows: 0 · Primary key: SC, ID · Columns: 13

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → STU, LOC |
| ID | varchar(30) |  |  |  |
| PW | varchar(255) |  |  |  |
| SN | int |  |  | → STU |
| TG | varchar(1) |  |  |  |
| MS | varchar(255) |  |  |  |
| ED | datetime | yes |  |  |
| MED | datetime | yes |  |  |
| EM | varchar(255) |  |  |  |
| PLC | datetime | yes |  |  |
| PS | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: WEB.SC = STU.SC AND WEB.SN = STU.SN (student rows are keyed by school + student number)
- inferred → **LOC**: WEB.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **PAL**: PAL.SC = WEB.SC AND PAL.ID = WEB.ID
