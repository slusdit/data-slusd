# UCE

UC ELC Extract

Rows: 3,806 · Primary key: TYP, SC, ID · Columns: 9

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TYP | varchar(3) |  |  |  |
| SC | smallint |  |  | → LOC |
| ID | int |  |  | FK → IDN.ID |
| CR | int |  |  |  |
| GPA | money |  |  |  |
| CHK | bit |  |  |  |
| CNS | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: UCE.ID = IDN.ID
- inferred → **STU**: UCE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **LOC**: UCE.SC = LOC.CD (school code)
