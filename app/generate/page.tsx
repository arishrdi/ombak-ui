import type { Metadata } from "next";
import { Generator } from "@/components/site/generator";

export const metadata: Metadata = {
  title: "Generate",
  description: "Describe a website and get a motion-rich static page built from Ombak components.",
  openGraph: {
    title: "Generate · Ombak UI",
    description: "Describe a website and get a motion-rich static page built from Ombak components.",
    url: "/generate",
    siteName: "Ombak UI",
  },
};

export default function GeneratePage() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-4 md:px-6">
      <h1 className="sr-only">Generate a website</h1>
      <Generator />
    </main>
  );
}
