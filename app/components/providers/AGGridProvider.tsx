'use client';

// Side-effect module: importing it registers the AG Grid Enterprise modules and
// the licence. It is imported only by components that render a grid, so the
// ~3.9 MB of grid code no longer ships with every page (finding P1). The
// AGGridProvider component is kept for compatibility and just renders children.
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

export function AGGridProvider({ children }: { children: React.ReactNode }) {
    return children;
}