# COD

Code definitions for coded columns in many tables.

Aeries: Contains CODES for Multiple Tables

Rows: 5,334 · Primary key: SC, TC, FC, CD · Columns: 27

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  | School code (0 = district-wide) | → LOC |
| TC | varchar(4) |  | Table code the value belongs to (e.g. STU) |  |
| FC | varchar(4) |  | Field code within that table (e.g. LF) |  |
| CD | nvarchar(255) |  | Code value |  |
| DE | nvarchar(max) |  | Description |  |
| N1 | money |  |  |  |
| CL1 | varchar(2) |  |  |  |
| DE1 | nvarchar(255) |  |  |  |
| CL2 | varchar(2) |  |  |  |
| DE2 | nvarchar(255) |  |  |  |
| CL3 | varchar(2) |  |  |  |
| DE3 | nvarchar(255) |  |  |  |
| CL4 | varchar(2) |  |  |  |
| DE4 | nvarchar(255) |  |  |  |
| CL5 | varchar(2) |  |  |  |
| DE5 | nvarchar(255) |  |  |  |
| CL6 | varchar(2) |  |  |  |
| DE6 | nvarchar(255) |  |  |  |
| CAT | nvarchar(255) |  |  |  |
| SRT | int |  |  |  |
| AC | nvarchar(255) |  |  |  |
| SG | nvarchar(255) |  |  |  |
| LV | bit |  |  |  |
| TG | nvarchar(1) |  |  | COD COD.TG (1 codes) |
| CC | varchar(6) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: COD.SC = LOC.CD (school code)

## Used in views

`AlexandriaPatrons`, `CountyDirectCert`, `ELLEVATION_ListPersonData`, `ELLEVATION_ListStudentDemoData`, `Emergency_Cards_Elementary_English`, `Emergency_Cards_Elementary_Spanish`, `FOLLETT_PATRONS`, `Google_Student_Accounts`, `Google_Student_Accounts_Daily`, `Google_Student_Accounts_Disable_If_No_Permission_Slip`, `Google_Student_Accounts_Enable_If_Permission_Slip`, `Google_Student_Accounts_Reset_All_Passwords`, `Google_Student_Accounts_Reset_Daily_Passwords`, `MIISS_attendance_summary`, `MIISS_elementary_office_referrals`, `MIISS_suspensions`, `Naviance_Students`, `SLUSD_AUTHORIZATIONS`, `SLUSD_Lersun_classes_AUP`, `SLUSD_MARKS_GRD`, `SLUSD_MARKS_GRD_HIS`, `SLUSD_SpED_Suspensions`, `SLUSD_demographics`, `SLUSD_elementary_demographics`, `SLUSD_secondary_demographics`, `llm_class_rosters`, `llm_course_enrollments`, `llm_discipline_incidents`, `llm_elpac_scores`, `llm_frpm_status`, `llm_special_education`, `llm_special_programs`, `llm_student_contacts`, `llm_student_demographics`, `llm_student_enrollment`, `llm_student_grades`, `llm_student_program_summary`, `llm_teacher_courses`

## Used in saved reports

"AP Courses By Ethnicity", "AP Courses by Ethnicity(%)", "AVID NSLP", "CTE Test", "Daily Enrollment (ADA)", "Enrollment by Grade % (ADA)", "Enrollment by Grade (ADA)", "Enrollment by Grade (Inters Only)", "Enrollment by Grade (Intras Only)", "Enrollment by grade (SDC)", "Gmail Account Status by School", "Grade Distribution", "Projected CALPADS UPP (%)", "SDC Enrollment % by Grade (ADA)", "SLHS Q1 Grade reporting", "School Enrollment By Grade", "Secondary SDC by Class >50%", "TBD EL Count - Student List", "TBD EL Count - Summary", "Teacher Marks Comparison", "Total Enrollment by NSLP(%) (Interdistrict and SDC included)"
