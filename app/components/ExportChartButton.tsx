import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Download, Loader2 } from "lucide-react";

/**
 * ExportChartButton component for exporting AG Charts as PNG or JPEG
 * 
 * @param {Object} props - Component props
 * @param {React.RefObject} props.chartRef - Reference to the AG Chart instance
 * @param {string} props.filename - Base filename for the exported image (default: "grade-distribution")
 * @param {boolean} props.disabled - Whether the button is disabled
 */
const ExportChartButton = ({ 
  chartRef, 
  filename = "grade-distribution", 
  disabled = false 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportChart = (fileType) => {
    try {
      setIsExporting(true);
      
      if (!chartRef || !chartRef.current || !chartRef.current.chart) {
        console.error('Chart reference not available');
        setIsExporting(false);
        return;
      }
      

      if (chartRef.current.chart.download) {
        chartRef.current.chart.download(`${filename}.${fileType}`);
        setIsExporting(false);
        return;
      }

      let canvas = null;
      const chart = chartRef.current.chart;
      
      if (chart && chart.scene && chart.scene.canvas) {
        canvas = chart.scene.canvas.element;
      }

      if (!canvas) {
        const chartContainer = chartRef.current;
        if (chartContainer && chartContainer.parentElement) {
          canvas = chartContainer.parentElement.querySelector('canvas');
        }
      }
      
      if (!canvas) {
        canvas = document.querySelector('.ag-chart-wrapper canvas') || 
                document.querySelector('div[class*="ag-chart"] canvas');
      }
      
      if (!canvas) {
        const canvases = document.querySelectorAll('canvas');
        if (canvases.length > 0) {
          canvas = Array.from(canvases).reduce((largest, current) => {
            return (!largest || 
                    (current.width * current.height) > (largest.width * largest.height)) 
                   ? current : largest;
          }, null);
        }
      }
      
      if (!canvas) {
        console.error('Chart canvas not found using any method');
        setIsExporting(false);
        return;
      }
      
      const dataUrl = canvas.toDataURL(`image/${fileType}`);
      
      const link = document.createElement('a');
      link.download = `${filename}.${fileType}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting chart:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          disabled={disabled || isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 size={16} className="mr-1 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download size={16} />
              Export Chart
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => exportChart('png')}
          disabled={isExporting}
        >
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => exportChart('jpeg')}
          disabled={isExporting}
        >
          Export as JPEG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportChartButton;