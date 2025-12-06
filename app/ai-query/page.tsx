import { AIQueryClient } from '@/app/components/AIQueryClient';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

// Map school codes to fragment IDs
const schoolCodeToFragmentId: Record<string, string> = {
  '2': 'school_garfield',
  '3': 'school_jefferson',
  '4': 'school_madison',
  '5': 'school_mckinley',
  '6': 'school_monroe',
  '7': 'school_roosevelt',
  '8': 'school_washington',
  '9': 'school_halkin',
  '11': 'school_bancroft',
  '12': 'school_muir',
  '15': 'school_lincoln',
  '16': 'school_slhs',
  '60': 'school_slva_elementary',
  '61': 'school_slva_middle',
  '62': 'school_slva_high',
};

// Filter options that match what's available in the fragments
const gradeOptions = [
  { id: 'grade_tk', label: 'TK' },
  { id: 'grade_k', label: 'K' },
  { id: 'grade_1', label: '1st' },
  { id: 'grade_2', label: '2nd' },
  { id: 'grade_3', label: '3rd' },
  { id: 'grade_4', label: '4th' },
  { id: 'grade_5', label: '5th' },
  { id: 'grade_6', label: '6th' },
  { id: 'grade_7', label: '7th' },
  { id: 'grade_8', label: '8th' },
  { id: 'grade_9', label: '9th' },
  { id: 'grade_10', label: '10th' },
  { id: 'grade_11', label: '11th' },
  { id: 'grade_12', label: '12th' },
];

const gradeGroupOptions = [
  { id: 'grade_elementary', label: 'Elementary (TK-5)' },
  { id: 'grade_middle', label: 'Middle (6-8)' },
  { id: 'grade_high', label: 'High School (9-12)' },
];

const genderOptions = [
  { id: 'gender_male', label: 'Male' },
  { id: 'gender_female', label: 'Female' },
];

const ethnicityOptions = [
  { id: 'ethnicity_hispanic', label: 'Hispanic/Latino' },
  { id: 'ethnicity_asian', label: 'Asian' },
  { id: 'ethnicity_african_american', label: 'African American' },
  { id: 'ethnicity_white', label: 'White' },
  { id: 'ethnicity_filipino', label: 'Filipino' },
  { id: 'ethnicity_pacific_islander', label: 'Pacific Islander' },
  { id: 'ethnicity_native_american', label: 'Native American' },
  { id: 'ethnicity_two_or_more', label: 'Two or More Races' },
];

const programOptions = [
  { id: 'has_iep', label: 'Special Ed (IEP)' },
  { id: 'has_504', label: '504 Plan' },
  { id: 'is_ell', label: 'English Learner' },
  { id: 'is_rfep', label: 'RFEP' },
  { id: 'is_gate', label: 'GATE' },
  { id: 'is_free_reduced_lunch', label: 'Free/Reduced Lunch' },
  { id: 'is_homeless', label: 'Homeless' },
  { id: 'is_foster', label: 'Foster Youth' },
  { id: 'is_migrant', label: 'Migrant' },
  { id: 'is_title1', label: 'Title I' },
];

export default async function AIQueryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  // Fetch schools from database
  const schools = await prisma.schoolInfo.findMany({
    orderBy: { name: 'asc' },
  });

  // Map schools to fragment IDs, filter out schools without a fragment mapping
  const schoolOptions = schools
    .filter((s) => schoolCodeToFragmentId[s.sc])
    .map((s) => ({
      id: schoolCodeToFragmentId[s.sc],
      label: s.name,
      logo: s.logo || undefined,
      code: s.sc,
    }));

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Query Builder</h1>
        <p className="text-muted-foreground">
          Describe what data you need in plain English and let AI generate the SQL query for you.
        </p>
      </div>
      <AIQueryClient
        schoolOptions={schoolOptions}
        gradeOptions={gradeOptions}
        gradeGroupOptions={gradeGroupOptions}
        genderOptions={genderOptions}
        ethnicityOptions={ethnicityOptions}
        programOptions={programOptions}
        activeSchool={session.user.activeSchool?.toString()}
      />
    </div>
  );
}
