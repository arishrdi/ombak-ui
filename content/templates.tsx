import type { ComponentType } from "react";
import { SaasLanding } from "@/registry/templates/saas-landing/saas-landing";
import { StudioLanding } from "@/registry/templates/studio-landing/studio-landing";
import { AppLaunch } from "@/registry/templates/app-launch/app-launch";

/** Template slug → page component for /view. Names and accent colors live in content/meta.ts. */
export const templateDocs: Record<string, { Page: ComponentType }> = {
  "saas-landing": { Page: SaasLanding },
  "studio-landing": { Page: StudioLanding },
  "app-launch": { Page: AppLaunch },
};
