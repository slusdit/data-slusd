# FTT

Flex Period Times used for special bell schedules in Flex Scheduling

Rows: 0 · Primary key: SQ · Columns: 7

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SQ | smallint |  |  |  |
| FSQ | smallint |  |  | FK → FTF.SQ |
| KY | smallint |  |  |  |
| ST | datetime | yes |  |  |
| ET | datetime | yes |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **FTF**: FTT.FSQ = FTF.SQ
