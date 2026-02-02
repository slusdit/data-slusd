import { AreaChartComponent } from "@/app/components/charts/AreaChart";
import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";

export default async function DynamicTest(props: { params: Promise<{ label: string }> }) {
  const params = await props.params;
  const { label } = params;
  // console.log(label);

  const DefaultChart = () => { return <div>Loading...</div> };
  DefaultChart.displayName = "DefaultChart";
  let Chart: ComponentType<object> = DefaultChart;

  switch (label) {
    case 'test2':
      Chart = dynamic(() => import('@/app/tests/test2'), {
        suspense: true,
      });
      break;  
    case 'test1':
      Chart = dynamic(() => import('@/app/tests/test1'), {
        suspense: true,
      });
      break;  
    case 'test3':
      Chart = dynamic(() => import('@/app/components/charts/PieChart'), {
        suspense: true,
      });
      break;  
    default:
      Chart = DefaultChart;
      break;
  }

  // console.log(Chart);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AreaChartComponent />
        <Chart />
      </Suspense>
    </div>
  );
}
