# UGN

Aeries Web security table to store information about Users and Groups.

Rows: 2,252 · Primary key: UID · Columns: 31

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| UID | int |  |  |  |
| UN | varchar(255) |  |  |  |
| SY | varchar(25) |  |  |  |
| TY | smallint |  |  |  |
| UTY | varchar(255) |  |  |  |
| HT | smallint |  |  |  |
| PW | varchar(255) |  |  |  |
| CD | datetime | yes |  |  |
| XD | datetime | yes |  |  |
| ST | tinyint |  |  |  |
| LDT | datetime | yes |  |  |
| LC | int |  |  |  |
| IP | varchar(255) |  |  |  |
| EM | varchar(100) |  |  |  |
| FN | varchar(50) |  |  |  |
| LN | varchar(50) |  |  |  |
| CM | nvarchar(max) |  |  |  |
| LIP | varchar(255) |  |  |  |
| CDT | datetime | yes |  |  |
| LPR | datetime | yes |  |  |
| ID | int |  |  | → STU |
| SID | int |  |  |  |
| PLC | datetime | yes |  |  |
| SLT | nvarchar(255) |  |  |  |
| IDP | smallint |  |  | FK → IdentityProvider.Id |
| CPW | bit |  |  |  |
| MFK | varchar(255) |  |  |  |
| MFA | smallint |  |  |  |
| EVC | varchar(50) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IdentityProvider**: UGN.IDP = IdentityProvider.Id
- inferred → **STU**: UGN.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **DVU**: DVU.UID = UGN.UID
- **SSO**: SSO.UID = UGN.UID
- **UAO**: UAO.UID = UGN.UID
- **UGA**: UGA.UID = UGN.UID
- **UGC**: UGC.UID = UGN.UID
- **UGP**: UGP.UID = UGN.UID
