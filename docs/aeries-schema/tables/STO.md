# STO

Contains Information regarding Stores from which Students can purchase items using scrip

Rows: 0 · Primary key: SC, ID · Columns: 22

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| ID | varchar(3) |  |  | → STU |
| NM | varchar(50) |  |  |  |
| AD | varchar(30) |  |  |  |
| CY | varchar(20) |  |  |  |
| ST | varchar(2) |  |  |  |
| ZC | varchar(5) |  |  |  |
| ZX | varchar(4) |  |  |  |
| CN | varchar(50) |  |  | → CRS |
| TL | varchar(10) |  |  |  |
| EX | varchar(5) |  |  |  |
| TG | varchar(1) |  |  |  |
| U1 | varchar(1) |  |  |  |
| U2 | varchar(1) |  |  |  |
| U3 | varchar(1) |  |  |  |
| U4 | varchar(1) |  |  |  |
| U5 | varchar(1) |  |  |  |
| U6 | varchar(1) |  |  |  |
| U7 | varchar(1) |  |  |  |
| U8 | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: STO.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: STO.CN = CRS.CN (course number)
- inferred → **LOC**: STO.SC = LOC.CD (school code)

## Referenced by (declared FKs)

- **SCP**: SCP.SC = STO.SC AND SCP.ID = STO.ID
- **STP**: STP.SC = STO.SC AND STP.ID = STO.ID
