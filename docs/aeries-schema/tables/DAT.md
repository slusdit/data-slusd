# DAT

Aeries Web Only. Stores the low and high values for each Rubric level

Rows: 250 · Primary key: AID, SCL, GR · Columns: 42

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | varchar(255) |  |  | FK → DAI.AID |
| SCL | smallint |  |  |  |
| GR | smallint |  |  |  |
| NA | bit |  |  |  |
| L1L | money |  |  |  |
| L1H | money |  |  |  |
| L2L | money |  |  |  |
| L2H | money |  |  |  |
| L3L | money |  |  |  |
| L3H | money |  |  |  |
| L4L | money |  |  |  |
| L4H | money |  |  |  |
| L5L | money |  |  |  |
| L5H | money |  |  |  |
| L1M | varchar(255) |  |  |  |
| L2M | varchar(255) |  |  |  |
| L3M | varchar(255) |  |  |  |
| L4M | varchar(255) |  |  |  |
| L5M | varchar(255) |  |  |  |
| L1V | money |  |  |  |
| L2V | money |  |  |  |
| L3V | money |  |  |  |
| L4V | money |  |  |  |
| L5V | money |  |  |  |
| L6L | money |  |  |  |
| L6H | money |  |  |  |
| L7L | money |  |  |  |
| L7H | money |  |  |  |
| L8L | money |  |  |  |
| L8H | money |  |  |  |
| L9L | money |  |  |  |
| L9H | money |  |  |  |
| L6M | varchar(255) |  |  |  |
| L7M | varchar(255) |  |  |  |
| L8M | varchar(255) |  |  |  |
| L9M | varchar(255) |  |  |  |
| L6V | money |  |  |  |
| L7V | money |  |  |  |
| L8V | money |  |  |  |
| L9V | money |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **DAI**: DAT.AID = DAI.AID
