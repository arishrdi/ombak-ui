import type { ComponentType } from "react";
import { SaasLanding } from "@/registry/templates/saas-landing/saas-landing";
import { StudioLanding } from "@/registry/templates/studio-landing/studio-landing";
import { AppLaunch } from "@/registry/templates/app-launch/app-launch";

/** Template slug → page component, its exported name and its accent color (for cards). */
export const templateDocs: Record<string, { Page: ComponentType; exportName: string; accent: string }> = {
  "saas-landing": { Page: SaasLanding, exportName: "SaasLanding", accent: "#3fd1b0" },
  "studio-landing": { Page: StudioLanding, exportName: "StudioLanding", accent: "#f97362" },
  "app-launch": { Page: AppLaunch, exportName: "AppLaunch", accent: "#8b5cf6" },
};
