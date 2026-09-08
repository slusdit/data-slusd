"use client";

// Side-effect module for standalone AG Charts (dashboard favourites, the report
// chart tab, grade distribution, AI results). Since AG Charts 12 the chart
// modules must be registered explicitly, exactly like the grid's; without it
// AgCharts.create() throws "No modules have been registered". It also
// registers the licence key. Grid pages register the grid modules through
// AGGridProvider (which wires the grid's integrated charts separately).
import { AllEnterpriseModule, LicenseManager, ModuleRegistry } from "ag-charts-enterprise";

ModuleRegistry.registerModules([AllEnterpriseModule]);

const licenseKey = process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY;
if (licenseKey) {
  LicenseManager.setLicenseKey(licenseKey);
}
