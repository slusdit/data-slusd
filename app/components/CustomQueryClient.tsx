'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, Play, Check, AlertCircle, ChevronDown, ChevronUp, Database, X, Wand2 } from 'lucide-react';
import { runQuery } from '@/lib/aeries';
import DataTableAgGrid from './DataTableAgGrid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface SchoolOption {
  code: string;
  name: string;
  logo?: string;
  gradeRange: { low: number; high: number };
}

interface CustomQueryClientProps {
  schoolOptions: SchoolOption[];
  activeSchool?: string;
  isDistrictWide?: boolean;
  canEditQueries?: boolean;
}

// Filter definitions
const GRADE_OPTIONS = [
  { id: 'TK', label: 'TK', value: -1 },
  { id: 'K', label: 'K', value: 0 },
  { id: '1', label: '1st', value: 1 },
  { id: '2', label: '2nd', value: 2 },
  { id: '3', label: '3rd', value: 3 },
  { id: '4', label: '4th', value: 4 },
  { id: '5', label: '5th', value: 5 },
  { id: '6', label: '6th', value: 6 },
  { id: '7', label: '7th', value: 7 },
  { id: '8', label: '8th', value: 8 },
  { id: '9', label: '9th', value: 9 },
  { id: '10', label: '10th', value: 10 },
  { id: '11', label: '11th', value: 11 },
  { id: '12', label: '12th', value: 12 },
];

const GRADE_GROUPS = [
  { id: 'elementary', label: 'Elementary (TK-5)', grades: [-1, 0, 1, 2, 3, 4, 5] },
  { id: 'middle', label: 'Middle (6-8)', grades: [6, 7, 8] },
  { id: 'high', label: 'High School (9-12)', grades: [9, 10, 11, 12] },
];

const GENDER_OPTIONS = [
  { id: 'M', label: 'Male' },
  { id: 'F', label: 'Female' },
];

const ETHNICITY_OPTIONS = [
  { id: 'H', label: 'Hispanic/Latino', code: 'H' },
  { id: 'A', label: 'Asian', code: 'A' },
  { id: 'B', label: 'African American', code: 'B' },
  { id: 'W', label: 'White', code: 'W' },
  { id: 'F', label: 'Filipino', code: 'F' },
  { id: 'P', label: 'Pacific Islander', code: 'P' },
  { id: 'I', label: 'Native American', code: 'I' },
  { id: 'T', label: 'Two or More Races', code: 'T' },
];

const PROGRAM_OPTIONS = [
  { id: 'sped', label: 'Special Ed (IEP)', column: 'is_special_education' },
  { id: '504', label: '504 Plan', column: 'is_section_504' },
  { id: 'el', label: 'English Learner', column: 'is_english_learner' },
  { id: 'foster', label: 'Foster Youth', column: 'is_foster_youth' },
  { id: 'homeless', label: 'Homeless', column: 'is_homeless' },
  { id: 'migrant', label: 'Migrant', column: 'is_migrant' },
];

const FRPM_OPTIONS = [
  { id: 'free', label: 'Free Lunch', column: 'is_free' },
  { id: 'reduced', label: 'Reduced Lunch', column: 'is_reduced' },
  { id: 'frpm', label: 'Free or Reduced (Any)', column: 'is_frpm_eligible' },
];

const ATTENDANCE_OPTIONS = [
  { id: 'chronic', label: 'Chronically Absent', column: 'is_chronically_absent' },
];

const ACADEMIC_OPTIONS = [
  { id: 'failing', label: 'Has Failing Grades', column: 'failing_grade_count', operator: '>' as const, value: 0 },
  { id: 'at_risk', label: 'Academically At-Risk', column: 'at_risk_grade_count', operator: '>' as const, value: 0 },
];

// Data columns to include
const DATA_COLUMNS = [
  { id: 'basic', label: 'Basic Info', columns: ['student_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name'], required: true },
  { id: 'demographics', label: 'Demographics', columns: ['gender', 'ethnicity', 'primary_race_ethnicity', 'birth_date', 'age'] },
  { id: 'contact', label: 'Contact Info', columns: ['home_phone', 'parent_guardian_name', 'parent_email', 'student_email'] },
  { id: 'language', label: 'Language', columns: ['home_language', 'language_fluency', 'english_learner_status'] },
  { id: 'programs', label: 'Program Flags', columns: ['is_english_learner', 'is_special_education', 'sped_primary_disability', 'is_foster_youth', 'is_homeless', 'is_migrant', 'is_section_504'], join: 'program_summary' },
  { id: 'attendance', label: 'Attendance', columns: ['attendance_rate_percent', 'days_absent', 'days_present', 'is_chronically_absent', 'truancy_risk_level'], join: 'attendance_summary' },
  { id: 'gpa', label: 'GPA/Academics', columns: ['current_gpa', 'failing_grade_count', 'at_risk_grade_count', 'academic_standing'], join: 'student_gpa' },
  { id: 'frpm', label: 'Free/Reduced Lunch', columns: ['frpm_status', 'is_frpm_eligible', 'is_free', 'is_reduced'], join: 'frpm_status' },
  { id: 'discipline', label: 'Discipline', columns: ['total_suspensions', 'discipline_risk_level'], join: 'suspension_summary' },
];

interface FilterState {
  schools: string[];
  grades: number[];
  genders: string[];
  ethnicities: string[];
  programs: string[];
  frpm: string[];
  attendance: string[];
  academic: string[];
}

interface QueryState {
  isExecuting: boolean;
  results: Record<string, unknown>[] | null;
  error: string | null;
  generatedSql: string | null;
  copied: boolean;
  rowCount: number;
}

// Chip component for selected filters
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 pr-1">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}

// Filter section component
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-auto">
          <span className="font-medium text-sm">{title}</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-3 px-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CustomQueryClient({
  schoolOptions,
  activeSchool,
  isDistrictWide,
  canEditQueries = false,
}: CustomQueryClientProps) {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    schools: [],
    grades: [],
    genders: [],
    ethnicities: [],
    programs: [],
    frpm: [],
    attendance: [],
    academic: [],
  });

  // Selected data columns
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['basic', 'programs']);

  // Query state
  const [queryState, setQueryState] = useState<QueryState>({
    isExecuting: false,
    results: null,
    error: null,
    generatedSql: null,
    copied: false,
    rowCount: 0,
  });

  const [showSql, setShowSql] = useState(false);
  const [nlPrompt, setNlPrompt] = useState('');

  // Parse natural language prompt and extract filters
  const parseNaturalLanguage = useCallback((text: string) => {
    const lower = text.toLowerCase();
    const detected: FilterState = {
      schools: [],
      grades: [],
      genders: [],
      ethnicities: [],
      programs: [],
      frpm: [],
      attendance: [],
      academic: [],
    };

    // Detect schools by name
    const schoolPatterns: Record<string, string[]> = {
      '2': ['garfield'],
      '3': ['jefferson'],
      '4': ['madison'],
      '5': ['mckinley'],
      '6': ['monroe'],
      '7': ['roosevelt'],
      '8': ['washington'],
      '9': ['halkin'],
      '11': ['bancroft'],
      '12': ['muir'],
      '15': ['lincoln'],
      '16': ['san leandro high', 'slhs'],
      '60': ['slva elementary', 'slva elem'],
      '61': ['slva middle', 'slva mid'],
      '62': ['slva high'],
    };

    for (const [code, patterns] of Object.entries(schoolPatterns)) {
      if (patterns.some(p => lower.includes(p))) {
        const school = schoolOptions.find(s => s.code === code);
        if (school) detected.schools.push(code);
      }
    }

    // Detect grade levels
    const gradePatterns: Array<{ pattern: RegExp; grades: number[] }> = [
      { pattern: /\b(tk|transitional k|transitional kindergarten)\b/, grades: [-1] },
      { pattern: /\b(kindergarten|kinder)\b(?!\s*-|\s*through)/, grades: [0] },
      { pattern: /\b1st\s*grad|\bfirst\s*grad|\bgrade\s*1\b/, grades: [1] },
      { pattern: /\b2nd\s*grad|\bsecond\s*grad|\bgrade\s*2\b/, grades: [2] },
      { pattern: /\b3rd\s*grad|\bthird\s*grad|\bgrade\s*3\b/, grades: [3] },
      { pattern: /\b4th\s*grad|\bfourth\s*grad|\bgrade\s*4\b/, grades: [4] },
      { pattern: /\b5th\s*grad|\bfifth\s*grad|\bgrade\s*5\b/, grades: [5] },
      { pattern: /\b6th\s*grad|\bsixth\s*grad|\bgrade\s*6\b/, grades: [6] },
      { pattern: /\b7th\s*grad|\bseventh\s*grad|\bgrade\s*7\b/, grades: [7] },
      { pattern: /\b8th\s*grad|\beighth\s*grad|\bgrade\s*8\b/, grades: [8] },
      { pattern: /\b9th\s*grad|\bninth\s*grad|\bgrade\s*9\b/, grades: [9] },
      { pattern: /\b10th\s*grad|\btenth\s*grad|\bgrade\s*10\b/, grades: [10] },
      { pattern: /\b11th\s*grad|\beleventh\s*grad|\bgrade\s*11\b/, grades: [11] },
      { pattern: /\b12th\s*grad|\btwelfth\s*grad|\bgrade\s*12\b/, grades: [12] },
      // Grade ranges
      { pattern: /\belementary\b/, grades: [-1, 0, 1, 2, 3, 4, 5] },
      { pattern: /\bmiddle\s*school\b/, grades: [6, 7, 8] },
      { pattern: /\bhigh\s*school\b/, grades: [9, 10, 11, 12] },
    ];

    for (const { pattern, grades } of gradePatterns) {
      if (pattern.test(lower)) {
        detected.grades.push(...grades);
      }
    }
    detected.grades = [...new Set(detected.grades)]; // Remove duplicates

    // Detect gender
    if (/\b(male|boy|boys|men)\b/.test(lower) && !/\bfemale\b/.test(lower)) {
      detected.genders.push('M');
    }
    if (/\b(female|girl|girls|women)\b/.test(lower)) {
      detected.genders.push('F');
    }

    // Detect ethnicity
    const ethnicityPatterns: Array<{ pattern: RegExp; id: string }> = [
      { pattern: /\b(hispanic|latino|latina|latinx)\b/, id: 'H' },
      { pattern: /\basian\b/, id: 'A' },
      { pattern: /\b(african\s*american|black)\b/, id: 'B' },
      { pattern: /\bwhite\b/, id: 'W' },
      { pattern: /\bfilipino\b/, id: 'F' },
      { pattern: /\b(pacific\s*islander|polynesian)\b/, id: 'P' },
      { pattern: /\b(native\s*american|american\s*indian)\b/, id: 'I' },
      { pattern: /\b(two\s*or\s*more|multi\s*racial|mixed\s*race)\b/, id: 'T' },
    ];

    for (const { pattern, id } of ethnicityPatterns) {
      if (pattern.test(lower)) {
        detected.ethnicities.push(id);
      }
    }

    // Detect programs
    const programPatterns: Array<{ pattern: RegExp; id: string }> = [
      { pattern: /\b(iep|special\s*ed|sped|special\s*education)\b/, id: 'sped' },
      { pattern: /\b504\b/, id: '504' },
      { pattern: /\b(english\s*learner|ell?\b|el\s+student|limited\s*english)\b/, id: 'el' },
      { pattern: /\bfoster\b/, id: 'foster' },
      { pattern: /\b(homeless|unhoused|mckinney[\s-]?vento)\b/, id: 'homeless' },
      { pattern: /\bmigrant\b/, id: 'migrant' },
    ];

    for (const { pattern, id } of programPatterns) {
      if (pattern.test(lower)) {
        detected.programs.push(id);
      }
    }

    // Detect FRPM
    if (/\b(free\s*lunch|free\s*meal)\b/.test(lower) && !/reduced/.test(lower)) {
      detected.frpm.push('free');
    }
    if (/\b(reduced\s*lunch|reduced\s*meal)\b/.test(lower)) {
      detected.frpm.push('reduced');
    }
    if (/\b(frpm|free\s*(or|\/)\s*reduced|low[\s-]?income|socioeconomic)\b/.test(lower)) {
      detected.frpm.push('frpm');
    }

    // Detect attendance
    if (/\b(chronic|chronically\s*absent|chronic\s*absen)\b/.test(lower)) {
      detected.attendance.push('chronic');
    }

    // Detect academic
    if (/\b(failing|fail)\b/.test(lower)) {
      detected.academic.push('failing');
    }
    if (/\b(at[\s-]?risk|academic[\s-]?risk)\b/.test(lower)) {
      detected.academic.push('at_risk');
    }

    return detected;
  }, [schoolOptions]);

  // Apply parsed filters
  const applyParsedFilters = useCallback(() => {
    if (!nlPrompt.trim()) return;

    const detected = parseNaturalLanguage(nlPrompt);

    // Filter grades to only include those available for selected/all schools
    const relevantSchools = detected.schools.length > 0
      ? schoolOptions.filter(s => detected.schools.includes(s.code))
      : schoolOptions;

    let gradeRange = { low: -1, high: 12 };
    if (relevantSchools.length > 0) {
      gradeRange = {
        low: Math.min(...relevantSchools.map(s => s.gradeRange.low)),
        high: Math.max(...relevantSchools.map(s => s.gradeRange.high)),
      };
    }

    detected.grades = detected.grades.filter(
      g => g >= gradeRange.low && g <= gradeRange.high
    );

    setFilters(detected);
  }, [nlPrompt, parseNaturalLanguage, schoolOptions]);

  // Count detected filters for preview
  const detectedFilters = useMemo(() => {
    if (!nlPrompt.trim()) return null;
    return parseNaturalLanguage(nlPrompt);
  }, [nlPrompt, parseNaturalLanguage]);

  const detectedCount = useMemo(() => {
    if (!detectedFilters) return 0;
    return (
      detectedFilters.schools.length +
      detectedFilters.grades.length +
      detectedFilters.genders.length +
      detectedFilters.ethnicities.length +
      detectedFilters.programs.length +
      detectedFilters.frpm.length +
      detectedFilters.attendance.length +
      detectedFilters.academic.length
    );
  }, [detectedFilters]);

  // Compute available grades based on selected schools (or all if none selected)
  const availableGradeRange = useMemo(() => {
    const relevantSchools = filters.schools.length > 0
      ? schoolOptions.filter(s => filters.schools.includes(s.code))
      : schoolOptions;

    if (relevantSchools.length === 0) {
      return { low: -1, high: 12 }; // Default to all grades
    }

    // Get the union of all grade ranges
    const low = Math.min(...relevantSchools.map(s => s.gradeRange.low));
    const high = Math.max(...relevantSchools.map(s => s.gradeRange.high));

    return { low, high };
  }, [filters.schools, schoolOptions]);

  // Filter grade options based on available range
  const filteredGradeOptions = useMemo(() => {
    return GRADE_OPTIONS.filter(
      g => g.value >= availableGradeRange.low && g.value <= availableGradeRange.high
    );
  }, [availableGradeRange]);

  // Filter grade groups based on available range
  const filteredGradeGroups = useMemo(() => {
    return GRADE_GROUPS.map(group => ({
      ...group,
      grades: group.grades.filter(
        g => g >= availableGradeRange.low && g <= availableGradeRange.high
      ),
    })).filter(group => group.grades.length > 0);
  }, [availableGradeRange]);

  // Clear invalid grades when school selection changes
  useEffect(() => {
    setFilters(f => ({
      ...f,
      grades: f.grades.filter(
        g => g >= availableGradeRange.low && g <= availableGradeRange.high
      ),
    }));
  }, [availableGradeRange]);

  // Toggle filter helpers
  const toggleSchool = useCallback((code: string) => {
    setFilters(f => ({
      ...f,
      schools: f.schools.includes(code)
        ? f.schools.filter(s => s !== code)
        : [...f.schools, code],
    }));
  }, []);

  const toggleGrade = useCallback((value: number) => {
    setFilters(f => ({
      ...f,
      grades: f.grades.includes(value)
        ? f.grades.filter(g => g !== value)
        : [...f.grades, value],
    }));
  }, []);

  const toggleGradeGroup = useCallback((grades: number[]) => {
    setFilters(f => {
      const allSelected = grades.every(g => f.grades.includes(g));
      if (allSelected) {
        return { ...f, grades: f.grades.filter(g => !grades.includes(g)) };
      } else {
        return { ...f, grades: [...new Set([...f.grades, ...grades])] };
      }
    });
  }, []);

  const toggleGender = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      genders: f.genders.includes(id)
        ? f.genders.filter(g => g !== id)
        : [...f.genders, id],
    }));
  }, []);

  const toggleEthnicity = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      ethnicities: f.ethnicities.includes(id)
        ? f.ethnicities.filter(e => e !== id)
        : [...f.ethnicities, id],
    }));
  }, []);

  const toggleProgram = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      programs: f.programs.includes(id)
        ? f.programs.filter(p => p !== id)
        : [...f.programs, id],
    }));
  }, []);

  const toggleFrpm = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      frpm: f.frpm.includes(id)
        ? f.frpm.filter(p => p !== id)
        : [...f.frpm, id],
    }));
  }, []);

  const toggleAttendance = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      attendance: f.attendance.includes(id)
        ? f.attendance.filter(a => a !== id)
        : [...f.attendance, id],
    }));
  }, []);

  const toggleAcademic = useCallback((id: string) => {
    setFilters(f => ({
      ...f,
      academic: f.academic.includes(id)
        ? f.academic.filter(a => a !== id)
        : [...f.academic, id],
    }));
  }, []);

  const toggleColumn = useCallback((id: string) => {
    if (id === 'basic') return; // Can't deselect basic
    setSelectedColumns(c =>
      c.includes(id) ? c.filter(col => col !== id) : [...c, id]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      schools: [],
      grades: [],
      genders: [],
      ethnicities: [],
      programs: [],
      frpm: [],
      attendance: [],
      academic: [],
    });
  }, []);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return (
      filters.schools.length +
      filters.grades.length +
      filters.genders.length +
      filters.ethnicities.length +
      filters.programs.length +
      filters.frpm.length +
      filters.attendance.length +
      filters.academic.length
    );
  }, [filters]);

  // Generate SQL from filters
  const generatedSql = useMemo(() => {
    // Determine which joins are needed
    const neededJoins = new Set<string>();
    const selectedColumnDefs = DATA_COLUMNS.filter(c => selectedColumns.includes(c.id));

    for (const colDef of selectedColumnDefs) {
      if (colDef.join) {
        neededJoins.add(colDef.join);
      }
    }

    // Check if filters require specific joins
    if (filters.programs.length > 0) neededJoins.add('program_summary');
    if (filters.frpm.length > 0) neededJoins.add('frpm_status');
    if (filters.attendance.length > 0) neededJoins.add('attendance_summary');
    if (filters.academic.length > 0) neededJoins.add('student_gpa');

    // Build SELECT columns
    const selectColumns: string[] = [];
    for (const colDef of selectedColumnDefs) {
      const prefix = colDef.join ? getJoinAlias(colDef.join) : 'd';
      for (const col of colDef.columns) {
        // Some columns come from demographics even when join is specified
        if (colDef.join && ['student_id', 'student_number', 'last_name', 'first_name', 'grade_level', 'school_name'].includes(col)) {
          selectColumns.push(`d.${col}`);
        } else {
          selectColumns.push(`${prefix}.${col}`);
        }
      }
    }

    // Remove duplicates while preserving order
    const uniqueColumns = [...new Set(selectColumns)];

    // Build WHERE conditions
    const conditions: string[] = [];

    // School filter (will be handled by security injection, but include for visibility)
    // The API will inject school_id filters automatically

    // Grade filter
    if (filters.grades.length > 0) {
      const gradeList = filters.grades.join(', ');
      conditions.push(`d.grade_level IN (${gradeList})`);
    }

    // Gender filter
    if (filters.genders.length > 0) {
      const genderList = filters.genders.map(g => `'${g}'`).join(', ');
      conditions.push(`d.gender IN (${genderList})`);
    }

    // Ethnicity filter
    if (filters.ethnicities.length > 0) {
      const ethnicityList = filters.ethnicities.map(e => `'${e}'`).join(', ');
      conditions.push(`d.ethnicity_code IN (${ethnicityList})`);
    }

    // Program filters
    for (const programId of filters.programs) {
      const program = PROGRAM_OPTIONS.find(p => p.id === programId);
      if (program) {
        conditions.push(`p.${program.column} = 1`);
      }
    }

    // FRPM filters
    for (const frpmId of filters.frpm) {
      const frpm = FRPM_OPTIONS.find(f => f.id === frpmId);
      if (frpm) {
        conditions.push(`frpm.${frpm.column} = 1`);
      }
    }

    // Attendance filters
    for (const attId of filters.attendance) {
      const att = ATTENDANCE_OPTIONS.find(a => a.id === attId);
      if (att) {
        conditions.push(`att.${att.column} = 1`);
      }
    }

    // Academic filters
    for (const acadId of filters.academic) {
      const acad = ACADEMIC_OPTIONS.find(a => a.id === acadId);
      if (acad) {
        conditions.push(`gpa.${acad.column} ${acad.operator} ${acad.value}`);
      }
    }

    // Build JOIN clauses
    const joins: string[] = [];
    if (neededJoins.has('program_summary')) {
      joins.push('LEFT JOIN llm_student_program_summary p ON d.student_id = p.student_id AND d.school_id = p.school_id');
    }
    if (neededJoins.has('attendance_summary')) {
      joins.push('LEFT JOIN llm_attendance_summary att ON d.student_id = att.student_id AND d.school_id = att.school_id');
    }
    if (neededJoins.has('student_gpa')) {
      joins.push('LEFT JOIN llm_student_gpa gpa ON d.student_id = gpa.student_id AND d.school_id = gpa.school_id');
    }
    if (neededJoins.has('frpm_status')) {
      joins.push('LEFT JOIN llm_frpm_status frpm ON d.student_id = frpm.student_id AND d.school_id = frpm.school_id');
    }
    if (neededJoins.has('suspension_summary')) {
      joins.push('LEFT JOIN llm_suspension_summary disc ON d.student_id = disc.student_id AND d.school_id = disc.school_id');
    }

    // Construct the query
    let sql = `SELECT ${uniqueColumns.join(',\n       ')}\nFROM llm_student_demographics d`;

    if (joins.length > 0) {
      sql += '\n' + joins.join('\n');
    }

    if (conditions.length > 0) {
      sql += '\nWHERE ' + conditions.join('\n  AND ');
    }

    sql += '\nORDER BY d.school_name, d.grade_level, d.last_name, d.first_name';

    return sql;
  }, [filters, selectedColumns]);

  // Helper function for join aliases
  function getJoinAlias(join: string): string {
    switch (join) {
      case 'program_summary': return 'p';
      case 'attendance_summary': return 'att';
      case 'student_gpa': return 'gpa';
      case 'frpm_status': return 'frpm';
      case 'suspension_summary': return 'disc';
      default: return 'd';
    }
  }

  // Execute query
  const executeQuery = useCallback(async () => {
    setQueryState(s => ({ ...s, isExecuting: true, error: null }));

    try {
      // Call API to execute the query (will inject security filters)
      const response = await fetch('/api/custom-query/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sql: generatedSql,
          schoolFilter: filters.schools.length > 0 ? filters.schools : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorDetails = data.error || data.details || 'Unknown error occurred';
        throw new Error(`Query execution failed: ${errorDetails}. Please verify your SQL syntax and filters, then try again.`);
      }

      setQueryState(s => ({
        ...s,
        isExecuting: false,
        results: data.data || [],
        generatedSql: data.executedSql || generatedSql,
        rowCount: data.rowCount || 0,
      }));
    } catch (error) {
      setQueryState(s => ({
        ...s,
        isExecuting: false,
        error: error instanceof Error ? error.message : 'Query execution failed',
      }));
    }
  }, [generatedSql, filters.schools]);

  const copyToClipboard = useCallback(() => {
    if (queryState.generatedSql || generatedSql) {
      navigator.clipboard.writeText(queryState.generatedSql || generatedSql);
      setQueryState(s => ({ ...s, copied: true }));
      setTimeout(() => setQueryState(s => ({ ...s, copied: false })), 2000);
    }
  }, [queryState.generatedSql, generatedSql]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 text-xs">
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            {/* Schools */}
            {schoolOptions.length > 1 && (
              <FilterSection title="Schools" defaultOpen={false}>
                <div className="space-y-2">
                  {schoolOptions.map(school => (
                    <div key={school.code} className="flex items-center gap-2">
                      <Checkbox
                        id={`school-${school.code}`}
                        checked={filters.schools.includes(school.code)}
                        onCheckedChange={() => toggleSchool(school.code)}
                      />
                      <Label htmlFor={`school-${school.code}`} className="text-sm cursor-pointer flex items-center gap-2">
                        {school.logo && (
                          <img src={school.logo} alt="" className="h-4 w-4 rounded-sm object-contain" />
                        )}
                        {school.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Grade Level */}
            <FilterSection title="Grade Level">
              <div className="space-y-3">
                {/* Grade groups - only show if they have grades in range */}
                {filteredGradeGroups.length > 0 && (
                  <div className="space-y-2">
                    {filteredGradeGroups.map(group => (
                      <div key={group.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`grade-group-${group.id}`}
                          checked={group.grades.length > 0 && group.grades.every(g => filters.grades.includes(g))}
                          onCheckedChange={() => toggleGradeGroup(group.grades)}
                        />
                        <Label htmlFor={`grade-group-${group.id}`} className="text-sm cursor-pointer">
                          {group.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {/* Individual grades - filtered by school range */}
                <div className="grid grid-cols-4 gap-1">
                  {filteredGradeOptions.map(grade => (
                    <div key={grade.id} className="flex items-center gap-1">
                      <Checkbox
                        id={`grade-${grade.id}`}
                        checked={filters.grades.includes(grade.value)}
                        onCheckedChange={() => toggleGrade(grade.value)}
                        className="h-3.5 w-3.5"
                      />
                      <Label htmlFor={`grade-${grade.id}`} className="text-xs cursor-pointer">
                        {grade.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {/* Show hint if grades are limited */}
                {filteredGradeOptions.length < GRADE_OPTIONS.length && (
                  <p className="text-xs text-muted-foreground">
                    Grades filtered to match selected school(s)
                  </p>
                )}
              </div>
            </FilterSection>

            {/* Programs */}
            <FilterSection title="Programs">
              <div className="space-y-2">
                {PROGRAM_OPTIONS.map(program => (
                  <div key={program.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`program-${program.id}`}
                      checked={filters.programs.includes(program.id)}
                      onCheckedChange={() => toggleProgram(program.id)}
                    />
                    <Label htmlFor={`program-${program.id}`} className="text-sm cursor-pointer">
                      {program.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Free/Reduced Lunch */}
            <FilterSection title="Free/Reduced Lunch" defaultOpen={false}>
              <div className="space-y-2">
                {FRPM_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`frpm-${option.id}`}
                      checked={filters.frpm.includes(option.id)}
                      onCheckedChange={() => toggleFrpm(option.id)}
                    />
                    <Label htmlFor={`frpm-${option.id}`} className="text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Attendance */}
            <FilterSection title="Attendance" defaultOpen={false}>
              <div className="space-y-2">
                {ATTENDANCE_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`attendance-${option.id}`}
                      checked={filters.attendance.includes(option.id)}
                      onCheckedChange={() => toggleAttendance(option.id)}
                    />
                    <Label htmlFor={`attendance-${option.id}`} className="text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Academics */}
            <FilterSection title="Academics" defaultOpen={false}>
              <div className="space-y-2">
                {ACADEMIC_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`academic-${option.id}`}
                      checked={filters.academic.includes(option.id)}
                      onCheckedChange={() => toggleAcademic(option.id)}
                    />
                    <Label htmlFor={`academic-${option.id}`} className="text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Demographics */}
            <FilterSection title="Demographics" defaultOpen={false}>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Gender</p>
                  <div className="flex gap-4">
                    {GENDER_OPTIONS.map(gender => (
                      <div key={gender.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`gender-${gender.id}`}
                          checked={filters.genders.includes(gender.id)}
                          onCheckedChange={() => toggleGender(gender.id)}
                        />
                        <Label htmlFor={`gender-${gender.id}`} className="text-sm cursor-pointer">
                          {gender.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Ethnicity</p>
                  <div className="space-y-2">
                    {ETHNICITY_OPTIONS.map(ethnicity => (
                      <div key={ethnicity.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`ethnicity-${ethnicity.id}`}
                          checked={filters.ethnicities.includes(ethnicity.id)}
                          onCheckedChange={() => toggleEthnicity(ethnicity.id)}
                        />
                        <Label htmlFor={`ethnicity-${ethnicity.id}`} className="text-sm cursor-pointer">
                          {ethnicity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FilterSection>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Natural Language Input */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wand2 className="h-4 w-4" />
                Describe Your Query
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Type what you&apos;re looking for and we&apos;ll select the right filters
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={nlPrompt}
                  onChange={(e) => setNlPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      applyParsedFilters();
                    }
                  }}
                  placeholder="e.g., 3rd grade EL students at Jefferson who are chronically absent"
                  className="flex-1"
                />
                <Button
                  onClick={applyParsedFilters}
                  disabled={!nlPrompt.trim() || detectedCount === 0}
                  variant="secondary"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>

              {/* Preview of detected filters */}
              {nlPrompt.trim() && detectedFilters && (
                <div className="text-sm space-y-2 p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium">Detected filters:</span>
                    {detectedCount === 0 && (
                      <span className="text-amber-600">No filters detected. Try being more specific.</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {detectedFilters.schools.map(code => {
                      const school = schoolOptions.find(s => s.code === code);
                      return (
                        <Badge key={`school-${code}`} variant="outline" className="text-xs">
                          {school?.name || `School ${code}`}
                        </Badge>
                      );
                    })}
                    {detectedFilters.grades.map(g => {
                      const grade = GRADE_OPTIONS.find(opt => opt.value === g);
                      return (
                        <Badge key={`grade-${g}`} variant="outline" className="text-xs">
                          Grade {grade?.label || g}
                        </Badge>
                      );
                    })}
                    {detectedFilters.genders.map(g => (
                      <Badge key={`gender-${g}`} variant="outline" className="text-xs">
                        {GENDER_OPTIONS.find(opt => opt.id === g)?.label || g}
                      </Badge>
                    ))}
                    {detectedFilters.ethnicities.map(e => (
                      <Badge key={`eth-${e}`} variant="outline" className="text-xs">
                        {ETHNICITY_OPTIONS.find(opt => opt.id === e)?.label || e}
                      </Badge>
                    ))}
                    {detectedFilters.programs.map(p => (
                      <Badge key={`prog-${p}`} variant="outline" className="text-xs">
                        {PROGRAM_OPTIONS.find(opt => opt.id === p)?.label || p}
                      </Badge>
                    ))}
                    {detectedFilters.frpm.map(f => (
                      <Badge key={`frpm-${f}`} variant="outline" className="text-xs">
                        {FRPM_OPTIONS.find(opt => opt.id === f)?.label || f}
                      </Badge>
                    ))}
                    {detectedFilters.attendance.map(a => (
                      <Badge key={`att-${a}`} variant="outline" className="text-xs">
                        {ATTENDANCE_OPTIONS.find(opt => opt.id === a)?.label || a}
                      </Badge>
                    ))}
                    {detectedFilters.academic.map(a => (
                      <Badge key={`acad-${a}`} variant="outline" className="text-xs">
                        {ACADEMIC_OPTIONS.find(opt => opt.id === a)?.label || a}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Data Columns Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Include Data</CardTitle>
              <p className="text-sm text-muted-foreground">Select which data columns to include in results</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {DATA_COLUMNS.map(col => (
                  <div key={col.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`col-${col.id}`}
                      checked={selectedColumns.includes(col.id)}
                      onCheckedChange={() => toggleColumn(col.id)}
                      disabled={col.required}
                    />
                    <Label
                      htmlFor={`col-${col.id}`}
                      className={`text-sm cursor-pointer ${col.required ? 'text-muted-foreground' : ''}`}
                    >
                      {col.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button onClick={executeQuery} disabled={queryState.isExecuting} size="lg">
              {queryState.isExecuting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Query
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowSql(!showSql)}>
              {showSql ? 'Hide SQL' : 'Show SQL'}
            </Button>
            {isDistrictWide && (
              <Badge variant="outline">
                {filters.schools.length > 0
                  ? `${filters.schools.length} schools selected`
                  : `All ${schoolOptions.length} schools`}
              </Badge>
            )}
          </div>

          {/* Error Display */}
          {queryState.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{queryState.error}</AlertDescription>
            </Alert>
          )}

          {/* SQL Preview */}
          {showSql && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Generated SQL</span>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {queryState.copied ? (
                      <Check className="h-4 w-4 mr-1 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {queryState.copied ? 'Copied!' : 'Copy'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  {generatedSql}
                </pre>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {queryState.results && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Results ({queryState.rowCount.toLocaleString()} rows)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {queryState.results.length > 0 ? (
                  <div className="h-[500px]">
                    <DataTableAgGrid data={queryState.results} />
                  </div>
                ) : (
                  <p className="text-muted-foreground py-8 text-center">
                    No results found matching your filters
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
