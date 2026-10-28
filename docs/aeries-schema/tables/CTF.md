# CTF

Defines the layout of custom tables defined in the Aeries SQL database and tells Aeries Web how to display and work with the table. Updated from the Define Custom Tables page

Rows: 77 · Primary key: TC, FC · Columns: 10

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TC | varchar(50) |  |  | FK → CTD.TC |
| FC | varchar(50) |  |  |  |
| SQ | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| TY | nvarchar(255) |  |  |  |
| DL | int |  |  |  |
| ML | int |  |  |  |
| DS | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **CTD**: CTF.TC = CTD.TC
