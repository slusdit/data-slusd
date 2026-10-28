# ISA

Stores Independent Study Agreement records for a student.

Rows: 0 · Primary key: ID, SQ · Columns: 33

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TY | nvarchar(6) |  |  |  |
| ST | varchar(1) |  |  |  |
| AMF | bit |  |  |  |
| AN | nvarchar(max) |  |  |  |
| LT | nvarchar(1) |  |  |  |
| EP | nvarchar(1) |  |  |  |
| OD1 | varbinary(max) | yes |  |  |
| OD2 | varbinary(max) | yes |  |  |
| OD3 | varbinary(max) | yes |  |  |
| DL2 | varchar(2) |  |  |  |
| DL3 | varchar(2) |  |  |  |
| DN1 | nvarchar(max) |  |  |  |
| DN2 | nvarchar(max) |  |  |  |
| DN3 | nvarchar(max) |  |  |  |
| DS1 | int |  |  |  |
| DS2 | int |  |  |  |
| DS3 | int |  |  |  |
| PSD | datetime | yes |  |  |
| PED | datetime | yes |  |  |
| ASD | datetime | yes |  |  |
| AED | datetime | yes |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | nvarchar(255) |  |  |  |
| IUT | nvarchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | nvarchar(255) |  |  |  |
| UUT | nvarchar(255) |  |  |  |
| RS | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: ISA.ID = IDN.ID
- inferred → **STU**: ISA.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **ISG**: ISG.ID = ISA.ID AND ISG.SQ = ISA.SQ
- **ISW**: ISW.ID = ISA.ID AND ISW.SQ = ISA.SQ
