# SLUSD_secondary_demographics (view)


Primary key: (none declared) · Columns: 8

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | from STU.SC |
| ID | int |  |  | from STU.ID |
| SSID | varchar(10) |  |  | from STU.CID |
| Language Fluency | nvarchar(max) | yes |  |  |
| English Learner? | varchar(3) |  |  |  |
| Home Language | nvarchar(max) |  |  | from COD.DE |
| Special Ed? | varchar(1) |  |  |  |
| Aggregate Race Data | nvarchar(max) |  |  | from COD.DE |
