# MLS


Rows: 0 · Primary key: ID · Columns: 37

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| DT | datetime | yes |  |  |
| OPT | char(1) |  |  |  |
| HL1 | nvarchar(3) |  |  |  |
| HL2 | nvarchar(3) |  |  |  |
| HL3 | nvarchar(3) |  |  |  |
| HL4 | nvarchar(3) |  |  |  |
| HL5 | nvarchar(3) |  |  |  |
| CL1 | nvarchar(3) |  |  |  |
| CL2 | nvarchar(3) |  |  |  |
| CL3 | nvarchar(3) |  |  |  |
| CL4 | nvarchar(3) |  |  |  |
| CL5 | nvarchar(3) |  |  |  |
| EL1 | nvarchar(3) |  |  |  |
| EL2 | nvarchar(3) |  |  |  |
| EL3 | nvarchar(3) |  |  |  |
| EL4 | nvarchar(3) |  |  |  |
| EL5 | nvarchar(3) |  |  |  |
| RL1 | nvarchar(3) |  |  |  |
| RL2 | nvarchar(3) |  |  |  |
| RL3 | nvarchar(3) |  |  |  |
| RL4 | nvarchar(3) |  |  |  |
| RL5 | nvarchar(3) |  |  |  |
| DLL | char(1) |  |  |  |
| HM | nvarchar(3) |  |  |  |
| CM | nvarchar(3) |  |  |  |
| PWC | nvarchar(3) |  |  |  |
| POC | nvarchar(3) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: MLS.ID = IDN.ID
- inferred → **STU**: MLS.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **MLI**: MLI.ID = MLS.ID
