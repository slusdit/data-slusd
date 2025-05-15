"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import TeacherGradesDialog from "./TeacherGradesDialog";
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
// Import the aggregateTeacherGradeSummaries function
import { aggregateTeacherGradeSummaries } from "@/lib/syncGradeDistribution";
import SyncGradeDistributionButton from "./SyncGradeDistributionButton";
import { Separator } from "@/components/ui/separator";
import { aggregationFns } from "@tanstack/react-table";
import { set } from "zod";
import ExportChartButton from "./ExportChartButton";
import TeacherStudentGradesDialog from "./TeacherStudentGradesDialog";
import ExportCsvButton from "./ExportCsvButton";
import { User } from "@prisma/client";
import { SessionUser } from "@/auth";
import { log } from "console";

const PercentCellRenderer = (props) => {
  const value = props.value;
  if (value === null || value === undefined) return "0%";
  return value.toFixed(0) + "%";
  return (
    <TeacherGradesDialog
      teacher={props.data?.teacherName || ""}
      sc={props.data?.sc || ""}
      tn={props.data?.tn || ""}
      department={props.data?.department || ""}
      params={props}
      colField={props.colDef.field}
    >
      {value.toFixed(1)}%
    </TeacherGradesDialog>
  );
};

interface StudentAttributes {
  ellOptions?: string[];
  specialEdOptions?: string[];
  ardOptions?: string[];
}

interface GradeDistribution2Props {
  data: any[];
  isLoading?: boolean;
  activeSchool: string;
  user: SessionUser;
  studentAttributes?: StudentAttributes;
}

const GradeDistribution2 = ({
  data: initialData,
  isLoading = false,
  activeSchool,
  user,
  studentAttributes = {
    ellOptions: [],
    specialEdOptions: [],
    ardOptions: [],
  },
}: GradeDistribution2Props) => {
  // console.log("Active School:", activeSchool);
  // console.log("User:", user);
  const availibleSchools =
    user.UserSchool?.map(
      (school: {
        school: { id: string; sc: string; name: string; logo: string };
      }) => school.school.sc
    ) || [];
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
  // console.log("Available Schools:", availibleSchools);
  // console.log("Accepted Schools:", acceptedSchools);
  // console.log("School Check", !acceptedSchools.includes(availibleSchools));
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
  const [selectedSchools, setSelectedSchools] =
    useState<string[]>(defaultSchool);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>(["GRD3"]);
  const [selectedEll, setSelectedEll] = useState<string[]>([]);
  const [selectedSpecialEd, setSelectedSpecialEd] = useState<string[]>([]);
  const [selectedArd, setSelectedArd] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // New state variables for filtered dropdown options
  type FilteredItem = {
    id: string;
    label: string;
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
  const createTeacherCellRenderer = () => {
    return (props) => {
      const value = props.value;
      if (value === null || value === undefined) return "Unknown Teacher";

      return (
        <TeacherStudentGradesDialog
          teacher={props.data?.teacherName}
          sc={props.data?.sc}
          tn={props.data?.tn}
          department={props.data?.department}
          term={props.data?.term}
          courseTitle={props.data?.courseTitle}
          ellStatus={selectedEll[0]}
          specialEdStatus={selectedSpecialEd[0]}
          ardStatus={selectedArd[0]}
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

  // Generate pagination options based on total data size
  const paginationPageSizes = useMemo(() => {
    return generatePaginationOptions(data?.length || 0);
  }, [data?.length]);

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === "dark"
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  // Helper function to get teacher number from teacher name
  const getTeacherNumberFromName = useCallback(
    (teacherName) => {
      if (!initialData || initialData.length === 0) return undefined;

      const teacher = initialData.find(
        (item) => item.teacherName === teacherName
      );
      return teacher ? teacher.tn : undefined;
    },
    [initialData]
  );

  // Custom tooltip for enhanced chart tooltips
  const CustomTooltip = useCallback((params) => {
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

    // Create the HTML content
    return {
      title: `${datum.teacherName} - ${datum.courseTitle || "Unknown Course"}`,
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
  }, []);

  // Teacher, department, course, and term items derivation
  const teacherItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];

    // Get unique teachers sorted alphabetically
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

    // Get unique departments sorted alphabetically
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

    // Get unique periods sorted alphabetically
    const uniquePeriods = [...new Set(initialData.map((item) => item.period))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return uniquePeriods.map((period) => ({
      id: period,
      label: period,
    }));
  }, [initialData]);
  console.log("UserSchool", user.UserSchool);
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
      }
    });
    console.log("schools2", userSchools)
    return uniqueSchools.map((school) => ({
      id: school,
      label: school,
    }));
  }, [initialData]);

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

  // Initialize filtered dropdown options with full lists
  useEffect(() => {
    setFilteredTeacherItems(teacherItems);
    setFilteredDepartmentItems(departmentItems);
    setFilteredCourseTitleItems(courseTitleItems);
    setFilteredTermItems(termItems);
    setFilteredEllItems(ellItems);
    setFilteredSpecialEdItems(specialEdItems);
    setFilteredArdItems(ardItems);
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
    schoolItems,
    periodItems,
  ]);

  // Helper function to get filtered data excluding a specific filter
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
    ]
  );

  // Helper function to update dropdown options based on filtered data
  const updateDropdownOptions = useCallback(() => {
    // Get filtered data excluding each respective filter
    const teacherFilteredData = getFilteredDataExcluding("teachers");
    const departmentFilteredData = getFilteredDataExcluding("departments");
    const courseFilteredData = getFilteredDataExcluding("courses");
    const termFilteredData = getFilteredDataExcluding("terms");
    const schoolFilteredData = getFilteredDataExcluding("schools");
    const periodFilteredData = getFilteredDataExcluding("periods");
    const ellFilteredData = getFilteredDataExcluding("ell");
    const specialEdFilteredData = getFilteredDataExcluding("specialEd");
    const ardFilteredData = getFilteredDataExcluding("ard");
    console.log("Terms:", termFilteredData);
    // Helper to get unique items and ensure selected values remain in the list
    const getUniqueItemsWithSelection = (
      data: any[],
      field: string,
      selectedValues: string[],
      allItems: { id: string; label: string }[]
    ) => {
      // Get unique values from filtered data
      const uniqueValues = [
        ...new Set(data.map((item) => String(item[field]))),
      ].filter(Boolean);

      // Create set for faster lookups
      const uniqueValuesSet = new Set(uniqueValues);

      // First prioritize keeping selected values that exist
      const orderedItems = allItems.filter(
        (item) =>
          selectedValues.includes(item.id) || uniqueValuesSet.has(item.id)
      );

      return orderedItems;
    };

    // Update all dropdown options
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

    // Keep the original behavior for the Y/N fields as in your original example
    // by not applying filtering to these fields
    setFilteredEllItems(ellItems);
    setFilteredSpecialEdItems(specialEdItems);
    setFilteredArdItems(ardItems);
  }, [
    getFilteredDataExcluding,
    // selectedTeachers,
    // selectedDepartments,
    // selectedCourseTitles,
    // selectedTerms,
    // selectedSchools,
    // selectedPeriods,
    // selectedEll,
    // selectedSpecialEd,
    // selectedArd,
    // teacherItems,
    // departmentItems,
    // courseTitleItems,
    // termItems,
    // schoolItems,
    // periodItems,
    // ellItems,
    // specialEdItems,
    // ardItems,
  ]);
  console.log("Selected Course Titles:", selectedCourseTitles);
  // Fetch and update data based on filters, especially ELL filter
  const syncDataWithFilters = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Create filter parameters for aggregateTeacherGradeSummaries
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
        courseTitleStatus:
          selectedCourseTitles.length > 0 ? selectedCourseTitles[0] : undefined,
      };
      console.log("Selected ARD", selectedArd);
      console.log("Filter Parameters:", filterParams);

      // Call the server function and get the returned data
      const newData = await aggregateTeacherGradeSummaries(filterParams);

      // Update state with the returned data
      if (newData && newData.length > 0) {
        setData(newData);
        setFilteredData(newData);

        // Rebuild dropdown items from the NEW data
        // Generate new items for each dropdown
        const newTeacherItems = Array.from(
          new Set(newData.map((item) => item.teacherName))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((teacher) => ({
            id: teacher,
            label: teacher,
          }));

        const newDepartmentItems = Array.from(
          new Set(newData.map((item) => item.department))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((dept) => ({
            id: dept,
            label: dept,
          }));

        const newSchoolItems = Array.from(
          new Set(newData.map((item) => String(item.sc)))
        )
          .filter(Boolean)
          .map((school) => ({
            id: school,
            label: school,
          }));

        const newCourseTitleItems = Array.from(
          new Set(newData.map((item) => item.courseTitle))
        )
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
          .map((course) => ({
            id: course,
            label: course,
          }));

        const newTermItems = Array.from(
          new Set(newData.map((item) => item.term))
        )
          .filter(Boolean)
          .sort()
          .map((term) => ({
            id: term,
            label: term,
          }));

        // Update dropdown options
        setFilteredTeacherItems(newTeacherItems);
        setFilteredDepartmentItems(newDepartmentItems);
        setFilteredSchoolItems(newSchoolItems);
        setFilteredCourseTitleItems(newCourseTitleItems);
        setFilteredTermItems(newTermItems);

        // Keep the current selected values (important!)
        // But only if they still exist in the new data
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
        // Handle empty data
        setData([]);
        setFilteredData([]);
        // Clear dropdown options but keep ELL items
        setFilteredTeacherItems([]);
        setFilteredDepartmentItems([]);
        setFilteredSchoolItems([]);
        setFilteredCourseTitleItems([]);
        setFilteredTermItems([]);
        // Clear selections except ELL
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
    getTeacherNumberFromName,
  ]);

  // Effect to apply filters and update data
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

      // When ELL filter changes, we want to trigger server-side filtering
      if (selectedEll.length > 0) {
        // First apply client-side filtering
        result = result.filter((item) => selectedEll.includes(item.ell));

        // Then trigger server-side data refresh with current filters
        syncDataWithFilters();
      }

      if (selectedSpecialEd.length > 0) {
        result = result.filter((item) =>
          selectedSpecialEd.includes(item.specialEd)
        );
      }

      if (selectedArd.length > 0) {
        result = result.filter((item) => selectedArd.includes(item.ard));
      }

      // Update filtered data
      setData(result);
      setFilteredData(result);

      // Update dropdown options based on current filters
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
    selectedEll,
    selectedSpecialEd,
    selectedArd,
    initialData,
    gridApi,
    isLoading,
    getTeacherNumberFromName,
    updateDropdownOptions,
    syncDataWithFilters,
  ]);

  // Watch for specific ELL filter changes and trigger server-side refresh
  useEffect(() => {
    if (
      selectedEll.length > 0 ||
      selectedSpecialEd.length > 0 ||
      selectedArd.length > 0
    ) {
      // console.log("Special Ed",selectedSpecialEd)
      syncDataWithFilters();
    }
  }, [selectedEll, selectedSpecialEd, selectedArd, syncDataWithFilters]);

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
          // Handle null or undefined values
          if (params.value === null || params.value === undefined) return "";

          // Format percentages to 1 decimal place
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

          // Return numbers as is
          if (typeof params.value === "number") return params.value;

          // Convert other values to string
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

  // Updated column definitions to match your data structure
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
      // {
      //   field: "period",
      //   headerName: "Period",
      //   sortable: true,
      //   filter: true,
      //   floatingFilter: true,
      //   flex: 1,
      //   pivot: true,
      //   enableRowGroup: true,
      // },
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
    [selectedEll, selectedSpecialEd, selectedArd]
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
      // Reset selected values
      setSelectedTeachers([]);
      setSelectedDepartments([]);
      setSelectedCourseTitles([]);
      setSelectedTerms([]);
      setSelectedEll([]);
      setSelectedSpecialEd([]);
      setSelectedArd([]);
      setSelectedSchools([]);
      setSelectedPeriods([]);

      // Reset filtered data to show all records
      setFilteredData(initialData || []);

      // Reset filtered dropdown options to show all available options
      setFilteredTeacherItems(teacherItems);
      setFilteredDepartmentItems(departmentItems);
      setFilteredCourseTitleItems(courseTitleItems);
      setFilteredTermItems(termItems);
      setFilteredEllItems(ellItems);
      setFilteredSpecialEdItems(specialEdItems);
      setFilteredArdItems(ardItems);
      setFilteredSchoolItems(schoolItems);
      setFilteredPeriodItems(periodItems);

      // Run the aggregation with no filters when resetting
      aggregateTeacherGradeSummaries({
        setData: (newData: any[]) => {
          setData(newData);
          setFilteredData(newData);
        },
      });

      // Also reset the grid filters if the grid API is available
      if (gridApi) {
        gridApi.setFilterModel(null);
      }

      // Update chart if reference exists
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
    schoolItems,
    periodItems,
  ]);

  // Determine if we should show loading state
  const showLoading = isLoading || isProcessing;

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading data...</p>
      </div>
    </div>
  );

  // Initial aggregation on component mount
  useEffect(() => {
    if (initialData && initialData.length > 0 && !isLoading) {
      aggregateTeacherGradeSummaries({
        setData: (newData: any[]) => {
          if (newData && newData.length > 0) {
            setData(newData);
            setFilteredData(newData);
          }
        },
      });
    }
  }, [initialData, isLoading]);

  // Chart options
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
          selectedArd.length > 0
            ? " [" +
              [
                selectedEll.length > 0 ? "ELL" : "",
                selectedSpecialEd.length > 0 ? "SpecialEd" : "",
                selectedArd.length > 0 ? "ARD" : "",
              ]
                .filter(Boolean)
                .join("/") +
              " Students]"
            : ""
        }`,
      },
      data: data,
      theme: {
        baseTheme: baseChartTheme,
        palette: {
          fills: [
            "#2E86C1", // A - Blue
            "#5DADE2", // B - Light Blue
            "#F4D03F", // C - Yellow
            "#E67E22", // D - Orange
            "#C0392B", // F - Red
            "#7F8C8D", // Other - Gray
          ],
          strokes: ["gray"],
        },
      },
      series: [
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "aPercent",
          yName: "A%",
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
          yKey: "cPercent",
          yName: "C%",
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
          yKey: "fPercent",
          yName: "F%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "otherPercent",
          yName: "Other%",
          stacked: true,
          tooltip: { renderer: CustomTooltip },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          label: {
            rotation: 45,
          },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Grade Distribution (%)" },
          min: 0,
          max: 100,
        },
      ],
      legend: {
        position: "bottom",
        spacing: 40,
      },
      padding: {
        top: 10,
        right: 20,
        bottom: 40,
        left: 40,
      },
      // navigator: {
      //   enabled: filteredData.length > 10,
      //   height: 30,
      //   min: 0,
      //   max: 1,
      // },
    }),
    [
      filteredData,
      baseChartTheme,
      selectedDepartments,
      selectedCourseTitles,
      selectedTerms,
      selectedEll,
      selectedSpecialEd,
      selectedArd,
      CustomTooltip,
    ]
  );

  const updateChartData = useCallback(
    (params) => {
      setIsProcessing(true);
      try {
        const sortedData = [];
        params.api.forEachNodeAfterFilterAndSort((node) => {
          sortedData.push(node.data);
        });

        // Update the chart data when grid filters change
        setFilteredData(sortedData);

        // Update dropdown options based on grid filters
        // This ensures the dropdowns stay in sync with grid filters
        updateDropdownOptions();

        // Create title sections for each filter type
        const departmentSection =
          selectedDepartments.length === 1
            ? ` - ${selectedDepartments[0]}`
            : selectedDepartments.length > 1
            ? ` - Multiple Departments`
            : "";

        const termSection =
          selectedTerms.length === 1
            ? ` (${selectedTerms[0]})`
            : selectedTerms.length > 1
            ? ` (Multiple Terms)`
            : "";

        const studentFilters = [];
        if (selectedEll.length > 0) studentFilters.push("ELL");
        if (selectedSpecialEd.length > 0) studentFilters.push("SpecialEd");
        if (selectedArd.length > 0) studentFilters.push("ARD");

        const studentSection =
          studentFilters.length > 0
            ? ` [${studentFilters.join("/")} Students]`
            : "";

        // Update the chart options to ensure it refreshes
        const updatedOptions = {
          ...chartOptions,
          data: sortedData,
          title: {
            text: `Grade Distribution by Teacher${departmentSection}${termSection}${studentSection}`,
          },
        };

        // Force chart update by temporarily setting to null and then to new data
        if (chartRef.current && chartRef.current.chart) {
          chartRef.current.chart.updateData(sortedData);
        }
      } catch (error) {
        console.error("Error updating chart data:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      chartOptions,
      selectedDepartments,
      selectedTerms,
      selectedTeachers,
      selectedCourseTitles,
      selectedSchools,
      selectedPeriods,
      selectedEll,
      selectedSpecialEd,
      selectedArd,
      updateDropdownOptions,
    ]
  );

  const onFilterChanged = useCallback(
    (params) => {
      updateChartData(params);

      // Run the aggregation with grid filters
      // This captures filters applied directly in the grid
      try {
        const model = params.api.getFilterModel();
        const filterProps = {
          setData: (newData: any[]) => {
            setData(newData);
            setFilteredData(newData);
          },
        };

        if (model.teacherName) {
          // For complex grid filter models, we may need to extract values differently
          const teacherNames =
            model.teacherName.values ||
            (model.teacherName.filter ? [model.teacherName.filter] : []);

          if (teacherNames.length > 0) {
            filterProps.teacherNumber = getTeacherNumberFromName(
              teacherNames[0]
            );
          }
        }

        if (model.department) {
          const departments =
            model.department.values ||
            (model.department.filter ? [model.department.filter] : []);

          if (departments.length > 0) {
            filterProps.departmentCode = departments[0];
          }
        }

        if (model.term) {
          const terms =
            model.term.values || (model.term.filter ? [model.term.filter] : []);

          if (terms.length > 0) {
            filterProps.term = terms[0];
          }
        }

        if (model.sc) {
          const schools =
            model.sc.values || (model.sc.filter ? [model.sc.filter] : []);

          if (schools.length > 0) {
            filterProps.sc = parseInt(schools[0]);
          }
        }

        if (model.period) {
          const periods =
            model.period.values ||
            (model.period.filter ? [model.period.filter] : []);

          if (periods.length > 0) {
            filterProps.period = periods[0];
          }
        }

        if (model.ell) {
          const ellValues =
            model.ell.values || (model.ell.filter ? [model.ell.filter] : []);

          if (ellValues.length > 0) {
            filterProps.ellStatus = ellValues[0];
          }
        }

        if (model.specialEd) {
          const specialEdValues =
            model.specialEd.values ||
            (model.specialEd.filter ? [model.specialEd.filter] : []);

          if (specialEdValues.length > 0) {
            filterProps.specialEdStatus = specialEdValues[0];
          }
        }

        if (model.ard) {
          const ardValues =
            model.ard.values || (model.ard.filter ? [model.ard.filter] : []);

          if (ardValues.length > 0) {
            filterProps.ard = ardValues[0];
          }
        }

        aggregateTeacherGradeSummaries({ ...filterProps });
      } catch (error) {
        console.error("Error aggregating based on grid filters:", error);
      }
    },
    [updateChartData, getTeacherNumberFromName]
  );

  const onSortChanged = useCallback(
    (params) => {
      updateChartData(params);
    },
    [updateChartData]
  );

  console.log("selectedTerms", selectedTerms);
  console.log("selectedSchools", selectedSchools);
  return (
    <div className="w-full space-y-4 relative">
      {showLoading && <LoadingOverlay />}
      {user.admin && <SyncGradeDistributionButton />}

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <MultiDropdownSelector
                  items={filteredTermItems}
                  values={selectedTerms}
                  onChange={setSelectedTerms}
                  placeholder="Select terms"
                  label="Terms"
                  width="w-full"
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
                <MultiDropdownSelector
                  items={filteredSchoolItems}
                  values={selectedSchools}
                  onChange={setSelectedSchools}
                  placeholder="Select schools"
                  label="Schools"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={2}
                  // defaultValues={defaultSchool}
                  schoolValues={user.UserSchools}
                />
                <MultiDropdownSelector
                  items={filteredCourseTitleItems}
                  values={selectedCourseTitles}
                  onChange={setSelectedCourseTitles}
                  placeholder="Select Courses"
                  label="Courses"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={1}
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <MultiDropdownSelector
                  items={filteredTeacherItems}
                  values={selectedTeachers}
                  onChange={setSelectedTeachers}
                  placeholder="Select teachers"
                  label="Teachers"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={2}
                />
                <MultiDropdownSelector
                  items={filteredDepartmentItems}
                  values={selectedDepartments}
                  onChange={setSelectedDepartments}
                  placeholder="Select departments"
                  label="Departments"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={1}
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
      {selectedTerms.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution Chart</CardTitle>
              <div className="">
                {selectedTeachers.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Teachers:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTeachers.map((teacherId) => {
                        const teacher = teacherItems.find(
                          (t) => t.id === teacherId
                        );
                        return (
                          <Badge
                            key={teacherId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {teacher?.label || teacherId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedDepartments.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Departments:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedDepartments.map((deptId) => {
                        const dept = departmentItems.find(
                          (d) => d.id === deptId
                        );
                        return (
                          <Badge
                            key={deptId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {dept?.label || deptId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedCourseTitles.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Courses:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCourseTitles.map((courseId) => {
                        const course = courseTitleItems.find(
                          (c) => c.id === courseId
                        );
                        return (
                          <Badge
                            key={courseId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {course?.label || courseId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedTerms.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Terms:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTerms.map((termId) => {
                        const term = termItems.find((t) => t.id === termId);
                        return (
                          <Badge
                            key={termId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {term?.label || termId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedSchools.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Schools:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSchools.map((schoolId) => {
                        const school = schoolItems.find(
                          (s) => s.id === schoolId
                        );
                        return (
                          <Badge
                            key={schoolId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {school?.label || schoolId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedPeriods.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Periods:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedPeriods.map((periodId) => {
                        const period = periodItems.find(
                          (p) => p.id === periodId
                        );
                        return (
                          <Badge
                            key={periodId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {period?.label || periodId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedEll.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">ELL:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedEll.map((ellId) => {
                        const ell = ellItems.find((e) => e.id === ellId);
                        return (
                          <Badge
                            key={ellId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {ell?.label || ellId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedSpecialEd.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Special Ed:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSpecialEd.map((specialEdId) => {
                        const specialEd = specialEdItems.find(
                          (s) => s.id === specialEdId
                        );
                        return (
                          <Badge
                            key={specialEdId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {specialEd?.label || specialEdId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedArd.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">ARD:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedArd.map((ardId) => {
                        const ard = ardItems.find((a) => a.id === ardId);
                        return (
                          <Badge
                            key={ardId}
                            className="text-xs py-0 bg-primary/80 text-white"
                          >
                            {ard?.label || ardId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
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
              {/* <ExportCsvButton 
                data={filteredData}
                showLoading={showLoading}
              /> */}
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
                    pagination={true}
                    paginationPageSizeSelector={paginationPageSizes}
                    paginationPageSize={data?.length > 20 ? data.length : 20}
                    enableCharts={true}
                    cellSelection={true}
                    pivotMode={false}
                    pivotPanelShow="onlyWhenPivoting"
                    // sideBar={["columns", "filters"]}
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
            <CardTitle>Please Select a Term to show data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center"></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GradeDistribution2;
