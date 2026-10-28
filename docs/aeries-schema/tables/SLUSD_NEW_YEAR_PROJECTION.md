# SLUSD_NEW_YEAR_PROJECTION (view)


Primary key: (none declared) · Columns: 29

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| GR/NG MISMATCH | varchar(25) |  |  |  |
| SC/NS MISMATCH | varchar(11) |  |  |  |
| RECORD_NUMBER | bigint | yes |  |  |
| SC | smallint |  |  | from SUP.SC |
| ID | int |  |  | from CSE.ID |
| SN | int |  |  | from SUP.SN |
| LN | nvarchar(100) |  |  | from STU.LN |
| FN | nvarchar(100) |  |  | from STU.FN |
| GR | smallint |  |  | from STU.GR |
| U11 | varchar(2) |  |  | from STU.U11 |
| BIL | varchar(1) | yes |  | from SUP.BIL |
| CU | smallint |  |  | from STU.CU |
| IT | varchar(2) |  |  | from STU.IT |
| TG | varchar(1) |  |  | from STU.TG |
| NS | smallint |  |  | from STU.NS |
| NG | smallint |  |  | from STU.NG |
| NT | smallint |  |  | from STU.NT |
| Next IntDist | varchar(2) |  |  | from STU.NIT |
| Next TransDist | varchar(14) |  |  | from STU.NTD |
| Next Grid Code | varchar(5) |  |  | from STU.NGC |
| Next Prg | varchar(1) |  |  | from STU.NSP |
| Next ResSchl | smallint |  |  | from STU.NRS |
| Next Teacher Name | nvarchar(30) |  |  | from TCH.TE |
| Aeries Status | varchar(17) |  |  |  |
| SDC | varchar(21) |  |  |  |
| Bilingual | varchar(9) | yes |  |  |
| Current Teacher | nvarchar(30) | yes |  | from TCH.TE |
| Next Teacher | smallint |  |  | from STU.NT |
| Projected Bilingual | varchar(9) | yes |  |  |
