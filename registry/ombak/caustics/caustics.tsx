"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CausticsProps = {
  /** Content rendered on top of the light. */
  children?: ReactNode;
  /** Color of the light patterns (hex). Default "#7df9ff" */
  color?: string;
  /** Color of the deep water behind them (hex). Default "#03243a" */
  deep?: string;
  /** Size of the pattern; higher means smaller cells. Default 1.6 */
  scale?: number;
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Brightness of the light, 0–2. Default 1 */
  intensity?: number;
  /** A soft glow follows the cursor. Default true */
  interactive?: boolean;
  className?: string;
};

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Layered, domain-warped interference pattern that looks like sunlight on a sea floor.
const FRAG = `precision mediump float;
uniform vec2 uRes;uniform float uTime;uniform vec3 uColor;uniform vec3 uDeep;uniform vec2 uPointer;
uniform float uScale;uniform float uIntensity;uniform float uGlow;
float pattern(vec2 p,float t){
  float c=0.;vec2 q=p;
  for(int n=1;n<5;n++){
    float f=float(n);
    q=p+vec2(cos(t*.55/f+q.y*f*.85+f*1.3),sin(t*.45/f+q.x*f*.95-f*.7))*(.8/f);
    c+=1./length(vec2(sin(q.x*3.1+t*.35),cos(q.y*2.9-t*.28))+.16);
  }
  return c*.25;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes.y;
  float c=pattern(uv*uScale*2.,uTime);
  c=pow(clamp(c*.36,0.,1.6),3.2)*uIntensity;
  vec2 st=gl_FragCoord.xy/uRes;
  float g=smoothstep(.45,0.,distance(st*vec2(uRes.x/uRes.y,1.),uPointer*vec2(uRes.x/uRes.y,1.)))*.35*uGlow;
  vec3 col=mix(uDeep,uColor,clamp(c+g,0.,1.));
  col*=mix(.7,1.08,st.y);
  gl_FragColor=vec4(col,1.);
}`;

const hex = (h: string): [number, number, number] => {
  const v = h.replace("#", "");
  const n = parseInt(v.length === 3 ? v.split("").map((x) => x + x).join("") : v, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * Shimmering underwater light, like sunlight dancing on a sea floor. A tiny WebGL shader with no
 * dependencies; falls back to a gradient without WebGL, pauses off-screen, and holds still for
 * reduced-motion users.
 */
export function Caustics({
  children,
  color = "#7df9ff",
  deep = "#03243a",
  scale = 1.6,
  speed = 1,
  intensity = 1,
  interactive = true,
  className,
}: CausticsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!wrap || !canvas || !gl) return; // the wrapper's gradient stays as the fallback

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const [uRes, uTime, uPointer, uGlow] = [u("uRes"), u("uTime"), u("uPointer"), u("uGlow")];
    gl.uniform3fv(u("uColor"), hex(color));
    gl.uniform3fv(u("uDeep"), hex(deep));
    gl.uniform1f(u("uScale"), scale);
    gl.uniform1f(u("uIntensity"), intensity);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5, glow: 0, target: 0 };
    let raf = 0;
    let visible = true;
    let t = 7;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // the pattern is soft; no need for full DPR
      canvas.width = Math.max(1, Math.round(wrap.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(wrap.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      if (reduced) frame(performance.now());
    };

    const frame = (now: number) => {
      t += Math.min((now - last) / 1000, 0.05) * speed;
      last = now;
      pointer.glow += (pointer.target - pointer.glow) * 0.06;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uGlow, pointer.glow);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const loop = (now: number) => {
      frame(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = 1 - (e.clientY - r.top) / r.height;
      pointer.target = 1;
    };
    const onLeave = () => (pointer.target = 0);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(wrap);
    raf = requestAnimationFrame(loop);
    if (interactive) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, deep, scale, speed, intensity, interactive]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative isolate overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 90% at 50% 0%, ${color}55, ${deep} 70%)` }}
    >
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" />
      {children}
    </div>
  );
}
