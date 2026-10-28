# MII

Contains history of details for Medical Insurance

Rows: 17,514 · Primary key: PID, SQ · Columns: 32

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| SQ | smallint |  |  |  |
| TY | varchar(3) |  |  | COD MII.TY (6 codes) |
| NM | varchar(255) |  |  |  |
| GP | varchar(255) |  |  |  |
| SD | datetime | yes |  |  |
| ED | datetime | yes |  |  |
| MC | bit |  |  |  |
| MBI | varchar(50) |  |  |  |
| PN | varchar(50) |  |  |  |
| MID | varchar(50) |  |  |  |
| PCN | varchar(255) |  |  |  |
| PCT | varchar(20) |  |  |  |
| PRI | bit |  |  |  |
| CO | nvarchar(255) |  |  |  |
| SFN | nvarchar(25) |  |  |  |
| SLN | nvarchar(50) |  |  |  |
| SAD | nvarchar(55) |  |  |  |
| SA2 | nvarchar(55) |  |  |  |
| SCY | nvarchar(25) |  |  |  |
| SST | varchar(2) |  |  |  |
| SZC | varchar(5) |  |  |  |
| ICC | nvarchar(3) |  |  |  |
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

- declared FK → **IDN**: MII.PID = IDN.ID
