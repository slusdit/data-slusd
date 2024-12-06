import PieChartCard from "../../components/charts/PieChart";
import { MultiComponent } from "../../components/charts/MultiBar";
import { ChartConfig } from "@/components/ui/chart";
import { StackComponent } from "../../components/charts/StackedBar";
import { DiyChartBySchool } from "../../components/charts/DiyChartBySchool";



const chartData = [
    {
      'Sch#': 2,
      School: 'Garfield',
      TK: 31,
      K: 45,
      '1 ': 64,
      '2 ': 49,
      '3 ': 49,
      '4 ': 48,
      '5 ': 51,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 337
    },
    {
      'Sch#': 3,
      School: 'Jefferson',
      TK: 39,
      K: 78,
      '1 ': 94,
      '2 ': 78,
      '3 ': 103,
      '4 ': 91,
      '5 ': 106,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 589
    },
    {
      'Sch#': 4,
      School: 'Madison',
      TK: 51,
      K: 125,
      '1 ': 106,
      '2 ': 110,
      '3 ': 102,
      '4 ': 96,
      '5 ': 95,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 685
    },
    {
      'Sch#': 5,
      School: 'McKinley',
      TK: 23,
      K: 69,
      '1 ': 72,
      '2 ': 60,
      '3 ': 74,
      '4 ': 67,
      '5 ': 83,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 448
    },
    {
      'Sch#': 6,
      School: 'Monroe',
      TK: 25,
      K: 54,
      '1 ': 51,
      '2 ': 60,
      '3 ': 67,
      '4 ': 81,
      '5 ': 64,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 402
    },
    {
      'Sch#': 7,
      School: 'Roosevelt',
      TK: 40,
      K: 88,
      '1 ': 72,
      '2 ': 91,
      '3 ': 74,
      '4 ': 91,
      '5 ': 88,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 544
    },
    {
      'Sch#': 8,
      School: 'Washington',
      TK: 21,
      K: 67,
      '1 ': 66,
      '2 ': 57,
      '3 ': 64,
      '4 ': 58,
      '5 ': 70,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 403
    },
    {
      'Sch#': 9,
      School: 'Halkin',
      TK: 45,
      K: 105,
      '1 ': 102,
      '2 ': 108,
      '3 ': 123,
      '4 ': 116,
      '5 ': 117,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 716
    },
    {
      'Sch#': 11,
      School: 'Bancroft',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 314,
      '7 ': 288,
      '8 ': 316,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 918
    },
    {
      'Sch#': 12,
      School: 'Muir',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 317,
      '7 ': 302,
      '8 ': 310,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 929
    },
    {
      'Sch#': 15,
      School: 'Lincoln',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 1,
      '10 ': 19,
      '11 ': 84,
      '12 ': 68,
      Total: 172
    },
    {
      'Sch#': 16,
      School: 'SLHS',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 608,
      '10 ': 606,
      '11 ': 584,
      '12 ': 620,
      Total: 2418
    },
    {
      'Sch#': 50,
      School: 'NPS',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 1,
      '3 ': 3,
      '4 ': 3,
      '5 ': 1,
      '6 ': 3,
      '7 ': 5,
      '8 ': 2,
      '9 ': 6,
      '10 ': 2,
      '11 ': 2,
      '12 ': 4,
      Total: 32
    },
    {
      'Sch#': 60,
      School: 'SLVA Elementary School',
      TK: 0,
      K: 2,
      '1 ': 5,
      '2 ': 3,
      '3 ': 6,
      '4 ': 10,
      '5 ': 2,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 28
    },
    {
      'Sch#': 61,
      School: 'SLVA Middle School',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 7,
      '7 ': 10,
      '8 ': 8,
      '9 ': 0,
      '10 ': 0,
      '11 ': 0,
      '12 ': 0,
      Total: 25
    },
    {
      'Sch#': 62,
      School: 'SLVA High School',
      TK: 0,
      K: 0,
      '1 ': 0,
      '2 ': 0,
      '3 ': 0,
      '4 ': 0,
      '5 ': 0,
      '6 ': 0,
      '7 ': 0,
      '8 ': 0,
      '9 ': 19,
      '10 ': 22,
      '11 ': 16,
      '12 ': 20,
      Total: 77
    }
  ]
  
  const restackData = (data: typeof chartData) => {
    const result: Record<string, Record<string, number>> = {}
    data.forEach(item => {
      for (const key in item) {
       if (key !== 'Sch#' && key !== 'School') {
          if (!result[key]) {
               result[key] = {}
          }
          result[key][item.School] = item[key] as number
        }
      }
    })
    // console.log(result)
    return result
  }

  const makeChartData = async (data: Record<string, Record<string, number>>) => {
    const result: ChartConfig[] = []
    // console.log(data)
    for (const key in data) {
      // console.log(key, data[key])
      result.push({
        label: key,
        
        data: data[key],
      })
    }
    // console.log(result)
    return result
  }

  const transformData = (data) => {
    const transformedData = [];
    for (const grade in data) {
        if (data.hasOwnProperty(grade) && grade !== "Total") {
            const gradeData = data[grade];
            for (const school in gradeData) {
                if (gradeData.hasOwnProperty(school)) {
                    transformedData.push({
                        grade: grade.trim(),
                        school,
                        count: gradeData[school],
                    });
                }
            }
        }
    }
    return transformedData;
};

  const makeChartConfig = (data: Record<string, Record<string, number>>) => {
    const result: ChartConfig[] = []
    // console.log(data)
    for (const key in data) {
      // console.log(key, data[key])
      result.push({
        label: key,
        
        data: data[key],
      })
    }
    // console.log(result)
    return result
  }


  const chartConfig = {
    desktop: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
export default async function Page() {
    let newChartData = restackData(chartData)
    // console.log(newChartData)
    const finalChartData =  await makeChartData(newChartData)
    const finalFinalChartData = transformData(newChartData)
    // console.log(finalChartData)
    return (
        <div className="px-12 max-w-5xl">
            <h1 className="text-3xl">Test</h1>
            {/* <Component />
            <MultiComponent chartData={chartData} chartConfig={chartConfig} /> */}
            <DiyChartBySchool />
            {/* <StackComponent chartData={finalFinalChartData} chartConfig={chartConfig} /> */}
        </div>
    )
}