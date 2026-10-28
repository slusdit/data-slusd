# CTD

Defines the layout of custom tables defined in the Aeries SQL database and tells Aeries Web how to display and work with the table. Updated from the Define Custom Tables page

Rows: 8 · Primary key: TC · Columns: 12

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| TC | varchar(50) |  |  |  |
| NM | nvarchar(255) |  |  |  |
| NLC | nvarchar(255) |  |  |  |
| PKF | nvarchar(255) |  |  |  |
| PT | nvarchar(50) |  |  |  |
| PF | nvarchar(255) |  |  |  |
| CF | nvarchar(255) |  |  |  |
| OM | nvarchar(4) |  |  |  |
| OB | nvarchar(255) |  |  |  |
| VW | bit |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **CTF**: CTF.TC = CTD.TC
