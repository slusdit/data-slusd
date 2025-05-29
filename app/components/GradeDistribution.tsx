"use client";

import { useCallback, useMemo, useState, useEffect, useRef, SetStateAction } from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  colorSchemeDarkBlue,
  SideBarDef,
  themeQuartz,
} from "ag-grid-enterprise";
import { GridApi } from "ag-grid-community"; // Import GridApi type
import { generatePaginationOptions } from "@/lib/utils";
import MultiDropdownSelector from "./MultiDropdownSelector";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { aggregateTeacherGradeSummaries } from "@/lib/syncGradeDistribution";
import SyncGradeDistributionButton from "./SyncGradeDistributionButton";
import { Separator } from "@/components/ui/separator";
import ExportChartButton from "./ExportChartButton";
import TeacherStudentGradesDialog from "./TeacherStudentGradesDialog";
import { SessionUser } from "@/auth";

const PercentCellRenderer = (props: { value: number }) => {
  const value = props.value;
  if (value === null || value === undefined) return "0%";
  return value.toFixed(0) + "%";
};

interface StudentAttributes {
  ellOptions?: string[];
  specialEdOptions?: string[];
  ardOptions?: string[];
  genderOptions?: string[];
}

interface GradeDistribution3Props {
  data: any[];
  isLoading?: boolean;
  activeSchool: string;
  user: SessionUser;
  studentAttributes?: StudentAttributes;
}

const GradeDistribution = ({
  data: initialData,
  isLoading = false,
  activeSchool,
  user,
  studentAttributes = {
    ellOptions: [],
    specialEdOptions: [],
    ardOptions: [],
    genderOptions: [],
  },
}: GradeDistribution3Props) => {

  const allTerms = [
    "PRG1",
    "GRD1",
    "PRG2",
    "GRD2",
    "SEM1",
    "PRG3",
    "GRD3",
    "PRG4",
    "GRD4",
    "SEM2",
  ];
  const acceptedSchools = initialData?.map((item) => String(item.sc)) || [];
  let defaultSchool;
  if (activeSchool) {
    if (activeSchool === "0" || !acceptedSchools.includes(activeSchool)) {
      defaultSchool = [];
    } else {
      defaultSchool = [activeSchool];
    }
  }
  const [data, setData] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCourseTitles, setSelectedCourseTitles] = useState<string[]>(
    []
  );
  const [selectedSchools, setSelectedSchools] = useState<string[]>(
    defaultSchool || []
  );
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>(["GRD3"]);
  const [selectedEll, setSelectedEll] = useState<string[]>([]);
  const [selectedSpecialEd, setSelectedSpecialEd] = useState<string[]>([]);
  const [selectedArd, setSelectedArd] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // New state variables for filtered dropdown options
  type FilteredItem = {
    id: string;
    label: string;
    logo?: string;
  };
  const [filteredSchoolItems, setFilteredSchoolItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredPeriodItems, setFilteredPeriodItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredTeacherItems, setFilteredTeacherItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredDepartmentItems, setFilteredDepartmentItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredCourseTitleItems, setFilteredCourseTitleItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredTermItems, setFilteredTermItems] = useState<FilteredItem[]>(
    []
  );
  const [filteredEllItems, setFilteredEllItems] = useState<FilteredItem[]>([]);
  const [filteredSpecialEdItems, setFilteredSpecialEdItems] = useState<
    FilteredItem[]
  >([]);
  const [filteredArdItems, setFilteredArdItems] = useState<FilteredItem[]>([]);
  const [filteredGenderItems, setFilteredGenderItems] = useState<
    FilteredItem[]
  >([]);

  const createTeacherCellRenderer = () => {
    return (props: {
      value: string | null | undefined;
      data: {
        teacherName?: string;
        sc?: string;
        tn?: string;
        department?: string;
        term?: string;
        courseTitle?: string;
      };
    }) => {
      const value = props.value;
      if (value === null || value === undefined) return "Unknown Teacher";
      return (
        <TeacherStudentGradesDialog
          teacher={props.data?.teacherName ?? ""}
          sc={props.data?.sc !== undefined ? Number(props.data.sc) : 0}
          tn={props.data?.tn ?? ""}
          department={props.data?.department ?? ""}
          term={props.data?.term}
          courseTitle={props.data?.courseTitle}
          ellStatus={selectedEll[0]}
          specialEdStatus={selectedSpecialEd[0]}
          ardStatus={selectedArd[0]}
          genderStatus={selectedGender[0]}
        >
          <span className="text-blue-500 hover:text-blue-700 hover:underline">
            {value}
          </span>
        </TeacherStudentGradesDialog>
      );
    };
  };

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
      setFilteredData(initialData);
    }
  }, [initialData]);

  const { resolvedTheme } = useTheme();
  const chartRef = useRef(null);

  const baseChartTheme = useMemo(
    () => (resolvedTheme === "dark" ? "ag-sheets-dark" : "ag-sheets"),
    [resolvedTheme]
  );

  const paginationPageSizes = useMemo(() => {
    return generatePaginationOptions(data?.length || 0);
  }, [data?.length]);

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === "dark"
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  const getTeacherNumberFromName = useCallback(
    (teacherName: string) => {
      if (!initialData || initialData.length === 0) return undefined;

      const teacher = initialData.find(
        (item) => item.teacherName === teacherName
      );
      return teacher ? teacher.tn : undefined;
    },
    [initialData]
  );

  const CustomTooltip = useCallback(
    (params: { datum: any; xKey: any; yKey: any; yName: any }) => {
      const { datum, xKey, yKey, yName } = params;

      if (!datum) return null;

      const grade = yName.replace("%", "");
      const countField = `${grade.toLowerCase()}Count`;
      const percentField = `${grade.toLowerCase()}Percent`;

      const count = datum[countField] || 0;
      const percent = datum[percentField]
        ? Number(datum[percentField]).toFixed(1)
        : "0.0";
      const totalStudents = datum.totalGrades || 0;

      return {
        title: `${datum.teacherName} - ${
          datum.courseTitle || "Unknown Course"
        }`,
        content: `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong>${grade} Grade:</strong> <span>${percent}%</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Students with ${grade}:</span> <span>${count}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Total Students:</span> <span>${totalStudents}</span>
        </div>
      `,
      };
    },
    []
  );

  const teacherItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniqueTeachers = [
      ...new Set(initialData.map((item) => item.teacherName)),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return uniqueTeachers.map((teacher) => ({
      id: teacher,
      label: teacher,
    }));
  }, [initialData]);

  const departmentItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniqueDepartments = [
      ...new Set(initialData.map((item) => item.department)),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return uniqueDepartments.map((department) => ({
      id: department,
      label: department,
    }));
  }, [initialData]);

  const periodItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniquePeriods = [...new Set(initialData.map((item) => item.period))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return uniquePeriods.map((period) => ({
      id: period,
      label: period,
    }));
  }, [initialData]);

  const schoolItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniqueSchools = [
      ...new Set(initialData.map((item) => String(item.sc))),
    ].filter(Boolean);
    const userSchools = user.UserSchool.map((school) => {
      return {
        sc: school.school.sc,
        label: school.school.name,
        logo: school.school.logo,
      };
    });
    const filteredSchools = userSchools.filter((school) => {
      return uniqueSchools.includes(school.sc);
    });
    return filteredSchools.map((school) => ({
      id: school.sc,
      label: school.label,
      logo: school.logo,
    }));
  }, [initialData, user.UserSchool]);

  const courseTitleItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniqueCourseTitles = [
      ...new Set(initialData.map((item) => item.courseTitle)),
    ]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return uniqueCourseTitles.map((courseTitle) => ({
      id: courseTitle,
      label: courseTitle,
    }));
  }, [initialData]);

  const termItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];
    const uniqueTerms = [
      ...new Set(initialData.map((item) => item.term)),
    ].filter(Boolean);
    uniqueTerms.sort((a, b) => {
      const aMatch = a.match(/(\D+)(\d+)/);
      const bMatch = b.match(/(\D+)(\d+)/);
      if (aMatch && bMatch && aMatch[1] === bMatch[1]) {
        return parseInt(aMatch[2]) - parseInt(bMatch[2]);
      }
      return a.localeCompare(b);
    });
    return uniqueTerms.map((term) => ({
      id: term,
      label: term,
    }));
  }, [initialData]);

  const ellItems = useMemo(() => {
    const options =
      studentAttributes.ellOptions && studentAttributes.ellOptions.length > 0
        ? studentAttributes.ellOptions
        : ["Y", "N"];
    return options.map((value) => ({
      id: value,
      label: value,
    }));
  }, [studentAttributes.ellOptions]);

  const specialEdItems = useMemo(() => {
    const options =
      studentAttributes.specialEdOptions &&
      studentAttributes.specialEdOptions.length > 0
        ? studentAttributes.specialEdOptions
        : ["Y", "N"];
    return options.map((value) => ({
      id: value,
      label: value,
    }));
  }, [studentAttributes.specialEdOptions]);

  const ardItems = useMemo(() => {
    const options =
      studentAttributes.ardOptions && studentAttributes.ardOptions.length > 0
        ? studentAttributes.ardOptions
        : ["Y", "N"];
    return options.map((value) => ({
      id: value,
      label: value,
    }));
  }, [studentAttributes.ardOptions]);

  const genderItems = useMemo(() => {
    const options =
      studentAttributes.genderOptions &&
      studentAttributes.genderOptions.length > 0
        ? studentAttributes.genderOptions
        : ["M", "F"];
    // FIX APPLIED: Restored labelValue function for better display in dropdown
    const labelValue = (value: string) => {
      if (["M", "F"].includes(value)) {
        return value === "M" ? "Male" : "Female";
      }
      return value;
    };
    return options.map((value) => ({
      id: value,
      label: labelValue(value),
    }));
  }, [studentAttributes.genderOptions]);

  useEffect(() => {
    setFilteredTeacherItems(teacherItems);
    setFilteredDepartmentItems(departmentItems);
    setFilteredCourseTitleItems(courseTitleItems);
    setFilteredTermItems(termItems);
    setFilteredEllItems(ellItems);
    setFilteredSpecialEdItems(specialEdItems);
    setFilteredArdItems(ardItems);
    setFilteredGenderItems(genderItems);
    setFilteredSchoolItems(schoolItems);
    setFilteredPeriodItems(periodItems);
  }, [
    teacherItems,
    departmentItems,
    courseTitleItems,
    termItems,
    ellItems,
    specialEdItems,
    ardItems,
    genderItems,
    schoolItems,
    periodItems,
  ]);

  const getFilteredDataExcluding = useCallback(
    (excludeFilter: string) => {
      let result = initialData || [];
      if (excludeFilter !== "teachers" && selectedTeachers.length > 0) {
        result = result.filter((item) =>
          selectedTeachers.includes(item.teacherName)
        );
      }
      if (excludeFilter !== "departments" && selectedDepartments.length > 0) {
        result = result.filter((item) =>
          selectedDepartments.includes(item.department)
        );
      }
      if (excludeFilter !== "courses" && selectedCourseTitles.length > 0) {
        result = result.filter((item) =>
          selectedCourseTitles.includes(item.courseTitle)
        );
      }
      if (excludeFilter !== "terms" && selectedTerms.length > 0) {
        result = result.filter((item) => selectedTerms.includes(item.term));
      }
      if (excludeFilter !== "schools" && selectedSchools.length > 0) {
        result = result.filter((item) =>
          selectedSchools.includes(String(item.sc))
        );
      }
      if (excludeFilter !== "periods" && selectedPeriods.length > 0) {
        result = result.filter((item) => selectedPeriods.includes(item.period));
      }
      if (excludeFilter !== "ell" && selectedEll.length > 0) {
        result = result.filter((item) => selectedEll.includes(item.ell));
      }
      if (excludeFilter !== "specialEd" && selectedSpecialEd.length > 0) {
        result = result.filter((item) =>
          selectedSpecialEd.includes(item.specialEd)
        );
      }
      if (excludeFilter !== "ard" && selectedArd.length > 0) {
        result = result.filter((item) => selectedArd.includes(item.ard));
      }
      if (excludeFilter !== "gender" && selectedGender.length > 0) {
        result = result.filter((item) => selectedGender.includes(item.gender));
      }
      return result;
    },
    [
      initialData,
      selectedTeachers,
      selectedDepartments,
      selectedCourseTitles,
      selectedTerms,
      selectedSchools,
      selectedPeriods,
      selectedEll,
      selectedSpecialEd,
      selectedArd,
      selectedGender,
    ]
  );

  const updateDropdownOptions = useCallback(() => {
    const teacherFilteredData = getFilteredDataExcluding("teachers");
    const departmentFilteredData = getFilteredDataExcluding("departments");
    const courseFilteredData = getFilteredDataExcluding("courses");
    const termFilteredData = getFilteredDataExcluding("terms");
    const schoolFilteredData = getFilteredDataExcluding("schools");
    const periodFilteredData = getFilteredDataExcluding("periods");

    const getUniqueItemsWithSelection = (
      data: any[],
      field: string,
      selectedValues: string[],
      allItems: FilteredItem[]
    ) => {
      const uniqueValues = [
        ...new Set(data.map((item) => String(item[field]))),
      ].filter(Boolean);
      const uniqueValuesSet = new Set(uniqueValues);
      const orderedItems = allItems.filter(
        (item) =>
          selectedValues.includes(item.id) || uniqueValuesSet.has(item.id)
      );
      return orderedItems;
    };

    setFilteredTeacherItems(
      getUniqueItemsWithSelection(
        teacherFilteredData,
        "teacherName",
        selectedTeachers,
        teacherItems
      )
    );
    setFilteredSchoolItems(
      getUniqueItemsWithSelection(
        schoolFilteredData,
        "sc",
        selectedSchools,
        schoolItems
      )
    );
    setFilteredPeriodItems(
      getUniqueItemsWithSelection(
        periodFilteredData,
        "period",
        selectedPeriods,
        periodItems
      )
    );
    setFilteredDepartmentItems(
      getUniqueItemsWithSelection(
        departmentFilteredData,
        "department",
        selectedDepartments,
        departmentItems
      )
    );
    setFilteredCourseTitleItems(
      getUniqueItemsWithSelection(
        courseFilteredData,
        "courseTitle",
        selectedCourseTitles,
        courseTitleItems
      )
    );
    setFilteredTermItems(
      getUniqueItemsWithSelection(
        termFilteredData,
        "term",
        selectedTerms,
        termItems
      )
    );

    // FIX APPLIED: Removed state setters that were causing the dropdown values to revert
    // setFilteredEllItems(ellItems);
    // setFilteredSpecialEdItems(specialEdItems);
    // setFilteredArdItems(ardItems);
    // setFilteredGenderItems(genderItems);
  }, [
    getFilteredDataExcluding,
    selectedTeachers,
    selectedDepartments,
    selectedCourseTitles,
    selectedTerms,
    selectedSchools,
    selectedPeriods,
    teacherItems,
    departmentItems,
    courseTitleItems,
    termItems,
    schoolItems,
    periodItems,
    ellItems,
    specialEdItems,
    ardItems,
    genderItems,
  ]);

  const syncDataWithFilters = useCallback(async () => {
    setIsProcessing(true);
    try {
      const filterParams = {
        term: selectedTerms.length > 0 ? selectedTerms[0] : undefined,
        teacherNumber:
          selectedTeachers.length > 0
            ? getTeacherNumberFromName(selectedTeachers[0])
            : undefined,
        departmentCode:
          selectedDepartments.length > 0 ? selectedDepartments[0] : undefined,
        sc:
          selectedSchools.length > 0 ? parseInt(selectedSchools[0]) : undefined,
        period: selectedPeriods.length > 0 ? selectedPeriods[0] : undefined,
        ellStatus: selectedEll.length > 0 ? selectedEll[0] : undefined,
        specialEdStatus:
          selectedSpecialEd.length > 0 ? selectedSpecialEd[0] : undefined,
        ardStatus: selectedArd.length > 0 ? selectedArd[0] : undefined,
        genderStatus: selectedGender.length > 0 ? selectedGender[0] : undefined,
        courseTitleStatus:
          selectedCourseTitles.length > 0 ? selectedCourseTitles[0] : undefined,
      };

      const newData = await aggregateTeacherGradeSummaries(filterParams);

      if (newData && newData.length > 0) {
        setData(newData);
        setFilteredData(newData);

        const newTeacherItems = Array.from(
          new Set(newData.map((item: { teacherName: any; }) => item.teacherName))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((teacher) => ({ id: teacher, label: teacher }));

        const newDepartmentItems = Array.from(
          new Set(newData.map((item: { department: any; }) => item.department))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((dept) => ({ id: dept, label: dept }));

        const newSchoolItems = Array.from(
          new Set(newData.map((item: { sc: any; }) => String(item.sc)))
        )
          .filter(Boolean)
          .map((school) => ({ id: school, label: school }));

        const newCourseTitleItems = Array.from(
          new Set(newData.map((item: { courseTitle: any; }) => item.courseTitle))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((course) => ({ id: course, label: course }));

        const newTermItems = Array.from(
          new Set(newData.map((item) => item.term))
        )
          .filter(Boolean)
          .sort()
          .map((term) => ({ id: term, label: term }));

        setFilteredTeacherItems(newTeacherItems);
        setFilteredDepartmentItems(newDepartmentItems);
        setFilteredSchoolItems(newSchoolItems);
        setFilteredCourseTitleItems(newCourseTitleItems);
        setFilteredTermItems(newTermItems);

        if (selectedTeachers.length > 0) {
          const validTeachers = selectedTeachers.filter((teacher) =>
            newTeacherItems.some((item) => item.id === teacher)
          );
          if (validTeachers.length !== selectedTeachers.length) {
            setSelectedTeachers(validTeachers);
          }
        }
        if (selectedDepartments.length > 0) {
          const validDepartments = selectedDepartments.filter((dept) =>
            newDepartmentItems.some((item) => item.id === dept)
          );
          if (validDepartments.length !== selectedDepartments.length) {
            setSelectedDepartments(validDepartments);
          }
        }
        if (selectedSchools.length > 0) {
          const validSchools = selectedSchools.filter((school) =>
            newSchoolItems.some((item) => item.id === school)
          );
          if (validSchools.length !== selectedSchools.length) {
            setSelectedSchools(validSchools);
          }
        }
        if (selectedCourseTitles.length > 0) {
          const validCourses = selectedCourseTitles.filter((course) =>
            newCourseTitleItems.some(
              (item) =>
                item.id.toLowerCase().trim() === course.toLowerCase().trim()
            )
          );
          if (validCourses.length !== selectedCourseTitles.length) {
            setSelectedCourseTitles(validCourses);
          }
        }
        if (selectedTerms.length > 0) {
          const validTerms = selectedTerms.filter((term) =>
            newTermItems.some((item) => item.id === term)
          );
          if (validTerms.length !== selectedTerms.length) {
            setSelectedTerms(validTerms);
          }
        }
      } else {
        setData([]);
        setFilteredData([]);
        setFilteredTeacherItems([]);
        setFilteredDepartmentItems([]);
        setFilteredSchoolItems([]);
        setFilteredCourseTitleItems([]);
        setFilteredTermItems([]);
        setSelectedTeachers([]);
        setSelectedDepartments([]);
        setSelectedSchools([]);
        setSelectedCourseTitles([]);
        setSelectedTerms([]);
      }
    } catch (error) {
      console.error("Error syncing data with filters:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    selectedTeachers,
    selectedDepartments,
    selectedCourseTitles,
    selectedTerms,
    selectedSchools,
    selectedPeriods,
    selectedEll,
    selectedSpecialEd,
    selectedArd,
    selectedGender,
    getTeacherNumberFromName,
  ]);

  // Effect to apply CLIENT-SIDE filters and update dropdowns
  useEffect(() => {
    if (!initialData || isLoading) return;

    setIsProcessing(true);
    try {
      let result = initialData;

      if (selectedTeachers.length > 0) {
        result = result.filter((item) =>
          selectedTeachers.includes(String(item.teacherName))
        );
      }
      if (selectedDepartments.length > 0) {
        result = result.filter((item) =>
          selectedDepartments.includes(item.department)
        );
      }
      if (selectedCourseTitles.length > 0) {
        result = result.filter((item) =>
          selectedCourseTitles.includes(item.courseTitle)
        );
      }
      if (selectedTerms.length > 0) {
        result = result.filter((item) => selectedTerms.includes(item.term));
      }
      if (selectedSchools.length > 0) {
        result = result.filter((item) =>
          selectedSchools.includes(item.sc.toString())
        );
      }
      if (selectedPeriods.length > 0) {
        result = result.filter((item) => selectedPeriods.includes(item.period));
      }

      // FIX APPLIED: Removed client-side filtering logic for demographic filters
      // to prevent race condition with server-side sync. The hook below will handle this.

      setData(result);
      setFilteredData(result);
      updateDropdownOptions();
    } catch (error) {
      console.error("Error filtering data:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    selectedTeachers,
    selectedDepartments,
    selectedCourseTitles,
    selectedTerms,
    selectedSchools,
    selectedPeriods,
    // Note: selectedEll, selectedSpecialEd, selectedArd, selectedGender are removed from this hook's dependency array
    // to avoid re-running it unnecessarily. The server-sync hook below is the authority for these filters.
    initialData,
    isLoading,
    updateDropdownOptions,
  ]);

  // Effect to trigger SERVER-SIDE sync for demographic filters
  useEffect(() => {
    // This check prevents an unnecessary API call on initial load if no demographic filters are pre-selected.
    if (
      selectedEll.length > 0 ||
      selectedSpecialEd.length > 0 ||
      selectedArd.length > 0 ||
      selectedGender.length > 0
    ) {
      syncDataWithFilters();
    }
  }, [
    selectedEll,
    selectedSpecialEd,
    selectedArd,
    selectedGender,
    syncDataWithFilters,
  ]);

  const exportToCSV = useCallback(() => {
    if (!gridApi) return;
    setIsProcessing(true);
    try {
      const exportParams = {
        skipHeader: false,
        suppressQuotes: true,
        columnSeparator: ",",
        onlyFilteredAndSortedData: true,
        processCellCallback: (params) => {
          if (params.value === null || params.value === undefined) return "";
          if (
            params.column.colDef.headerName &&
            (params.column.colDef.headerName.includes("%") ||
              [
                "aPercent",
                "bPercent",
                "cPercent",
                "dPercent",
                "fPercent",
                "otherPercent",
              ].includes(params.column.colDef.field))
          ) {
            return Number(params.value).toFixed(1);
          }
          if (typeof params.value === "number") return params.value;
          return params.value.toString();
        },
        fileName: `Grade_Distribution_${
          new Date().toISOString().split("T")[0]
        }.csv`,
      };
      gridApi.exportDataAsCsv(exportParams);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [gridApi]);

  const columnDefs = useMemo(
    () => [
      {
        field: "sc",
        headerName: "School",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 2,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "tn",
        headerName: "Teacher Number",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 2,
        pivot: true,
        enableRowGroup: true,
        hide: true,
      },
      {
        field: "teacherName",
        headerName: "Teacher",
        cellRenderer: createTeacherCellRenderer(),
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 2,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "department",
        headerName: "Department",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "term",
        headerName: "Term",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "courseTitle",
        headerName: "Course",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1.5,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "aPercent",
        headerName: "A%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) =>
          params.value ? params.value.toFixed(1) : "",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "bPercent",
        headerName: "B%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) =>
          params.value ? params.value.toFixed(1) : "",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "cPercent",
        headerName: "C%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) =>
          params.value ? params.value.toFixed(1) : "",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "dPercent",
        headerName: "D%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) =>
          params.value ? params.value.toFixed(1) : "",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "fPercent",
        headerName: "F%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) =>
          params.value ? params.value.toFixed(1) : "",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "otherPercent",
        headerName: "Other %",
        type: "numericColumn",
        cellRenderer: (props) => `${props.value ? props.value.toFixed(1) : 0}%`,
        filter: "agNumberColumnFilter",
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "totalGrades",
        headerName: "Total",
        type: "numericColumn",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
    ],
    [selectedEll, selectedSpecialEd, selectedArd, selectedGender]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 100,
    }),
    []
  );
  const onGridSizeChanged = useCallback((params) => {
    const gridWidth = document.querySelector(".ag-center-cols")?.clientWidth;
    if (gridWidth) {
      params.api.sizeColumnsToFit();
    }
  }, []);
  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gridApi]);

  const resetFilters = useCallback(() => {
    setIsProcessing(true);
    try {
      setSelectedTeachers([]);
      setSelectedDepartments([]);
      setSelectedCourseTitles([]);
      setSelectedTerms([]);
      setSelectedEll([]);
      setSelectedSpecialEd([]);
      setSelectedArd([]);
      setSelectedGender([]);
      setSelectedSchools([]);
      setSelectedPeriods([]);
      setFilteredData(initialData || []);
      setFilteredTeacherItems(teacherItems);
      setFilteredDepartmentItems(departmentItems);
      setFilteredCourseTitleItems(courseTitleItems);
      setFilteredTermItems(termItems);
      setFilteredEllItems(ellItems);
      setFilteredSpecialEdItems(specialEdItems);
      setFilteredArdItems(ardItems);
      setFilteredGenderItems(genderItems);
      setFilteredSchoolItems(schoolItems);
      setFilteredPeriodItems(periodItems);

      aggregateTeacherGradeSummaries({
        setData: (newData: any[]) => {
          setData(newData);
          setFilteredData(newData);
        },
      });

      if (gridApi) {
        gridApi.setFilterModel(null);
      }
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.updateData(initialData || []);
      }
    } catch (error) {
      console.error("Error resetting filters:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    gridApi,
    initialData,
    teacherItems,
    departmentItems,
    courseTitleItems,
    termItems,
    ellItems,
    specialEdItems,
    ardItems,
    genderItems,
    schoolItems,
    periodItems,
  ]);

  const showLoading = isLoading || isProcessing;

  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading data...</p>
      </div>
    </div>
  );

  const chartOptions = useMemo(
    () => ({
      title: {
        text: `Grade Distribution by Teacher${
          selectedDepartments.length === 1
            ? ` - ${selectedDepartments[0]}`
            : selectedDepartments.length > 1
            ? ` - Multiple Departments`
            : ""
        }${
          selectedCourseTitles.length === 1
            ? ` for ${selectedCourseTitles[0]}`
            : selectedCourseTitles.length > 1
            ? ` for Multiple Courses`
            : ""
        }${
          selectedTerms.length === 1
            ? ` (${selectedTerms[0]})`
            : selectedTerms.length > 1
            ? ` (Multiple Terms)`
            : ""
        }${
          selectedEll.length > 0 ||
          selectedSpecialEd.length > 0 ||
          selectedArd.length > 0 ||
          selectedGender.length > 0
            ? " " +
              [
                selectedEll.length > 0 ? `ELL: ${selectedEll.join(", ")}` : "",
                selectedSpecialEd.length > 0
                  ? `SpEd: ${selectedSpecialEd.join(", ")}`
                  : "",
                selectedArd.length > 0 ? `Race: ${selectedArd.join(", ")}` : "",
                selectedGender.length > 0
                  ? `Gender: ${
                      selectedGender.includes("M")
                        ? "Male"
                        : selectedGender.includes("F")
                        ? "Female"
                        : "Other"
                    }`
                  : "",
              ]
                .filter(Boolean)
                .join(" / ") +
              " "
            : ""
        }`,
      },
      data: data,
      theme: {
        baseTheme: baseChartTheme,
        palette: {
          fills: [
            "#7F8C8D",
            "#C0392B",
            "#E67E22",
            "#F4D03F",
            "#5DADE2",
            "#2E86C1",
          ],
          strokes: ["gray"],
        },
      },
      series: [
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "otherPercent",
          yName: "Other%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "fPercent",
          yName: "F%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "dPercent",
          yName: "D%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "cPercent",
          yName: "C%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "bPercent",
          yName: "B%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "aPercent",
          yName: "A%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
      ],
      axes: [
        { type: "category", position: "bottom", label: { rotation: 45 } },
        {
          type: "number",
          position: "left",
          title: { text: "Grade Distribution (%)" },
          min: 0,
          max: 100,
        },
      ],
      legend: { position: "bottom", spacing: 40 },
      padding: { top: 10, right: 20, bottom: 40, left: 40 },
    }),
    [
      data,
      baseChartTheme,
      selectedDepartments,
      selectedCourseTitles,
      selectedTerms,
      selectedEll,
      selectedSpecialEd,
      selectedArd,
      selectedGender,
      CustomTooltip,
    ]
  );

  const updateChartData = useCallback((params) => {
    const sortedData: SetStateAction<any[]> = [];
    params.api.forEachNodeAfterFilterAndSort((node: { data: any; }) => {
      sortedData.push(node.data);
    });
    setFilteredData(sortedData);
  }, []);

  const onFilterChanged = useCallback(
    (params: any) => {
      updateChartData(params);
    },
    [updateChartData]
  );
  const onSortChanged = useCallback(
    (params: any) => {
      updateChartData(params);
    },
    [updateChartData]
  );

  return (
    <div className="w-full space-y-4 relative">
      {showLoading && <LoadingOverlay />}
      {user.admin && <SyncGradeDistributionButton />}

      <Card>
        <CardHeader>{/* <CardTitle>Filters</CardTitle> */}</CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <>
              <h1 className="mb-2 -mt-6 font-bold font underline w-full text-center">
                School Filters
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-center">
                <div className="col-span-2">
                  <MultiDropdownSelector
                    items={filteredTermItems}
                    values={selectedTerms}
                    onChange={setSelectedTerms}
                    placeholder="Select terms"
                    label="Terms"
                    // width="w-1/2"
                    disabled={showLoading}
                    maxDisplayItems={1}
                    singleSelect={true}
                    itemOrder={allTerms}
                    classNameVar={
                      selectedTerms.length === 0
                        ? "outline outline-red-600 rounded-md"
                        : ""
                    }
                  />
                </div>

                <div className="col-span-5">
                  <MultiDropdownSelector
                    items={schoolItems}
                    values={selectedSchools}
                    onChange={setSelectedSchools}
                    placeholder="Select schools"
                    label="Schools"
                    // width="w-2/3"
                    disabled={showLoading}
                    maxDisplayItems={2}
                    schoolValues={user.UserSchool}
                  />
                </div>
                  <div className="col-span-5">
                    <MultiDropdownSelector
                  items={filteredDepartmentItems}
                  values={selectedDepartments}
                  onChange={setSelectedDepartments}
                  placeholder="Select departments"
                  label="Departments"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={3}
                />
                  
                </div>
              </div>
              <Separator className="my-4" />
              <h1 className="mb-2 font-bold underline w-full text-center">
                Course and Teacher Filters
              </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <MultiDropdownSelector
                    items={filteredCourseTitleItems}
                    values={selectedCourseTitles}
                    onChange={setSelectedCourseTitles}
                    placeholder="Select Courses"
                    label="Courses"
                    width="w-full"
                    disabled={showLoading}
                    maxDisplayItems={3}
                    classNameVar={
                      selectedCourseTitles.length === 0
                        ? "outline outline-red-600 rounded-md"
                        : ""
                    }
                  />
                <MultiDropdownSelector
                  items={filteredTeacherItems}
                  values={selectedTeachers}
                  onChange={setSelectedTeachers}
                  placeholder="Select teachers"
                  label="Teachers"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={5}
                />
                
              </div>
              <Separator className="my-4" />
              <h1 className="mb-2 font-bold underline w-full text-center">
                Student Filters
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <MultiDropdownSelector
                  items={filteredGenderItems}
                  values={selectedGender}
                  onChange={setSelectedGender}
                  placeholder="Select Gender"
                  label="Gender"
                  width="w-full"
                  singleSelect={true}
                  disabled={showLoading || filteredGenderItems.length === 0}
                  maxDisplayItems={1}
                />
                <MultiDropdownSelector
                  items={filteredEllItems}
                  values={selectedEll}
                  onChange={setSelectedEll}
                  placeholder="Select ELL status"
                  label="ELL Status"
                  width="w-full"
                  singleSelect={true}
                  disabled={showLoading || filteredEllItems.length === 0}
                  maxDisplayItems={1}
                />
                <MultiDropdownSelector
                  items={filteredSpecialEdItems}
                  values={selectedSpecialEd}
                  onChange={setSelectedSpecialEd}
                  placeholder="Select Special Ed status"
                  label="Special Ed Status"
                  width="w-full"
                  singleSelect={true}
                  disabled={showLoading || filteredSpecialEdItems.length === 0}
                  maxDisplayItems={1}
                />
                <MultiDropdownSelector
                  items={filteredArdItems}
                  values={selectedArd}
                  onChange={setSelectedArd}
                  placeholder="Select Race / Ethnicity"
                  label="Race / Ethnicity"
                  width="w-full"
                  singleSelect={true}
                  disabled={showLoading || filteredArdItems.length === 0}
                  maxDisplayItems={1}
                />
              </div>
              <Separator className="my-4" />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="ml-auto">
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="ml-2"
                    disabled={showLoading}
                  >
                    {showLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Filters"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {selectedTerms.length > 0 && selectedCourseTitles.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution Chart</CardTitle>
              <div className="flex items-center mb-4 w-full items-right">
                <ExportChartButton
                  chartRef={chartRef}
                  filename={`grade distribution${
                    selectedCourseTitles.length > 0 ? " - " : ""
                  }${selectedCourseTitles.join("-")} - ${
                    selectedTerms.join("-") || "all"
                  }`}
                  disabled={showLoading || !filteredData.length}
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Skeleton className="h-[250px] w-full" />
                </div>
              ) : (
                <div className="h-[500px] relative">
                  <AgCharts
                    options={chartOptions}
                    ref={chartRef}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution Data</CardTitle>
              <div className="flex justify-between items-center">
                <Button
                  onClick={exportToCSV}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={showLoading || !data?.length}
                >
                  {showLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    "Export to CSV"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[600px] w-full">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <div className="h-[600px] w-full relative">
                  <AgGridReact
                    theme={gridThemeClass}
                    rowData={filteredData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    onGridSizeChanged={onGridSizeChanged}
                    onFilterChanged={onFilterChanged}
                    onSortChanged={onSortChanged}
                    animateRows={true}
                    pagination={false}
                    paginationPageSizeSelector={paginationPageSizes}
                    paginationPageSize={data?.length > 20 ? data.length : 20}
                    enableCharts={true}
                    cellSelection={true}
                    pivotMode={false}
                    pivotPanelShow="onlyWhenPivoting"
                    loadingOverlayComponent="Loading..."
                    loadingOverlayComponentParams={{
                      loadingMessage: "Loading data...",
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Please Select a Term and at least one Course to show data
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default GradeDistribution;
