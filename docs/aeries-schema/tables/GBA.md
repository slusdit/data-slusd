# GBA

Gradebook assignments.

Aeries: Contains information about every teacher's gradebook assignments

Rows: 22,098 · Primary key: GN, AN · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GN | int |  |  | FK → GBK.GN |
| AN | int |  |  |  |
| AT | varchar(1) |  |  |  |
| AD | nvarchar(255) |  |  |  |
| DA | datetime | yes |  |  |
| DD | datetime | yes |  |  |
| MX | money |  |  |  |
| GC | bit |  |  |  |
| COM | nvarchar(max) |  |  |  |
| DL | nvarchar(255) |  |  |  |
| CID | int |  |  |  |
| DUT | datetime | yes |  |  |
| ADB | bit |  |  |  |
| DL2 | nvarchar(255) |  |  |  |
| DL3 | nvarchar(255) |  |  |  |
| VP | bit |  |  |  |
| SVP | bit |  |  |  |
| NP | money |  |  |  |
| TY | nvarchar(255) |  |  |  |
| EID | int |  |  |  |
| ESD | datetime | yes |  |  |
| EED | datetime | yes |  |  |
| IBS | bit |  |  |  |
| ETA | int |  |  |  |
| RA | bit |  |  |  |
| UI | nvarchar(255) |  |  |  |
| EI | nvarchar(255) |  |  |  |
| IFA | bit |  |  |  |
| DND | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBK**: GBA.GN = GBK.GN

## Referenced by (declared FKs)

- **GBF**: GBF.GN = GBA.GN AND GBF.AN = GBA.AN
- **GBN**: GBN.GN = GBA.GN AND GBN.AN = GBA.AN
- **GBS**: GBS.GN = GBA.GN AND GBS.AN = GBA.AN
