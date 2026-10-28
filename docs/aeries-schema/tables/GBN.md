# GBN

Stores standards associated with each gradebook assignment. Used for the Load process from the Gradebook to Standards-Based Grade Reporting.

Rows: 5,613 · Primary key: GN, AN, SD · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GN | int |  |  | FK → GBA.GN |
| AN | int |  |  | FK → GBA.AN |
| SD | varchar(20) |  |  |  |
| MX | money |  |  |  |
| NP | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBA**: GBN.GN = GBA.GN AND GBN.AN = GBA.AN
