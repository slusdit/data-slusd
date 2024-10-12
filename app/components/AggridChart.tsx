import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Car } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="mr-2" style={{ color: entry.color }}>{chartConfig[entry.dataKey].label}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StackedBarChartComponent = ({
  data,
  dataKey = 'Sch#' ,
  title = '',
  description = '',
}:{
  data,
  title?: string,
  description?: string,
  dataKey?: string
}) => {
  const [selectedFields, setSelectedFields] = useState([]);

  const chartConfig = useMemo(() => {
    if (data.length === 0) return {};
    const numericFields = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
    const colors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))'
    ];
    return numericFields.reduce((acc, field, index) => {
      acc[field] = {
        label: field.charAt(0).toUpperCase() + field.slice(1),
        color: colors[index % colors.length]
      };
      return acc;
    }, {});
  }, [data]);

  const fields = useMemo(() => Object.keys(chartConfig), [chartConfig]);

  const chartData = useMemo(() => {
    if (selectedFields.length === 0) return [];
    return data.map(item => {

      return ({
      name: item.School, //item[dataKey], // Assuming the first field is the label
      ...selectedFields.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    })
    });
  }, [data, selectedFields]);

  useEffect(() => {
    if (fields.length > 0 && selectedFields.length === 0) {
      setSelectedFields([fields[0]]);
    }
  }, [fields, selectedFields]);

  const handleFieldToggle = (field) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          {fields.map((field) => (
            
            <div key={field} className="flex items-center space-x-2">
              <Checkbox
                id={field}
                checked={selectedFields.includes(field)}
                onCheckedChange={() => handleFieldToggle(field)}
              />
              <Label
                htmlFor={field}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {chartConfig[field].label}
              </Label>
            </div>
          ))}
        </div>
        <ChartContainer config={chartConfig} className="h-96">
          <BarChart data={chartData}>
            <CardTitle>{dataKey}</CardTitle>
            <XAxis dataKey={dataKey} 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" hideLabel/>} />
            <ChartLegend content={<ChartLegendContent />} />
            {selectedFields.map((field, index) => (

              <Bar
                dataKey={chartConfig[field].label.toString()}
                stackId="a"
                fill={chartConfig[field].color}

                />
            ))}
          </BarChart>
          {/* <BarChart data={chartData}>
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip chartConfig={chartConfig} />} />
            <Legend />
            {selectedFields.map((field) => (
              <Bar
                key={field}
                dataKey={dataKey}
                stackId="a"
                fill={chartConfig[field].color}
                name={chartConfig[field].label}
                
              />
            ))}
          </BarChart> */}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StackedBarChartComponent;