# GBF

Store gradebook assignment's file linking information.

Rows: 77 · Primary key: FID, GN, AN · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| FID | int |  |  | FK → TFL.FID |
| GN | int |  |  | FK → GBA.GN |
| AN | int |  |  | FK → GBA.AN |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **GBA**: GBF.GN = GBA.GN AND GBF.AN = GBA.AN
- declared FK → **TFL**: GBF.FID = TFL.FID
