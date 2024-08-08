import { AreaChartComponent } from "@/app/components/charts/AreaChart";
import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";

export default async function DynamicTest({ params }: { params: { label: string } }) {
  const { label } = params;
  console.log(label);

  let Chart: ComponentType<{}> | JSX.Element = () => { return <div>Loading...</div> };

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
      Chart = () => <div></div>;
      break;
  }

  console.log(Chart);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AreaChartComponent />
        <Chart />
      </Suspense>
    </div>
  );
}
