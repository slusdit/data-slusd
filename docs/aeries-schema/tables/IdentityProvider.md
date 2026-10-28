# IdentityProvider


Rows: 2 · Primary key: Id · Columns: 18

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Id | smallint |  |  |  |
| Name | nvarchar(100) |  |  |  |
| Description | nvarchar(500) |  |  |  |
| Enabled | bit |  |  |  |
| DiscoveryUrl | nvarchar(500) |  |  |  |
| ClientId | nvarchar(max) |  |  |  |
| ClientSecret | nvarchar(max) |  |  |  |
| UsernameClaimPath | nvarchar(200) |  |  |  |
| Notes | nvarchar(max) |  |  |  |
| StaffEnabled | bit |  |  |  |
| StudentEnabled | bit |  |  |  |
| InsertDateTime | datetime |  |  |  |
| InsertUserId | int |  |  |  |
| InsertUserName | varchar(255) |  |  |  |
| UpdateUserId | int |  |  |  |
| UpdateUserName | varchar(255) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **STU**: IdentityProvider.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))

## Referenced by (declared FKs)

- **UGN**: UGN.IDP = IdentityProvider.Id
