# AUT

Specific authorizations or prohibitions to student participation in specific programs

Rows: 434,996 · Primary key: PID, SQ · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| TY | varchar(1) |  |  | COD AUT.TY (11 codes) |
| CO | nvarchar(max) |  |  |  |
| DT | datetime | yes |  |  |
| SQ | smallint |  |  |  |
| ST | varchar(1) |  |  | COD AUT.ST (3 codes) |
| SDT | datetime | yes |  |  |
| CD | varchar(3) |  |  | COD AUT.CD (12 codes) |
| TA | varchar(6) |  |  |  |
| EED | datetime | yes |  |  |
| SRC | varchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUI | int |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: AUT.PID = IDN.ID

## Used in views

`SLUSD_AUTHORIZATIONS`, `SLUSD_DoNotPhotograph`
