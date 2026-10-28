# OBL


Rows: 0 · Primary key: OTY, SC · Columns: 5

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| OTY | varchar(15) |  |  | FK → OBD.OTY |
| SC | smallint |  |  | FK → LOC.CD |
| TSQ | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **LOC**: OBL.SC = LOC.CD
- declared FK → **OBD**: OBL.OTY = OBD.OTY
- inferred → **LOC**: OBL.SC = LOC.CD (school code)
