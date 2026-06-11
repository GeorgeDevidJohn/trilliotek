"use client";

import Logo from "./Logo";

const EMAIL = "connect@trilliotek.com";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              High-performance, AI-friendly websites &amp; web apps. Built to help
              your business scale.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream/40">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li><a href="#about" className="underline-grow transition-colors hover:text-cobalt">About</a></li>
              <li><a href="#services" className="underline-grow transition-colors hover:text-cobalt">Services</a></li>
              <li><a href="#work" className="underline-grow transition-colors hover:text-cobalt">Work</a></li>
              <li><a href="#process" className="underline-grow transition-colors hover:text-cobalt">Process</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream/40">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>Website Development</li>
              <li>UI / UX Design</li>
              <li>Full-Stack Apps</li>
              <li>AI Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cream/40">Get in touch</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>
                <a href={`mailto:${EMAIL}`} className="underline-grow transition-colors hover:text-cobalt">{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-sm text-cream/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TrillioTek. All rights reserved.</p>
          <p>Designed &amp; built by TrillioTek.</p>
        </div>
      </div>
    </footer>
  );
}
