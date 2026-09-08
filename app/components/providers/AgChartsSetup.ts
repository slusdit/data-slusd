"use client";

// Side-effect module for standalone AG Charts (dashboard favourites). Loads the
// enterprise chart features and registers the licence key. Grid pages register
// the same key through AGGridProvider (the grid's LicenseManager also covers the
// grid's integrated charts); this module is for pages that render charts
// without a grid, which stopped being covered when the grid registration moved
// out of the root layout (finding P1).
import { LicenseManager } from "ag-charts-enterprise";

const licenseKey = process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY;
if (licenseKey) {
  LicenseManager.setLicenseKey(licenseKey);
}
