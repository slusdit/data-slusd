# EFO

Ed-Fi Organization

Rows: 1 · Primary key: CID · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| CID | int |  |  |  |
| NM | nvarchar(255) |  |  |  |
| DU | nvarchar(255) |  |  |  |
| LNS | nvarchar(255) |  |  |  |
| CLD | bit |  |  |  |
| API | nvarchar(255) |  |  |  |
| OAU | nvarchar(255) |  |  |  |
| CK | nvarchar(100) |  |  |  |
| CS | varchar(255) |  |  |  |
| VER | nvarchar(10) |  |  |  |
| DID | int |  |  |  |
| ENS | bit |  |  |  |
| ENR | bit |  |  |  |
| RO | bit |  |  |  |
| ASD | bit |  |  |  |
| ODI | int |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Referenced by (declared FKs)

- **EFB**: EFB.CID = EFO.CID
- **EFE**: EFE.CID = EFO.CID
- **EFS**: EFS.CID = EFO.CID
- **EFSD**: EFSD.CID = EFO.CID
