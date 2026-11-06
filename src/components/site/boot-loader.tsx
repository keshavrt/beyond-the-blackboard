import { siteName } from "./nav"

/**
 * DESIGN.md §7 boot sequence. Purely decorative (aria-hidden): the real page is
 * in the DOM from the start. Hidden by default; the inline script below shows it
 * once per session, before first paint, and never under reduced motion.
 * The whole timeline is CSS (globals.css §7), so it does not wait for hydration.
 */
const LOG: { text: string; status?: "ok" | "run" }[] = [
  { text: "/*" },
  { text: "   Booting career explorer..." },
  { text: "*/" },
  { text: "Loading careers", status: "ok" },
  { text: "Mapping study paths", status: "ok" },
  { text: "Checking sources", status: "ok" },
  { text: "Compiling page", status: "run" },
]

export function BootLoader() {
  return (
    <div className="boot" aria-hidden="true" data-lenis-prevent="">
      <div className="boot-bg" />
      <div className="boot-ui">
        <div className="boot-log">
          {LOG.map((line, i) => (
            <p
              key={line.text}
              className="boot-line"
              style={{ "--d": `${40 + i * 100}ms` } as React.CSSProperties}
            >
              <span>{line.text}</span>
              {line.status ? (
                <span className="boot-ok">{line.status === "ok" ? "[ OK ]" : "[ RUN ]"}</span>
              ) : null}
            </p>
          ))}
        </div>
        <div className="boot-bar">
          <span className="boot-bar-fill" />
        </div>
        <div className="boot-labels">
          <span>LOAD</span>
          <span>READ</span>
          <span>GO</span>
        </div>
        <p className="boot-pct" />
      </div>
      <div className="boot-name">
        <span className="boot-name-text">{siteName}</span>
        <span className="boot-name-box">{siteName}</span>
      </div>
      <div className="boot-sheet" />
    </div>
  )
}

/**
 * Runs synchronously while the HTML is parsed (Next guide: "Preventing flash
 * before hydration"). Sets html[data-boot] = run | out | skip, then removes it.
 * - Skipped entirely with reduced motion, after the first visit in a session,
 *   or if sessionStorage is unavailable.
 * - Any key or pointer press skips. Phases follow the CSS animations' end
 *   events; a hard cap ends it at 1.8s even if animations never run.
 */
export const bootScript = `(function(){try{
var d=document.documentElement,K="btb:booted";
if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem(K))return;
sessionStorage.setItem(K,"1");
d.setAttribute("data-boot","run");
var done=0,cap=setTimeout(end,1800),ev=["keydown","pointerdown","wheel","touchstart"];
function on(f){ev.forEach(function(e){addEventListener(e,f,{capture:true,passive:true})})}
function off(f){ev.forEach(function(e){removeEventListener(e,f,{capture:true})})}
function end(){if(done)return;done=1;clearTimeout(cap);off(skip);removeEventListener("animationend",step);d.removeAttribute("data-boot")}
function skip(){if(d.getAttribute("data-boot")!=="run")return;off(skip);d.setAttribute("data-boot","skip");setTimeout(end,220)}
function step(e){if(e.animationName==="boot-cover"&&d.getAttribute("data-boot")==="run"){off(skip);d.setAttribute("data-boot","out")}else if(e.animationName==="boot-uncover"){end()}}
on(skip);addEventListener("animationend",step);
}catch(e){}})()`
