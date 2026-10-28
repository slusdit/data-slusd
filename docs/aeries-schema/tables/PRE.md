# PRE

Stores Texas Assessment Precode file data.

Rows: 0 · Primary key: ID, RD, TID, EOC · Columns: 147

## Columns

| Column | Type | Null | Meaning | Values / joins |
|---|---|---|---|---|
| ID | int |  |  | FK → IDN.ID |
| RD | datetime |  |  |  |
| TID | int |  |  |  |
| SC | varchar(9) |  |  | → LOC |
| CID | varchar(10) |  |  |  |
| GL | varchar(255) |  |  |  |
| DN | nvarchar(255) |  |  |  |
| CN | nvarchar(255) |  |  | → CRS |
| GRP | nvarchar(255) |  |  |  |
| LN | nvarchar(255) |  |  |  |
| FN | nvarchar(255) |  |  |  |
| MI | nvarchar(255) |  |  |  |
| SSH | varchar(255) |  |  |  |
| GN | nvarchar(255) |  |  |  |
| DOB | varchar(255) |  |  |  |
| ETH | varchar(255) |  |  |  |
| I | varchar(255) |  |  |  |
| A | varchar(255) |  |  |  |
| B | varchar(255) |  |  |  |
| P | varchar(255) |  |  |  |
| W | varchar(255) |  |  |  |
| ECD | varchar(255) |  |  |  |
| TIA | varchar(255) |  |  |  |
| MS | varchar(255) |  |  |  |
| LEP | varchar(255) |  |  |  |
| BIL | varchar(255) |  |  |  |
| ESL | varchar(255) |  |  |  |
| SED | varchar(255) |  |  |  |
| GT | varchar(255) |  |  |  |
| AR | varchar(255) |  |  |  |
| CT | varchar(255) |  |  |  |
| LUA | nvarchar(255) |  |  |  |
| LUB | nvarchar(255) |  |  |  |
| LUC | nvarchar(255) |  |  |  |
| LUD | nvarchar(255) |  |  |  |
| YIS | varchar(255) |  |  |  |
| PD | varchar(255) |  |  |  |
| EOC | varchar(255) |  |  |  |
| TFRE | varchar(255) |  |  |  |
| TFMA | varchar(255) |  |  |  |
| TFSCI | varchar(255) |  |  |  |
| TFSS | varchar(255) |  |  |  |
| TFWRI | varchar(255) |  |  |  |
| TFEOC | varchar(255) |  |  |  |
| FIL1 | varchar(255) |  |  |  |
| FIL2 | varchar(255) |  |  |  |
| FIL3 | varchar(255) |  |  |  |
| FIL4 | varchar(255) |  |  |  |
| AI | varchar(255) |  |  |  |
| TC | varchar(255) |  |  |  |
| TP | varchar(255) |  |  |  |
| AG | varchar(255) |  |  |  |
| REF | varchar(255) |  |  |  |
| SIFE | varchar(255) |  |  |  |
| TAT | varchar(255) |  |  |  |
| TPSN | varchar(255) |  |  |  |
| TVRE | varchar(255) |  |  |  |
| TVMA | varchar(255) |  |  |  |
| TVSCI | varchar(255) |  |  |  |
| TVSS | varchar(255) |  |  |  |
| TVWRI | varchar(255) |  |  |  |
| TVEOC | varchar(255) |  |  |  |
| HCDCC | varchar(255) |  |  |  |
| OTGRE | varchar(255) |  |  |  |
| OTGMA | varchar(255) |  |  |  |
| OTGSCI | varchar(255) |  |  |  |
| OTGSS | varchar(255) |  |  |  |
| OTGWRI | varchar(255) |  |  |  |
| RTRE | varchar(255) |  |  |  |
| RTMA | varchar(255) |  |  |  |
| TLRE | varchar(255) |  |  |  |
| TLMA | varchar(255) |  |  |  |
| TLSCI | varchar(255) |  |  |  |
| TLWRI | varchar(255) |  |  |  |
| ITOGRE | varchar(255) |  |  |  |
| ITOGMA | varchar(255) |  |  |  |
| ITOGSCI | varchar(255) |  |  |  |
| ITOGSS | varchar(255) |  |  |  |
| UIDRE | varchar(255) |  |  |  |
| UIDMA | varchar(255) |  |  |  |
| UIDSCI | varchar(255) |  |  |  |
| UIDSS | varchar(255) |  |  |  |
| UIDWRI | varchar(255) |  |  |  |
| UIDEOC | varchar(255) |  |  |  |
| DC | nvarchar(6) |  |  |  |
| MN | nvarchar(255) |  |  |  |
| TAL | varchar(1) |  |  |  |
| SAL | varchar(1) |  |  |  |
| CRI | varchar(2) |  |  |  |
| ATR | varchar(2) |  |  |  |
| HMS | varchar(1) |  |  |  |
| UYS | varchar(1) |  |  |  |
| MCS | varchar(1) |  |  |  |
| SLC | varchar(2) |  |  |  |
| FCI | varchar(1) |  |  |  |
| DIC | varchar(1) |  |  |  |
| TFAL | varchar(255) |  |  |  |
| TFBI | varchar(255) |  |  |  |
| TFUS | varchar(255) |  |  |  |
| TFE1 | varchar(255) |  |  |  |
| TFE2 | varchar(255) |  |  |  |
| ITOGAL | varchar(255) |  |  |  |
| ITOGBI | varchar(255) |  |  |  |
| ITOGUS | varchar(255) |  |  |  |
| ITOGE1 | varchar(255) |  |  |  |
| ITOGE2 | varchar(255) |  |  |  |
| SAGRE | varchar(255) |  |  |  |
| SAGMA | varchar(255) |  |  |  |
| SAGSC | varchar(255) |  |  |  |
| SAGSS | varchar(255) |  |  |  |
| EOCAL | varchar(255) |  |  |  |
| EOCE1 | varchar(255) |  |  |  |
| EOCE2 | varchar(255) |  |  |  |
| EOCBI | varchar(255) |  |  |  |
| EOCUS | varchar(255) |  |  |  |
| EOC2AL | varchar(255) |  |  |  |
| EOC2E1 | varchar(255) |  |  |  |
| EOC2E2 | varchar(255) |  |  |  |
| EOC2BI | varchar(255) |  |  |  |
| EOC2US | varchar(255) |  |  |  |
| EOCDAL | varchar(255) |  |  |  |
| EOCDE1 | varchar(255) |  |  |  |
| EOCDE2 | varchar(255) |  |  |  |
| EOCDBI | varchar(255) |  |  |  |
| EOCDUS | varchar(255) |  |  |  |
| EOCJAL | varchar(255) |  |  |  |
| EOCJE1 | varchar(255) |  |  |  |
| EOCJE2 | varchar(255) |  |  |  |
| EOCJBI | varchar(255) |  |  |  |
| EOCJUS | varchar(255) |  |  |  |
| ITGAL | varchar(255) |  |  |  |
| ITGE1 | varchar(255) |  |  |  |
| ITGE2 | varchar(255) |  |  |  |
| ITGBI | varchar(255) |  |  |  |
| ITGUS | varchar(255) |  |  |  |
| ITGM | varchar(255) |  |  |  |
| ITGR | varchar(255) |  |  |  |
| ITGS | varchar(255) |  |  |  |
| ITGSS | varchar(255) |  |  |  |
| S504 | varchar(255) |  |  |  |
| IDT | datetime | yes |  |  |
| IUI | int |  |  |  |
| UUI | int |  |  |  |
| IUN | varchar(255) |  |  |  |
| UUN | varchar(255) |  |  |  |
| DEL | int |  |  |  |
| DTS | datetime | yes |  |  |

## Joins

- declared FK → **IDN**: PRE.ID = IDN.ID
- inferred → **STU**: PRE.ID = STU.ID (Permanent-ID keyed table (verify: some tables use ID for other identifiers))
- inferred → **CRS**: PRE.CN = CRS.CN (course number)
- inferred → **LOC**: PRE.SC = LOC.CD (school code)
