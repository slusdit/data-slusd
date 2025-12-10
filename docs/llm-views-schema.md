# LLM Views Schema Reference

This document lists all available `llm_*` views in the Aeries database for AI-assisted query generation.

## Student Information

### llm_student_demographics
Primary student information view.

| Column | Description |
|--------|-------------|
| student_id | Unique student identifier |
| state_student_id | State-assigned student ID |
| student_number | District student number |
| school_id | School code |
| last_name | Student last name |
| first_name | Student first name |
| middle_name | Student middle name |
| school_name | School name |
| grade_level | Current grade level |
| birth_date | Date of birth |
| age | Current age |
| gender | Gender |
| address | Street address |
| city | City |
| state | State |
| zip_code | ZIP code |
| home_phone | Home phone number |
| parent_guardian_name | Parent/guardian name |
| parent_email | Parent email |
| student_email | Student email |
| home_language_code | Home language code |
| home_language | Home language description |
| correspondence_language_code | Correspondence language code |
| correspondence_language | Correspondence language description |
| language_fluency_code | Language fluency code |
| language_fluency | Language fluency description |
| english_learner_status | EL status (Y/N) |
| ethnicity_code | Ethnicity code |
| ethnicity | Ethnicity description |
| race_code_1 | Primary race code |
| race_1 | Primary race description |
| race_code_2 | Secondary race code |
| race_2 | Secondary race description |
| race_code_3 | Tertiary race code |
| race_3 | Tertiary race description |
| race_code_4 | Fourth race code |
| race_4 | Fourth race description |
| race_code_5 | Fifth race code |
| race_5 | Fifth race description |
| primary_race_ethnicity | Primary race/ethnicity |
| birth_country_code | Birth country code |
| birth_city | Birth city |
| birth_state | Birth state |
| counselor_email | Counselor email |
| counselor_name | Counselor name |
| student_status_code | Student status code |
| student_status | Student status description |
| special_program_status | Special program status |
| entry_date | School entry date |
| leave_date | School leave date |
| interdistrict_transfer_code | Inter-district transfer code |
| interdistrict_transfer_district | Transfer district |
| custom_field_u11 | Custom field |
| days_absent_ytd | Days absent year-to-date |
| days_enrolled_ytd | Days enrolled year-to-date |
| days_present_ytd | Days present year-to-date |
| attendance_rate_ytd | Attendance rate year-to-date |

### llm_student_enrollment
Student enrollment history.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| school_year | School year |
| school_name | School name |
| last_name | Last name |
| first_name | First name |
| entry_date | Entry date |
| leave_date | Leave date |
| enrollment_status | Enrollment status |
| days_enrolled | Days enrolled |
| grade_level_at_enrollment | Grade at enrollment |
| entry_reason_code | Entry reason code |
| entry_reason | Entry reason description |
| homeroom_teacher_number | Homeroom teacher number |
| homeroom_teacher_name | Homeroom teacher name |
| homeroom_teacher_email | Homeroom teacher email |
| track | Track |
| program | Program |
| is_current_year | Is current year (1/0) |

### llm_student_program_summary
Summary of student program flags.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| is_english_learner | Is English Learner (1/0) |
| language_fluency_code | Language fluency code |
| language_fluency | Language fluency description |
| is_special_education | Is Special Education (1/0) |
| sped_disability_code | SPED disability code |
| sped_primary_disability | Primary disability description |
| is_foster_youth | Is Foster Youth (1/0) |
| is_homeless | Is Homeless (1/0) |
| is_migrant | Is Migrant (1/0) |
| is_section_504 | Is Section 504 (1/0) |
| is_in_any_special_program | Is in any special program (1/0) |

---

## Attendance

### llm_attendance_daily
Daily attendance records.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| day_number | Day number |
| attendance_date | Attendance date |
| day_of_week | Day of week |
| all_day_code | All-day attendance code |
| all_day_description | All-day description |
| all_day_status | All-day status |
| all_day_counts_as_present | Counts as present (1/0) |
| all_day_suspension_related | Suspension related (1/0) |
| period_0_code | Period 0 code |
| period_1_code | Period 1 code |
| period_2_code | Period 2 code |
| period_3_code | Period 3 code |
| period_4_code | Period 4 code |
| period_5_code | Period 5 code |
| period_6_code | Period 6 code |
| period_absence_count | Period absence count |
| overall_attendance_code | Overall attendance code |
| was_absent_all_day | Was absent all day (1/0) |
| is_suspension_absence | Is suspension absence (1/0) |

### llm_attendance_summary
Attendance summary by student.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| instructional_days | Total instructional days |
| days_present | Days present |
| days_absent | Days absent |
| suspension_days | Suspension days |
| unexcused_absences | Unexcused absences |
| tardies | Tardies |
| attendance_rate_percent | Attendance rate % |
| absence_rate_percent | Absence rate % |
| is_chronically_absent | Is chronically absent (1/0) |
| truancy_risk_level | Truancy risk level |

---

## Special Programs & Special Education

### llm_special_programs
Student special program enrollments.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| program_code | Program code |
| program_description | Program description |
| program_category | Program category |
| program_start_date | Program start date |
| program_end_date | Program end date |
| eligibility_start_date | Eligibility start date |
| eligibility_end_date | Eligibility end date |
| is_active | Is active (1/0) |
| status | Status |

### llm_special_education
Special education details.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| sped_status | SPED status |
| eligibility_date | Eligibility date |
| exit_date | Exit date |
| placement_code | Placement code |
| placement_description | Placement description |
| primary_disability_code | Primary disability code |
| primary_disability | Primary disability description |
| last_assessment_date | Last assessment date |
| assessment_date | Assessment date |
| review_date | Review date |
| is_active_sped | Is active SPED (1/0) |

---

## Grades & GPA

### llm_student_grades
Student course grades.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| section_number | Section number |
| course_number | Course number |
| period | Period |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| course_name | Course name |
| course_description | Course description |
| department_name | Department name |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| final_grade | Final grade |
| credits_earned | Credits earned |
| mark_1 | Mark period 1 |
| mark_2 | Mark period 2 |
| mark_3 | Mark period 3 |
| mark_4 | Mark period 4 |
| mark_5 | Mark period 5 |
| mark_6 | Mark period 6 |
| citizenship_1 | Citizenship period 1 |
| citizenship_2 | Citizenship period 2 |
| citizenship_3 | Citizenship period 3 |
| citizenship_indicator | Citizenship indicator |
| grade_comments | Grade comments |
| is_failing | Is failing (1/0) |
| is_honor_grade | Is honor grade (1/0) |
| is_at_risk | Is at risk (1/0) |

### llm_student_gpa
Student GPA summary.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| current_gpa | Current GPA |
| cumulative_credits | Cumulative credits |
| current_year_credits | Current year credits |
| failing_grade_count | Failing grade count |
| at_risk_grade_count | At-risk grade count |
| honor_grade_count | Honor grade count |
| academic_standing | Academic standing |
| academic_risk_level | Academic risk level |

---

## Discipline

### llm_discipline_incidents
Discipline incident records.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| sequence_number | Sequence number |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| incident_school_code | Incident school code |
| incident_school_name | Incident school name |
| incident_date | Incident date |
| primary_discipline_code | Primary discipline code |
| primary_discipline_description | Primary discipline description |
| secondary_code_1 | Secondary code 1 |
| secondary_description_1 | Secondary description 1 |
| secondary_code_2 | Secondary code 2 |
| secondary_description_2 | Secondary description 2 |
| secondary_code_3 | Secondary code 3 |
| secondary_description_3 | Secondary description 3 |
| secondary_code_4 | Secondary code 4 |
| secondary_description_4 | Secondary description 4 |
| incident_comment | Incident comment |
| disposition_code | Disposition code |
| disposition_description | Disposition description |
| discipline_category | Discipline category |
| is_out_of_school_suspension | Is OSS (1/0) |
| is_in_school_suspension | Is ISS (1/0) |
| is_expulsion | Is expulsion (1/0) |
| is_suspension | Is suspension (1/0) |
| school_year_start | School year start |

### llm_suspension_summary
Suspension summary by student.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| out_of_school_suspensions | Out-of-school suspensions |
| in_school_suspensions | In-school suspensions |
| total_suspensions | Total suspensions |
| expulsions | Expulsions |
| most_recent_suspension_date | Most recent suspension date |
| first_suspension_date | First suspension date |
| days_since_last_suspension | Days since last suspension |
| discipline_risk_level | Discipline risk level |

---

## Courses & Rosters

### llm_course_enrollments
Student course enrollments.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| section_number | Section number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| course_number | Course number |
| course_name | Course name |
| course_description | Course description |
| department_code | Department code |
| department_name | Department name |
| state_course_code | State course code |
| section_id | Section ID |
| period | Period |
| room_number | Room number |
| teacher_number | Teacher number |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| schedule_mode | Schedule mode |
| schedule_mode_description | Schedule mode description |
| enrollment_status | Enrollment status |
| credits | Credits |
| track | Track |
| is_currently_enrolled | Is currently enrolled (1/0) |

### llm_class_rosters
Class rosters by section.

| Column | Description |
|--------|-------------|
| school_id | School code |
| section_number | Section number |
| school_name | School name |
| course_number | Course number |
| course_name | Course name |
| course_description | Course description |
| department_name | Department name |
| period | Period |
| room_number | Room number |
| teacher_number | Teacher number |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| student_id | Student identifier |
| student_number | Student number |
| student_last_name | Student last name |
| student_first_name | Student first name |
| student_grade_level | Student grade level |
| student_email | Student email |
| enrollment_status | Enrollment status |
| current_class_size | Current class size |

### llm_all_sections
All course sections.

| Column | Description |
|--------|-------------|
| section_id | Section ID |
| school_id | School code |
| school_name | School name |
| term | Term |
| period | Period |
| course_id | Course ID |
| course_name | Course name |
| teacher_staff_id | Teacher staff ID |
| teacher_number | Teacher number |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| room_number | Room number |
| grade_high | High grade |
| grade_low | Low grade |
| school_level | School level |
| student_count | Student count |

---

## Staff

### llm_staff_roster
Staff roster.

| Column | Description |
|--------|-------------|
| staff_id | Staff ID |
| teacher_number | Teacher number |
| school_id | School code |
| school_name | School name |
| last_name | Last name |
| first_name | First name |
| middle_name | Middle name |
| email | Email |
| room_number | Room number |
| low_grade | Low grade |
| high_grade | High grade |
| grade_range | Grade range |
| custom_field_1 | Custom field 1 |
| custom_field_2 | Custom field 2 |
| teacher_status | Teacher status |
| school_level | School level |
| sections_taught | Sections taught |
| total_students | Total students |

### llm_teacher_courses
Teacher course assignments.

| Column | Description |
|--------|-------------|
| staff_id | Staff ID |
| teacher_number | Teacher number |
| school_id | School code |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| teacher_room | Teacher room |
| school_name | School name |
| section_number | Section number |
| period | Period |
| section_room | Section room |
| course_number | Course number |
| course_name | Course name |
| course_description | Course description |
| department_code | Department code |
| department_name | Department name |
| schedule_mode | Schedule mode |
| schedule_mode_description | Schedule mode description |
| current_enrollment | Current enrollment |
| credits | Credits |
| state_course_code | State course code |

### llm_elementary_teachers
Elementary teacher roster.

| Column | Description |
|--------|-------------|
| staff_id | Staff ID |
| teacher_number | Teacher number |
| school_id | School code |
| last_name | Last name |
| first_name | First name |
| email | Email |
| room_number | Room number |
| school_name | School name |
| low_grade | Low grade |
| high_grade | High grade |
| grade_range | Grade range |
| homeroom_student_count | Homeroom student count |

### llm_elementary_grades
Elementary grade/homeroom assignments.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| homeroom_teacher_number | Homeroom teacher number |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| room_number | Room number |
| teacher_grade_low | Teacher low grade |
| teacher_grade_high | Teacher high grade |
| teacher_grade_range | Teacher grade range |
| school_level | School level |
| pseudo_section_id | Pseudo section ID |

### llm_teacher_student_roster
Teacher-student relationships.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| teacher_staff_id | Teacher staff ID |
| teacher_number | Teacher number |
| teacher_last_name | Teacher last name |
| teacher_first_name | Teacher first name |
| teacher_email | Teacher email |
| assignment_type | Assignment type |
| section_number | Section number |
| course_name | Course name |
| period | Period |
| teacher_section_id | Teacher section ID |

---

## Contacts & Demographics

### llm_student_contacts
Student contact information.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| student_last_name | Student last name |
| student_first_name | Student first name |
| grade_level | Grade level |
| school_name | School name |
| contact_sequence | Contact sequence |
| contact_first_name | Contact first name |
| contact_last_name | Contact last name |
| relationship_code | Relationship code |
| relationship | Relationship description |
| email | Email |
| home_phone | Home phone |
| work_phone | Work phone |
| cell_phone | Cell phone |
| address | Address |
| city | City |
| state | State |
| zip_code | ZIP code |
| is_primary_contact | Is primary contact (1/0) |
| lives_with_student | Lives with student (1/0) |
| notification_priority | Notification priority |
| notification_priority_description | Notification priority description |
| education_level_code | Education level code |
| education_level | Education level description |

### llm_frpm_status
Free/Reduced Price Meal status.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| frpm_code | FRPM code |
| frpm_status | FRPM status (Free/Reduced/Paid) |
| eligibility_code | Eligibility code |
| eligibility_method | Eligibility method |
| effective_start_date | Effective start date |
| is_frpm_eligible | Is FRPM eligible (1/0) |
| is_free | Is free (1/0) |
| is_reduced | Is reduced (1/0) |

### llm_sed_status
Socioeconomically Disadvantaged status.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| frpm_code | FRPM code |
| is_frpm_eligible | Is FRPM eligible (1/0) |
| lowest_parent_education_level | Lowest parent education level |
| has_low_parent_education | Has low parent education (1/0) |
| direct_certification_flag | Direct certification flag |
| is_sed | Is SED (1/0) |
| sed_reason | SED reason |

---

## Testing

### llm_test_scores
All test scores with history.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| test_code | Test code |
| test_description | Test description |
| test_date | Test date |
| test_year | Test year |
| test_type | Test type |
| test_category | Test category |
| performance_level | Performance level |
| scale_score | Scale score |
| raw_score | Raw score |
| elpac_level_description | ELPAC level description |
| caaspp_level_description | CAASPP level description |
| part_type | Part type |
| part_description | Part description |
| grade_at_test | Grade at test |
| recency_rank | Recency rank |

### llm_test_scores_current
Most recent test scores.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| test_code | Test code |
| test_description | Test description |
| test_date | Test date |
| test_year | Test year |
| test_category | Test category |
| performance_level | Performance level |
| scale_score | Scale score |
| raw_score | Raw score |
| elpac_level_description | ELPAC level description |
| caaspp_level_description | CAASPP level description |
| part_type | Part type |
| part_description | Part description |
| grade_at_test | Grade at test |

### llm_elpac_scores
ELPAC test scores for English Learners.

| Column | Description |
|--------|-------------|
| student_id | Student identifier |
| school_id | School code |
| student_number | Student number |
| last_name | Last name |
| first_name | First name |
| grade_level | Grade level |
| school_name | School name |
| language_fluency_code | Language fluency code |
| language_fluency | Language fluency description |
| is_english_learner | Is English Learner (1/0) |
| test_code | Test code |
| test_date | Test date |
| test_year | Test year |
| performance_level | Performance level |
| scale_score | Scale score |
| elpac_level_description | ELPAC level description |
| is_newcomer_el | Is newcomer EL (1/0) |
| is_long_term_el | Is long-term EL (1/0) |
| us_school_entry_date | US school entry date |
| us_entry_date | US entry date |
| birth_country | Birth country |
| years_in_us_schools | Years in US schools |
