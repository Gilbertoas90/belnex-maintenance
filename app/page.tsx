import Image from "next/image";
import {
  ArrowUpRight,
  AtSign,
  Building2,
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const services = [
  "Electrical Installations",
  "Electrical Renovation",
  "Electrical Inspection",
  "Smart Home",
  "KNX Automation",
  "Solar Energy",
  "Battery Storage",
  "EV Chargers",
  "Security Cameras",
  "CCTV",
  "Networking",
  "Fiber Optics",
  "Wi-Fi Solutions",
  "Commercial Electrical",
  "Industrial Electrical",
  "Maintenance",
];

const featuredServices = [
  { title: "Electrical Installations", image: "/images/services/services-painel.png" },
  { title: "Smart Home", image: "/images/services/services-smarthome.png" },
  { title: "Solar Energy", image: "/images/services/services-solaire.png" },
  { title: "EV Chargers", image: "/images/services/services-ev.png" },
];

const projects = [
  { title: "Electrical Panel", image: "/images/projects/electrical-panel.png" },
  { title: "EV Charger", image: "/images/projects/ev-charger.png" },
  { title: "Smart Home", image: "/images/projects/smart-home.png" },
  { title: "Solar Energy", image: "/images/projects/solar.png" },
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.03 3a12.91 12.91 0 0 0-10.99 19.69L3 29l6.46-1.99A12.98 12.98 0 1 0 16.03 3Zm0 23.69a10.7 10.7 0 0 1-5.47-1.5l-.4-.24-3.83 1.18 1.25-3.72-.26-.42A10.73 10.73 0 1 1 16.03 26.7Zm5.89-8.03c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.52-.16-.74.16-.22.32-.85 1.04-1.04 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6a9.63 9.63 0 0 1-1.78-2.22c-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.74-1.78-1.01-2.44-.27-.65-.54-.56-.74-.57h-.63c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.69s1.15 3.12 1.31 3.33c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.52 1.82.66.76.24 1.45.2 2 .12.61-.09 1.9-.78 2.17-1.54.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function ContactButton({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("https") ? "_blank" : undefined}
      rel={href.startsWith("https") ? "noreferrer" : undefined}
      className="group flex min-h-20 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-left shadow-button transition duration-300 hover:-translate-y-1 hover:border-energy/60 hover:bg-energy/[0.08] hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-energy"
    >
      <span className="flex items-center gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-energy/15 text-energy transition duration-300 group-hover:bg-energy group-hover:text-canvas">
          {icon}
        </span>
        <span>
          <span className="block text-base font-semibold text-white">{label}</span>
          <span className="mt-0.5 block text-sm text-[#B3B3B3]">{description}</span>
        </span>
      </span>
      <ArrowUpRight className="size-5 text-[#B3B3B3] transition group-hover:text-energy" />
    </a>
  );
}

export default function MaintenancePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-canvas text-white selection:bg-energy selection:text-canvas">
      <section className="relative isolate h-[55vh] overflow-hidden sm:h-[60vh] lg:h-[65vh]" aria-labelledby="maintenance-heading">
        <Image
          src="/images/hero/hero-home.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/[.55]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(5,5,5,.80)_70%,#050505_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-energy/60 to-transparent" />

        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-5 py-7 text-center sm:px-8 lg:px-12">
          <header className="animate-fade-up" aria-label="BELNEX ENERGY">
            <Image src="/logo/logo-horizontal.png" alt="BELNEX ENERGY" width={640} height={160} priority sizes="(max-width: 639px) 200px, (max-width: 1023px) 260px, 320px" className="mx-auto h-auto w-[280px] object-contain sm:w-[380px] lg:w-[520px] xl:w-[600px]" />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.36em] text-[#B3B3B3] sm:text-xs">Powering Smart Living</p>
          </header>
          <div className="animate-fade-up [animation-delay:100ms] mt-10 text-center sm:mt-12">
            <div className="mb-4 flex items-center justify-center gap-2 text-energy">
              <Sparkles className="size-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.22em]">Belgium · Professional Electrical Solutions</span>
            </div>
            <h1 id="maintenance-heading" className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              SITE EN <span className="text-energy">MAINTENANCE</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#B3B3B3] sm:text-base">
              Notre nouvelle plateforme arrive bientôt.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-[70px] w-full max-w-7xl px-5 pb-10 sm:-mt-[80px] sm:px-8 sm:pb-14 lg:px-12">
        <section className="mx-auto w-full max-w-5xl" aria-label="Maintenance information">
          <article className="animate-fade-up [animation-delay:200ms] rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-energy/15 text-energy"><ShieldCheck className="size-5" aria-hidden="true" /></span>
                  <h2 className="text-lg font-semibold text-white">Une expérience à la hauteur de vos projets</h2>
                </div>
                <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#D0D0D0] sm:text-base">
                  <p>Notre site est actuellement en cours de maintenance afin de vous offrir une meilleure expérience.</p>
                  <p>Nous préparons une nouvelle plateforme pour présenter nos solutions professionnelles en installations électriques, Smart Home, énergie solaire, bornes de recharge, vidéosurveillance et réseaux.</p>
                  <p>Notre équipe reste disponible pour répondre à toutes vos demandes.</p>
                  <p className="font-medium text-white">Merci de votre confiance.</p>
                </div>

                <div className="my-7 h-px bg-gradient-to-r from-energy/50 via-white/10 to-transparent" />

                <div lang="en" className="space-y-4 text-[15px] leading-7 text-[#B3B3B3] sm:text-base">
                  <p>Our website is currently under maintenance while we prepare a new and improved experience.</p>
                  <p>We continue to provide professional electrical services throughout Belgium.</p>
                  <p>Feel free to contact us using the information below.</p>
                  <p className="font-medium text-white">Thank you for your trust.</p>
                </div>
              </div>

              <aside className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6" aria-labelledby="contact-heading">
                <div className="flex items-center gap-3">
                  <AtSign className="size-5 text-energy" aria-hidden="true" />
                  <h2 id="contact-heading" className="text-lg font-semibold">Contactez-nous</h2>
                </div>
                <address className="mt-5 space-y-4 not-italic text-sm leading-6 text-[#B3B3B3]">
                  <p className="font-semibold tracking-wide text-white">BELNEX ENERGY</p>
                  <a className="block transition hover:text-energy focus-visible:outline focus-visible:outline-2 focus-visible:outline-energy" href="mailto:contact@belnexenergy.be">contact@belnexenergy.be</a>
                  <a className="block transition hover:text-energy focus-visible:outline focus-visible:outline-2 focus-visible:outline-energy" href="mailto:offertes@belnexenergy.be">offertes@belnexenergy.be <span className="text-xs">(Sales)</span></a>
                  <a className="block transition hover:text-energy focus-visible:outline focus-visible:outline-2 focus-visible:outline-energy" href="mailto:finance@belnexenergy.be">finance@belnexenergy.be <span className="text-xs">(Finance)</span></a>
                  <a className="flex items-center gap-2 transition hover:text-energy focus-visible:outline focus-visible:outline-2 focus-visible:outline-energy" href="tel:+32471658910"><Phone className="size-4 text-energy" aria-hidden="true" /> +32 471 65 89 10</a>
                  <p className="flex items-center gap-2"><MapPin className="size-4 text-energy" aria-hidden="true" /> Beigem, Belgium</p>
                  <p className="flex items-center gap-2"><Building2 className="size-4 text-energy" aria-hidden="true" /> VAT / TVA: BE1038194067</p>
                </address>
              </aside>
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3">
              <ContactButton href="https://wa.me/32471658910" label="WhatsApp" description="Chat with our team" icon={<WhatsAppIcon className="size-6" />} />
              <ContactButton href="mailto:contact@belnexenergy.be" label="Send Email" description="contact@belnexenergy.be" icon={<Mail className="size-6" aria-hidden="true" />} />
              <ContactButton href="tel:+32471658910" label="Call Now" description="+32 471 65 89 10" icon={<Phone className="size-6" aria-hidden="true" />} />
            </div>
          </article>

          <section className="animate-fade-up [animation-delay:300ms] mt-8" aria-labelledby="services-heading">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
              <h2 id="services-heading" className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#B3B3B3]">Our expertise</h2>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5" aria-label="Services">
              {services.map((service) => (
                <li key={service} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-medium text-[#D0D0D0] transition hover:border-energy/40 hover:text-white">
                  <Check className="size-3.5 text-energy" aria-hidden="true" />{service}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid justify-items-center gap-3 sm:grid-cols-2">
              {featuredServices.map((service) => (
                <article key={service.title} className="group relative h-[220px] w-full max-w-[340px] overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-button transition duration-300 hover:shadow-glow lg:h-[240px] lg:max-w-[380px]">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 340px, 380px" className="object-cover transition duration-500 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{service.title}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="animate-fade-up [animation-delay:350ms] mt-10" aria-labelledby="projects-heading">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
              <h2 id="projects-heading" className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#B3B3B3]">Selected projects</h2>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <article key={project.title} className="group relative h-[240px] overflow-hidden rounded-[18px] border border-white/10 bg-black/30 shadow-button">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition duration-300 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/45" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">{project.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <footer className="animate-fade-up [animation-delay:400ms] border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-white">BELNEX ENERGY</p>
          <p className="mt-2 text-sm text-[#B3B3B3]">Professional Electrical Solutions</p>
          <p className="mx-auto mt-3 max-w-3xl text-xs leading-5 text-[#777]">Electrical Installations <span className="px-1.5 text-energy">•</span> Smart Home <span className="px-1.5 text-energy">•</span> Solar Energy <span className="px-1.5 text-energy">•</span> Battery Storage <span className="px-1.5 text-energy">•</span> EV Chargers <span className="px-1.5 text-energy">•</span> CCTV &amp; Networking</p>
          <p className="mt-3 text-xs text-[#777]">VAT: BE1038194067</p>
          <p className="mt-5 text-xs text-[#777]">© 2026 BELNEX ENERGY. All Rights Reserved.</p>
        </footer>
      </div>

      <a href="https://wa.me/32471658910" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="group fixed bottom-5 right-5 z-10 grid size-14 place-items-center rounded-full bg-energy text-canvas shadow-[0_8px_30px_rgba(102,204,0,0.35)] transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-energy sm:bottom-7 sm:right-7" >
        <span className="absolute inset-0 rounded-full animate-soft-pulse" aria-hidden="true" />
        <WhatsAppIcon className="relative size-7" />
        <span role="tooltip" className="pointer-events-none absolute right-[calc(100%+0.75rem)] whitespace-nowrap rounded-lg border border-white/10 bg-[#101010] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">Chat with us</span>
      </a>
    </main>
  );
}
