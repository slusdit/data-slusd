import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generatePaginationOptions(totalRows: number): number[] {
  const baseOptions = [10, 25, 50, 100, 500, 1000];
  
  // Filter options to only include those less than or equal to total rows
  const validOptions = baseOptions.filter(size => size <= totalRows);
  
  // Add total rows as the last option if it's not already included
  if (totalRows > 0 && !validOptions.includes(totalRows)) {
    validOptions.push(totalRows);
  }
  
  return validOptions;
}