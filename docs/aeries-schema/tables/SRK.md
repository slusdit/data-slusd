# SRK


Rows: 0 · Primary key: ID, SQ · Columns: 45

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| CN | varchar(6) |  |  | → CRS |
| MK | varchar(3) |  |  |  |
| CR | money |  |  |  |
| GR | smallint |  |  |  |
| TE | smallint |  |  |  |
| YR | smallint |  |  |  |
| CO | varchar(30) |  |  |  |
| ST | int |  |  |  |
| CC | money |  |  |  |
| RT | varchar(1) |  |  |  |
| CI | varchar(1) |  |  |  |
| EN | smallint |  |  |  |
| PR | smallint |  |  |  |
| TD | smallint |  |  |  |
| AB | smallint |  |  |  |
| EA | smallint |  |  |  |
| UA | smallint |  |  |  |
| SU | smallint |  |  |  |
| SE | smallint |  |  |  |
| SID | int |  |  |  |
| HR | money |  |  |  |
| SRC | varchar(3) |  |  |  |
| SDE | int |  |  |  |
| ABG | varchar(1) |  |  |  |
| DC | datetime | yes |  |  |
| PF | nvarchar(2) |  |  |  |
| CH | money |  |  |  |
| AC | nvarchar(1) |  |  |  |
| SA | varchar(6) |  |  |  |
| AMK | nvarchar(3) |  |  |  |
| MAG | varchar(200) |  |  |  |
| MAA | bit |  |  |  |
| SSC | smallint |  |  |  |
| SCL | smallint |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: SRK.ID = IDN.ID
- inferred → **STU**: SRK.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: SRK.CN = CRS.CN (course number)
