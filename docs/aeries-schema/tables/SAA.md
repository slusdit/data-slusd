# SAA

Summer Alternate Course Request Assoc.

Rows: 0 · Primary key: ID, SSC, PSQ, ASQ · Columns: 11

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → SAR.ID, SSR.ID |
| SSC | smallint |  |  | FK → SAR.SSC, SSR.SSC |
| PSQ | smallint |  |  | FK → SSR.SQ |
| ASQ | smallint |  |  | FK → SAR.SQ |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **SAR**: SAA.ID = SAR.ID AND SAA.SSC = SAR.SSC AND SAA.ASQ = SAR.SQ
- declared FK → **SSR**: SAA.ID = SSR.ID AND SAA.SSC = SSR.SSC AND SAA.PSQ = SSR.SQ
- inferred → **STU**: SAA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
