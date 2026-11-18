export const site = {
  name: "Ombak UI",
  /** Public URL of the site. The registry lives at `${url}/r/<name>.json`. Change once the domain is set. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ombakui.com",
  description: "Motion components for React: scroll, GSAP and canvas effects you can paste into any shadcn project.",
  github: "https://github.com/ombakui/ombak-ui",
};

export const registryUrl = (name: string) => `${site.url}/r/${name}.json`;
