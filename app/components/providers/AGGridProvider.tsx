'use client';

import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager, IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";
import { useEffect } from "react";

// Register AG Grid modules
ModuleRegistry.registerModules([
    AllEnterpriseModule,
    IntegratedChartsModule.with(AgChartsEnterpriseModule)
]);

// Set license key
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY as string);
console.log(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY);


export function AGGridProvider({ children }: { children: React.ReactNode }) {
    return children;
}