# GRP

Contains the mark headings and descriptions to be printed on a report card and any messages

Rows: 21 · Primary key: SC, KY · Columns: 102

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| SC | smallint |  |  | → LOC |
| P1 | varchar(1) |  |  |  |
| P2 | varchar(1) |  |  |  |
| P3 | varchar(1) |  |  |  |
| P4 | varchar(1) |  |  |  |
| P5 | varchar(1) |  |  |  |
| P6 | varchar(1) |  |  |  |
| P7 | varchar(1) |  |  |  |
| P8 | varchar(1) |  |  |  |
| P9 | varchar(1) |  |  |  |
| P10 | varchar(1) |  |  |  |
| H1 | varchar(3) |  |  |  |
| H2 | varchar(3) |  |  |  |
| H3 | varchar(3) |  |  |  |
| H4 | varchar(3) |  |  |  |
| H5 | varchar(3) |  |  |  |
| H6 | varchar(3) |  |  |  |
| H7 | varchar(3) |  |  |  |
| H8 | varchar(3) |  |  |  |
| H9 | varchar(3) |  |  |  |
| H10 | varchar(3) |  |  |  |
| S1 | varchar(3) |  |  |  |
| S2 | varchar(3) |  |  |  |
| S3 | varchar(3) |  |  |  |
| S4 | varchar(3) |  |  |  |
| S5 | varchar(3) |  |  |  |
| S6 | varchar(3) |  |  |  |
| S7 | varchar(3) |  |  |  |
| S8 | varchar(3) |  |  |  |
| S9 | varchar(3) |  |  |  |
| S10 | varchar(3) |  |  |  |
| T1 | varchar(50) |  |  |  |
| T2 | varchar(50) |  |  |  |
| T3 | varchar(50) |  |  |  |
| T4 | varchar(50) |  |  |  |
| T5 | varchar(50) |  |  |  |
| T6 | varchar(50) |  |  |  |
| T7 | varchar(50) |  |  |  |
| T8 | varchar(50) |  |  |  |
| T9 | varchar(50) |  |  |  |
| M1 | varchar(60) |  |  |  |
| M2 | varchar(60) |  |  |  |
| P11 | varchar(1) |  |  |  |
| H11 | varchar(3) |  |  |  |
| S11 | varchar(3) |  |  |  |
| T10 | varchar(50) |  |  |  |
| T11 | varchar(50) |  |  |  |
| KY | int |  |  |  |
| P12 | varchar(1) |  |  |  |
| H12 | varchar(3) |  |  |  |
| S12 | varchar(3) |  |  |  |
| T12 | varchar(50) |  |  |  |
| B1 | datetime | yes |  |  |
| B2 | datetime | yes |  |  |
| B3 | datetime | yes |  |  |
| B4 | datetime | yes |  |  |
| B5 | datetime | yes |  |  |
| B6 | datetime | yes |  |  |
| B7 | datetime | yes |  |  |
| B8 | datetime | yes |  |  |
| B9 | datetime | yes |  |  |
| B10 | datetime | yes |  |  |
| B11 | datetime | yes |  |  |
| B12 | datetime | yes |  |  |
| E1 | datetime | yes |  |  |
| E2 | datetime | yes |  |  |
| E3 | datetime | yes |  |  |
| E4 | datetime | yes |  |  |
| E5 | datetime | yes |  |  |
| E6 | datetime | yes |  |  |
| E7 | datetime | yes |  |  |
| E8 | datetime | yes |  |  |
| E9 | datetime | yes |  |  |
| E10 | datetime | yes |  |  |
| E11 | datetime | yes |  |  |
| E12 | datetime | yes |  |  |
| C1 | nvarchar(6) |  |  |  |
| C2 | nvarchar(6) |  |  |  |
| C3 | nvarchar(6) |  |  |  |
| C4 | nvarchar(6) |  |  |  |
| C5 | nvarchar(6) |  |  |  |
| C6 | nvarchar(6) |  |  |  |
| C7 | nvarchar(6) |  |  |  |
| C8 | nvarchar(6) |  |  |  |
| C9 | nvarchar(6) |  |  |  |
| C10 | nvarchar(6) |  |  |  |
| C11 | nvarchar(6) |  |  |  |
| C12 | nvarchar(6) |  |  |  |
| GP1 | nvarchar(10) |  |  |  |
| GP2 | nvarchar(10) |  |  |  |
| GP3 | nvarchar(10) |  |  |  |
| GP4 | nvarchar(10) |  |  |  |
| GP5 | nvarchar(10) |  |  |  |
| GP6 | nvarchar(10) |  |  |  |
| GP7 | nvarchar(10) |  |  |  |
| GP8 | nvarchar(10) |  |  |  |
| GP9 | nvarchar(10) |  |  |  |
| GP10 | nvarchar(10) |  |  |  |
| GP11 | nvarchar(10) |  |  |  |
| GP12 | nvarchar(10) |  |  |  |
| DEL | bit |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- inferred → **LOC**: GRP.SC = LOC.CD (school code)
