# TDF

Defines the content of the District's Transcripts

Rows: 48 · Primary key: SC, CD · Columns: 115

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| CD | varchar(3) |  |  | COD TDF.CD (6 codes) |
| T1 | bit |  |  |  |
| T2 | bit |  |  |  |
| T3 | bit |  |  |  |
| T4 | bit |  |  |  |
| T5 | bit |  |  |  |
| T6 | bit |  |  |  |
| T7 | bit |  |  |  |
| T8 | bit |  |  |  |
| N1 | varchar(20) |  |  |  |
| N2 | varchar(20) |  |  |  |
| N3 | varchar(20) |  |  |  |
| N4 | varchar(20) |  |  |  |
| N5 | varchar(20) |  |  |  |
| TI | varchar(100) |  |  |  |
| T9 | bit |  |  |  |
| S0 | varchar(20) |  |  |  |
| S1 | varchar(20) |  |  |  |
| S2 | varchar(20) |  |  |  |
| S3 | varchar(20) |  |  |  |
| S4 | varchar(20) |  |  |  |
| S5 | varchar(20) |  |  |  |
| S6 | varchar(20) |  |  |  |
| S7 | varchar(20) |  |  |  |
| S8 | varchar(20) |  |  |  |
| T10 | bit |  |  |  |
| T11 | bit |  |  |  |
| T12 | bit |  |  |  |
| T13 | bit |  |  |  |
| T14 | bit |  |  |  |
| T15 | bit |  |  |  |
| T16 | bit |  |  |  |
| T17 | bit |  |  |  |
| T18 | bit |  |  |  |
| T19 | bit |  |  |  |
| GP | smallint |  |  |  |
| T20 | bit |  |  |  |
| T21 | varchar(1) |  |  |  |
| T22 | bit |  |  |  |
| T23 | bit |  |  |  |
| T24 | bit |  |  |  |
| T25 | bit |  |  |  |
| T26 | bit |  |  |  |
| T27 | bit |  |  |  |
| T28 | bit |  |  |  |
| T29 | bit |  |  |  |
| T30 | bit |  |  |  |
| T31 | bit |  |  |  |
| T32 | bit |  |  |  |
| T33 | bit |  |  |  |
| T34 | bit |  |  |  |
| T35 | bit |  |  |  |
| T36 | bit |  |  |  |
| T37 | bit |  |  |  |
| T38 | bit |  |  |  |
| T39 | bit |  |  |  |
| T40 | bit |  |  |  |
| T41 | varchar(255) |  |  |  |
| T42 | varchar(255) |  |  |  |
| T43 | varchar(255) |  |  |  |
| T44 | varchar(255) |  |  |  |
| T45 | varchar(255) |  |  |  |
| T46 | varchar(255) |  |  |  |
| T47 | varchar(255) |  |  |  |
| T48 | varchar(255) |  |  |  |
| T49 | varchar(255) |  |  |  |
| T50 | varchar(255) |  |  |  |
| T51 | bit |  |  |  |
| T52 | bit |  |  |  |
| ST0 | varchar(2) |  |  |  |
| ST1 | varchar(2) |  |  |  |
| ST2 | varchar(2) |  |  |  |
| ST3 | varchar(2) |  |  |  |
| ST4 | varchar(2) |  |  |  |
| ST5 | varchar(2) |  |  |  |
| ST6 | varchar(2) |  |  |  |
| ST7 | varchar(2) |  |  |  |
| ST8 | varchar(2) |  |  |  |
| LO | smallint |  |  |  |
| HI | smallint |  |  |  |
| T53 | bit |  |  |  |
| T54 | bit |  |  |  |
| T55 | bit |  |  |  |
| T56 | bit |  |  |  |
| T57 | bit |  |  |  |
| T58 | bit |  |  |  |
| T59 | bit |  |  |  |
| T60 | bit |  |  |  |
| T61 | bit |  |  |  |
| T62 | bit |  |  |  |
| T63 | bit |  |  |  |
| T64 | bit |  |  |  |
| T65 | bit |  |  |  |
| T66 | bit |  |  |  |
| T67 | bit |  |  |  |
| T68 | bit |  |  |  |
| T69 | bit |  |  |  |
| T70 | bit |  |  |  |
| WMF | varbinary(max) | yes |  |  |
| UDF | nvarchar(max) |  |  |  |
| T71 | bit |  |  |  |
| T72 | bit |  |  |  |
| T73 | bit |  |  |  |
| T74 | bit |  |  |  |
| T75 | bit |  |  |  |
| T76 | bit |  |  |  |
| T77 | smallint |  |  |  |
| T78 | bit |  |  |  |
| T79 | bit |  |  |  |
| T80 | bit |  |  |  |
| T81 | bit |  |  |  |
| GDF | varchar(1) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: TDF.SC = LOC.CD (school code)

## Used in saved reports

"Transcript for Current Year"
