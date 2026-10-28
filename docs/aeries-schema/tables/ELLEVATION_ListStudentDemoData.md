# ELLEVATION_ListStudentDemoData (view)


Primary key: (none declared) · Columns: 59

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| StudentLocalID | varchar(30) | yes |  |  |
| ActiveStatus | varchar(12) |  |  |  |
| StudentTestID | varchar(13) | yes |  |  |
| LastName | nvarchar(100) | yes |  |  |
| FirstName | nvarchar(100) | yes |  |  |
| MiddleName | nvarchar(100) | yes |  |  |
| SchoolLEACode | varchar(30) | yes |  |  |
| SchoolName | nvarchar(max) | yes |  |  |
| GradeLevel | varchar(30) | yes |  |  |
| Sex | varchar(3) | yes |  |  |
| DateOfBirth | varchar(30) | yes |  |  |
| AddressLine1 | varchar(8000) | yes |  |  |
| AddressLine2 | varchar(12) |  |  |  |
| City | varchar(30) | yes |  |  |
| State | varchar(5) | yes |  |  |
| ZIPCode | varchar(7) | yes |  |  |
| HomePhone | varchar(10) | yes |  |  |
| CellPhone | varchar(9) |  |  |  |
| City/Town of Birth | varchar(8000) | yes |  |  |
| Country of Birth | varchar(16) |  |  | from ELLEVATION_LISTSTUDENTDEMODATA.Country of Birth |
| NativeLanguage | nvarchar(max) | yes |  | from ELLEVATION_LISTSTUDENTDEMODATA.NativeLanguage |
| HomeLanguage | nvarchar(max) | yes |  | from ELLEVATION_LISTSTUDENTDEMODATA.HomeLanguage |
| Ethnicity | varchar(9) |  |  |  |
| RaceAmericanIndian | varchar(18) |  |  |  |
| RaceAsian | varchar(9) |  |  |  |
| RaceBlack | varchar(9) |  |  |  |
| RaceWhite | varchar(9) |  |  |  |
| RacePacific | varchar(11) |  |  |  |
| FatherName | varchar(20) | yes |  |  |
| FatherWork | varchar(16) | yes |  |  |
| FatherPhone | varchar(11) | yes |  |  |
| FatherEmail | varchar(255) | yes |  |  |
| MotherName | varchar(20) | yes |  |  |
| MotherWork | varchar(16) | yes |  |  |
| MotherPhone | varchar(16) | yes |  |  |
| MotherEmail | varchar(255) | yes |  |  |
| GuardianName | varchar(12) |  |  |  |
| GuardianPhone | varchar(13) |  |  |  |
| GuardianEmail | varchar(13) |  |  |  |
| ELPDesignation | varchar(14) | yes |  |  |
| LEPStatus | nvarchar(max) | yes |  |  |
| MonitoredStatus | varchar(15) |  |  |  |
| ReceivingESLServices | varchar(20) |  |  |  |
| DateEnteredLEP | varchar(30) | yes |  |  |
| DateExitedLEP | varchar(30) | yes |  |  |
| DateMonitoredSince | varchar(18) |  |  |  |
| 504 | varchar(3) |  |  |  |
| Homeless | varchar(8) |  |  |  |
| IEP | varchar(3) |  |  |  |
| Immigrant | varchar(9) |  |  |  |
| Migrant | varchar(7) |  |  |  |
| Graduated | varchar(9) |  |  |  |
| Withdrawn | varchar(9) |  |  |  |
| DateEnteredUS | varchar(30) | yes |  |  |
| DateEnrolledInUSSchools | varchar(30) | yes |  |  |
| DateEnrolledInDistrict | varchar(30) | yes |  |  |
| YearsInUSSchools | varchar(30) | yes |  |  |
| DateGraduated | varchar(30) | yes |  |  |
| DateWithdrawn | varchar(30) | yes |  |  |
