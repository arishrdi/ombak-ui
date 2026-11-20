import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blockDocs } from "@/content/blocks";
import { templateDocs } from "@/content/templates";
import { blocks, getBlock, getTemplate, templates } from "@/lib/registry";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...blocks, ...templates].map((b) => ({ slug: b.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlock(slug) ?? getTemplate(slug);
  return item ? { title: `${item.title} preview`, robots: { index: false } } : {};
}

/**
 * `?still` (used by gallery thumbnails): before React hydrates, report prefers-reduced-motion to
 * every component (they all render a single still frame then) and finish CSS animations at once.
 * Thumbnails stay pictures instead of running whole animated pages in the background.
 */
const STILL_SCRIPT = `(function(){if(!/[?&]still(=|&|$)/.test(location.search))return;var mm=window.matchMedia.bind(window);window.matchMedia=function(q){if(/prefers-reduced-motion:\\s*reduce/.test(q)){return{matches:true,media:q,onchange:null,addListener:function(){},removeListener:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return false}}}return mm(q)};document.documentElement.classList.add("still")})();`;
const STILL_CSS = `html.still *,html.still *::before,html.still *::after{animation-duration:1ms!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:0s!important;scroll-behavior:auto!important}`;

/** A block or template on its own, with no site chrome. Loaded in the iframes on /blocks and /templates. */
export default async function View({ params }: Params) {
  const { slug } = await params;
  const block = getBlock(slug) && blockDocs[slug];
  const template = getTemplate(slug) && templateDocs[slug];
  if (!block && !template) notFound();
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: STILL_SCRIPT }} />
      <style>{"body{min-height:0}" + STILL_CSS}</style>
      <div id="block-root">
        {block ? block.Preview ? <block.Preview /> : <block.Block /> : template ? <template.Page /> : null}
      </div>
    </>
  );
}
