# data-slusd - File Dependencies

> Auto-generated dependency analysis
> Generated: 2025-12-09

## Overview

| Metric | Value |
|--------|-------|
| Total Files | 340 |
| Internal Dependencies | 0 |
| External Packages | 30 |

---

## Most Depended-Upon Files

These files are imported by many other files. Changes here may have wide impact:


---

## Files With Most Dependencies

These files import many other modules:


---

## Entry Points

Files that are not imported by other project files (potential entry points):

- `app\[sc]\layout.tsx`
- `app\[sc]\student\[id]\loading.tsx`
- `app\[sc]\student\[id]\page.tsx`
- `app\admin\page.tsx`
- `app\ai-query\page.tsx`
- `app\api\admin\emulate\route.ts`
- `app\api\admin\fragments\[id]\route.ts`
- `app\api\admin\fragments\route.ts`
- `app\api\ai-query\generate\route.ts`
- `app\api\fastapi\token\route.ts`
- `app\api\fastapi\upload\route.ts`
- `app\assessment\layout.tsx`
- `app\attendance\page.tsx`
- `app\components\ActiveSchool.tsx`
- `app\components\AddClassToUserButton.tsx`



---

## External Dependencies

Third-party packages used by this project:

- `../components/AdminTabs`
- `../components/FragmentAdminGrid`
- `../components/QueryAdminGrid`
- `../components/QueryBar`
- `../components/RenewSchools`
- `../components/SchoolPicker`
- `../components/UnauthorizedButton`
- `../components/UserAdminGrid`
- `../data/query-builder/fragments.json`
- `../lib/db`
- `./ActiveSchool`
- `./ChartTest`
- `./DataChart`
- `./DataTable`
- `./DataTableAgGrid`
- `./ExportChartButton`
- `./FavoriteCard`
- `./FragmentAdminGrid`
- `./GoogleSignIn`
- `./GoogleSignOut`
- `./LoginButton`
- `./ModeToggle`
- `./MultiDropdownSelector`
- `./QueryAdminGrid`
- `./QueryBar`
- `./QueryList`
- `./QueryPageClient`
- `./ReportsDropdown`
- `./SchoolEnrollmentGraph`
- `./SchoolPicker`

---

## Dependency Graph

```mermaid
graph LR
    N0[layout]
    N1[loading]
    N2[page]
    N3[page]
    N4[page]
    N5[route]
    N6[route]
    N7[route]
    N8[route]
    N9[route]
    N10[route]
    N11[layout]
    N12[page]
    N13[ActiveSchool]
    N14[AddClassToUserButton]
    N15[AdminTabs]
    N16[AggridChart]
    N17[AIQueryClient]
    N18[ApiGradeDistribution]
    N19[AuthGuard]
    N20[BackButton]
    N21[AreaChart]
    N22[AttendanceOverTime]
    N23[BarChart]
    N24[BarChartCustom]
    N25[ChartWrapper]
    N26[DiyChartBySchool]
    N27[EnrollmentByGrade]
    N28[MultiBar]
    N29[PieChart]
    N30[StackedBar]
    N31[ClassBreakdownModal]
    N32[Dashboard]
    N33[DataChart]
    N34[DataGrid]
    N35[DataTable]
    N36[DataTableAgGrid]
    N37[DataTablePagination]
    N38[DropdownSelector]
    N39[DynamicTable]
    N40[EmulationBanner]
    N41[ExportChartButton]
    N42[ExportCsvButton]
    N43[FavoriteCard]
    N44[FavoritesSectionGrid]
    N45[FavoriteStarSwitch]
    N46[AddQueryForm]
    N47[FormDialog]
    N48[FragmentAdminGrid]
    N49[GoogleAuthButton]
    N50[GoogleSignIn]
    N51[GoogleSignOut]
    N52[GradeDistribution]
    N53[IepUploadDropzone]
    N54[Interventions]
    N55[LoginButton]
    N56[MainFooter]
    N57[MainHeader]
    N58[ModeToggle]
    N59[MultiDropdownSelector]
    N60[AGGridProvider]
    N61[SessionProvider]
    N62[ThemeProvider]
    N63[QueiesSheet]
    N64[QueryAdminGrid]
    N65[QueryBar]
    N66[QueryInput]
    N67[QueryList]
    N68[RenewSchools]
    N69[ReportGrid]
    N70[ReportsDropdown]
    N71[ReportsSidebar]
    N72[SchoolAttendanceGraph]
    N73[SchoolEnrollmentGraph]
    N74[SchoolPicker]
    N75[SessionLogger]
    N76[Sidebar]
    N77[SyncGradeDistributionButton]
    N78[TeacherStudentGradesDialog]
    N79[test]
    N80[TestLogButton]
    N81[UnauthorizedButton]
    N82[UserAdminGrid]
    N83[UserMenu]
    N84[layout]
    N85[page]
    N86[layout]
    N87[page]
    N88[page]
    N89[page]
    N90[QueryPageClient]
    N91[layout]
    N92[page]
    N93[page]
    N94[ChartTest]
    N95[dynamic]
    N96[initialData]
    N97[page]
    N98[test1]
    N99[test2]
    N100[auth]
    N101[accordion]
    N102[alert]
    N103[avatar]
    N104[badge]
    N105[breadcrumb]
    N106[button]
    N107[card]
    N108[chart]
    N109[checkbox]
    N110[collapsible]
    N111[command]
    N112[dialog]
    N113[dropdown-menu]
    N114[dropzone]
    N115[form]
    N116[input]
    N117[label]
    N118[navigation-menu]
    N119[popover]
    N120[progress]
    N121[scroll-area]
    N122[select]
    N123[separator]
    N124[index]
    N125[sheet]
    N126[skeleton]
    N127[sonner]
    N128[switch]
    N129[table]
    N130[tabs]
    N131[textarea]
    N132[tooltip]
    N133[adminCheck]
    N134[aeries]
    N135[chartOptions]
    N136[db]
    N137[deleteQuery]
    N138[exportData]
    N139[fastAPI]
    N140[formActions]
    N141[fragment-service]
    N142[getActiveSchoolInfo]
    N143[getQuery]
    N144[llm-client]
    N145[prismaActions]
    N146[query-composer]
    N147[signinMiddleware]
    N148[syncGradeDistribution]
    N149[userFunctions]
    N150[utils]
    N151[xlsx]
    N152[page]
    N153[page]
    N154[next.config]
    N155[postcss.config]
    N156[check-school-frags]
    N157[inspect-queries]
    N158[list-fragments]
    N159[migrate-fragments]
    N160[query-db]
    N161[update-fragments]
    N162[tailwind.config]
    N163[test-grade-sync]
    N164[auth.d]
    N165[types]
    N166[Aeries_Database_Schema]
    N167[settings.local]
    N168[.eslintrc]
    N169[settings]
    N170[AERIES_SQL_QUERY_VUILDER_TECHNICAL_SPEC]
    N171[CLAUDE]
    N172[CLAUDE_NOTES]
    N173[components]
    N174[API_REFERENCE]
    N175[ARCHITECTURE]
    N176[CONFIGURATION]
    N177[2025-12-09]
    N178[DATABASE]
    N179[DEPENDENCIES]
    N180[.eslintrc]
    N181[ActiveSchool]
    N182[AddClassToUserButton]
    N183[AddQueryForm]
    N184[adminCheck]
    N185[AdminTabs]
    N186[aeries]
    N187[AERIES_SQL_QUERY_VUILDER_TECHNICAL_SPEC]
    N188[AggridChart]
    N189[AGGridProvider]
    N190[AIQueryClient]
    N191[ApiGradeDistribution]
    N192[AreaChart]
    N193[AttendanceOverTime]
    N194[auth]
    N195[AuthGuard]
    N196[BackButton]
    N197[badge]
    N198[bancroft-logo]
    N199[BarChart]
    N200[BarChartCustom]
    N201[breadcrumb]
    N202[chart]
    N203[chartOptions]
    N204[ChartWrapper]
    N205[check-school-frags]
    N206[ClassBreakdownModal]
    N207[CLAUDE]
    N208[CLAUDE_NOTES]
    N209[command]
    N210[components]
    N211[Dashboard]
    N212[DataChart]
    N213[DataGrid]
    N214[DataTable]
    N215[DataTableAgGrid]
    N216[DataTablePagination]
    N217[db]
    N218[deleteQuery]
    N219[dialog]
    N220[DiyChartBySchool]
    N221[dropdown-menu]
    N222[DropdownSelector]
    N223[dropzone]
    N224[DynamicTable]
    N225[elementary-homepage]
    N226[EmulationBanner]
    N227[EnrollmentByGrade]
    N228[ExportChartButton]
    N229[ExportCsvButton]
    N230[exportData]
    N231[fastAPI]
    N232[favicon]
    N233[FavoriteCard]
    N234[FavoritesSectionGrid]
    N235[form]
    N236[formActions]
    N237[FormDialog]
    N238[fragment-service]
    N239[FragmentAdminGrid]
    N240[garfield-logo]
    N241[getActiveSchoolInfo]
    N242[getQuery]
    N243[GoogleAuthButton]
    N244[GoogleSignIn]
    N245[GoogleSignOut]
    N246[GradeDistribution]
    N247[halkin-logo]
    N248[IepUploadDropzone]
    N249[index]
    N250[inspect-queries]
    N251[Interventions]
    N252[jefferson-logo]
    N253[layout]
    N254[lincoln-logo]
    N255[list-fragments]
    N256[llm-client]
    N257[loading]
    N258[LoginButton]
    N259[madison-logo]
    N260[MainFooter]
    N261[MainHeader]
    N262[mckinley-logo]
    N263[migrate-fragments]
    N264[ModeToggle]
    N265[monroe-logo]
    N266[muir-logo]
    N267[MultiBar]
    N268[MultiDropdownSelector]
    N269[package-lock]
    N270[package]
    N271[page]
    N272[PieChart]
    N273[prismaActions]
    N274[QueiesSheet]
    N275[query-composer]
    N276[query-db]
    N277[QueryAdminGrid]
    N278[QueryBar]
    N279[QueryInput]
    N280[QueryList]
    N281[QueryPageClient]
    N282[README]
    N283[RenewSchools]
    N284[ReportGrid]
    N285[ReportsDropdown]
    N286[ReportsSidebar]
    N287[roosevelt-logo]
    N288[route]
    N289[SchoolAttendanceGraph]
    N290[SchoolEnrollmentGraph]
    N291[SchoolPicker]
    N292[SessionLogger]
    N293[SessionProvider]
    N294[settings.local]
    N295[settings]
    N296[sheet]
    N297[Sidebar]
    N298[signinMiddleware]
    N299[skeleton]
    N300[slhs-logo]
    N301[slusd-logo]
    N302[slva-logo]
    N303[sonner]
    N304[StackedBar]
    N305[syncGradeDistribution]
    N306[SyncGradeDistributionButton]
    N307[TeacherStudentGradesDialog]
    N308[ThemeProvider]
    N309[tsconfig]
    N310[UnauthorizedButton]
    N311[update-fragments]
    N312[UserAdminGrid]
    N313[userFunctions]
    N314[UserMenu]
    N315[utils]
    N316[washington-logo]
    N317[xlsx]
    N318[README]
    N319[elementary-homepage]
    N320[package-lock]
    N321[package]
    N322[favicon]
    N323[bancroft-logo]
    N324[garfield-logo]
    N325[halkin-logo]
    N326[jefferson-logo]
    N327[lincoln-logo]
    N328[madison-logo]
    N329[mckinley-logo]
    N330[monroe-logo]
    N331[muir-logo]
    N332[roosevelt-logo]
    N333[slhs-logo]
    N334[slusd-logo]
    N335[slva-logo]
    N336[washington-logo]
    N337[README]
    N338[settings]
    N339[tsconfig]
```

---

## Understanding the Graph

- **Nodes** represent files in the project
- **Arrows** show import relationships (A -> B means A imports B)
- Files with many incoming arrows are core modules
- Files with many outgoing arrows are high-level orchestrators

---

*Generated by doc-agent on 2025-12-09T09:09:29.939703*