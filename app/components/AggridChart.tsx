import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AggridChart = ({ data }) => {
    const [selectedField, setSelectedField] = useState('');
    console.log(data)

  const fields = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
  }, [data]);

  const chartData = useMemo(() => {
    if (!selectedField) return [];
    return data.map(item => ({
      name: item[Object.keys(item)[0]], // Assuming the first field is the label
      value: item[selectedField]
    }));
  }, [data, selectedField]);

  useEffect(() => {
    if (fields.length > 0 && !selectedField) {
      setSelectedField(fields[0]);
    }
  }, [fields, selectedField]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
        <CardDescription>Bar chart representation of the selected field</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            {fields.map(field => (
              <SelectItem key={field} value={field}>{field}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AggridChart;