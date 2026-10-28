# TPS

Stores calculated status for Algebra I, CAHSEE, and Physical Fitness

Rows: 24,932 · Primary key: PID · Columns: 66

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| PID | int |  |  | FK → IDN.ID |
| PF1 | varchar(1) |  |  |  |
| PD1 | datetime | yes |  |  |
| PF2 | varchar(1) |  |  |  |
| PD2 | datetime | yes |  |  |
| PF3 | varchar(1) |  |  |  |
| PD3 | datetime | yes |  |  |
| PF4 | varchar(1) |  |  |  |
| PD4 | datetime | yes |  |  |
| PF5 | varchar(1) |  |  |  |
| PD5 | datetime | yes |  |  |
| PF6 | varchar(1) |  |  |  |
| PD6 | datetime | yes |  |  |
| PF | varchar(1) |  |  |  |
| ELA | varchar(1) |  |  |  |
| ELD | datetime | yes |  |  |
| MTH | varchar(1) |  |  |  |
| MTD | datetime | yes |  |  |
| ALG | bit |  |  |  |
| PD | datetime | yes |  |  |
| PF15 | varchar(1) |  |  |  |
| PD15 | datetime | yes |  |  |
| PF25 | varchar(1) |  |  |  |
| PD25 | datetime | yes |  |  |
| PF35 | varchar(1) |  |  |  |
| PD35 | datetime | yes |  |  |
| PF45 | varchar(1) |  |  |  |
| PD45 | datetime | yes |  |  |
| PF55 | varchar(1) |  |  |  |
| PD55 | datetime | yes |  |  |
| PF65 | varchar(1) |  |  |  |
| PD65 | datetime | yes |  |  |
| PFO5 | varchar(1) |  |  |  |
| PDO5 | datetime | yes |  |  |
| PF17 | varchar(1) |  |  |  |
| PD17 | datetime | yes |  |  |
| PF27 | varchar(1) |  |  |  |
| PD27 | datetime | yes |  |  |
| PF37 | varchar(1) |  |  |  |
| PD37 | datetime | yes |  |  |
| PF47 | varchar(1) |  |  |  |
| PD47 | datetime | yes |  |  |
| PF57 | varchar(1) |  |  |  |
| PD57 | datetime | yes |  |  |
| PF67 | varchar(1) |  |  |  |
| PD67 | datetime | yes |  |  |
| PFO7 | varchar(1) |  |  |  |
| PDO7 | datetime | yes |  |  |
| PF19 | varchar(1) |  |  |  |
| PD19 | datetime | yes |  |  |
| PF29 | varchar(1) |  |  |  |
| PD29 | datetime | yes |  |  |
| PF39 | varchar(1) |  |  |  |
| PD39 | datetime | yes |  |  |
| PF49 | varchar(1) |  |  |  |
| PD49 | datetime | yes |  |  |
| PF59 | varchar(1) |  |  |  |
| PD59 | datetime | yes |  |  |
| PF69 | varchar(1) |  |  |  |
| PD69 | datetime | yes |  |  |
| PFO9 | varchar(1) |  |  |  |
| PDO9 | datetime | yes |  |  |
| AGR | smallint |  |  |  |
| CPR | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: TPS.PID = IDN.ID
