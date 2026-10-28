# ETS_Accommodation_Test


Rows: 808 · Primary key: (none declared) · Columns: 2

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| AID | int |  |  | FK → ETS_Accommodation.ID |
| TID | int |  |  | FK → ETS_Test.ID |

## Joins

- declared FK → **ETS_Accommodation**: ETS_Accommodation_Test.AID = ETS_Accommodation.ID
- declared FK → **ETS_Test**: ETS_Accommodation_Test.TID = ETS_Test.ID
