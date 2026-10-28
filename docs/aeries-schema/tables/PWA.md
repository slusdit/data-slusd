# PWA

Parent and Student Account Management System stores accounts in this table. Self-managing – Can be DISTRICT MANAGED.

Rows: 37,944 · Primary key: AID · Columns: 28

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | int |  |  |  |
| EM | varchar(255) |  |  |  |
| PW | varchar(255) |  |  |  |
| MS | varchar(255) |  |  |  |
| ED | datetime | yes |  |  |
| MED | datetime | yes |  |  |
| PLC | datetime | yes |  |  |
| PCC | varchar(255) |  |  |  |
| AST | varchar(1) |  |  |  |
| TY | varchar(1) |  |  |  |
| PID | int |  |  |  |
| LN | varchar(255) |  |  |  |
| FN | varchar(255) |  |  |  |
| LC | int |  |  |  |
| LIP | varchar(255) |  |  |  |
| LDT | datetime | yes |  |  |
| CIP | varchar(255) |  |  |  |
| CDT | datetime | yes |  |  |
| LPR | datetime | yes |  |  |
| CD | datetime | yes |  |  |
| XD | datetime | yes |  |  |
| ADM | bit |  |  |  |
| SLT | nvarchar(255) |  |  |  |
| FA | varchar(50) |  |  |  |
| CP | varchar(10) |  |  |  |
| HT | smallint |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **PAO**: PAO.AID = PWA.AID
- **PNP**: PNP.AID = PWA.AID
- **PWS**: PWS.AID = PWA.AID

## Used in views

`FOOD_SERVICE_CUSTOMERS`, `SLUSD_MISSING_PORTAL_ACCOUNTS`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Elementary`, `SLUSD_MISSING_PORTAL_ACCOUNTS_Secondary`, `SLUSD_eTrition`
