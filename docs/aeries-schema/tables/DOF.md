# DOF

Digital Offering

Rows: 0 · Primary key: OID, IID · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| OID | int |  |  |  |
| IID | int |  |  | FK → DIT.ID |
| PRC | money |  |  |  |
| GR | varchar(255) |  |  |  |
| SCL | varchar(255) |  |  |  |
| DCN | varchar(255) |  |  |  |
| PES | bit |  |  |  |
| SST | datetime | yes |  |  |
| SED | datetime | yes |  |  |
| SPV | datetime | yes |  |  |
| MPS | int |  |  |  |
| MX | int |  |  |  |
| PWN | smallint |  |  |  |
| TY | tinyint |  |  |  |
| ATS | bit |  |  |  |
| ATP | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DIT**: DOF.IID = DIT.ID
