# SLUSD_warmbody_secondary_enrollment (view)


Primary key: (none declared) · Columns: 15

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| Sch# | smallint |  |  | from DAY.SC |
| Room | varchar(6) | yes |  | from MST.RM |
| Section | smallint | yes |  | from CAR.SE |
| Course# | varchar(6) | yes |  | from CAR.CN |
| Course | nvarchar(30) | yes |  | from CRS.CO |
| Teacher# | smallint | yes |  | from CAR.TN |
| Teacher | nvarchar(30) | yes |  | from TCH.TE |
| Teacher Last | varchar(50) | yes |  | from TCH.TLN |
| Teacher First | nvarchar(20) | yes |  | from TCH.TF |
| Period | smallint | yes |  | from CAR.PD |
| Date | varchar(30) | yes |  |  |
| Term | varchar(1) | yes |  | from MST.SM |
| MX | smallint | yes |  | from MST.MX |
| Grade Level | varchar(61) |  |  |  |
| Enrollment | int | yes |  |  |
