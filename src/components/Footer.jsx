"use client";

import Logo from "./Logo";

const EMAIL = "georgedevid97@gmail.com";

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-cream/50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite">
              High-performance, AI-friendly websites &amp; web apps. Built to help
              your business scale.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-graphite/70">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite">
              <li><a href="#about" className="underline-grow hover:text-ink">About</a></li>
              <li><a href="#services" className="underline-grow hover:text-ink">Services</a></li>
              <li><a href="#work" className="underline-grow hover:text-ink">Work</a></li>
              <li><a href="#process" className="underline-grow hover:text-ink">Process</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-graphite/70">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite">
              <li>Website Development</li>
              <li>UI / UX Design</li>
              <li>Full-Stack Apps</li>
              <li>AI Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-graphite/70">Get in touch</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite">
              <li>
                <a href={`mailto:${EMAIL}`} className="underline-grow hover:text-ink">{EMAIL}</a>
              </li>
              {/* <li>India &amp; Canada</li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-mist pt-7 text-sm text-graphite/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TrillioTek. All rights reserved.</p>
          <p>Designed &amp; built by TrillioTek.</p>
        </div>
      </div>
    </footer>
  );
}
