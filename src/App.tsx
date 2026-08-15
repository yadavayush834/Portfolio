import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Code2, FileText, Github, Mail, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { featuredWork, gallery, journey, navItems, projects, skillGroups } from './data'

gsap.registerPlugin(ScrollTrigger)

const revealImages = ['/reveal/i1.png', '/reveal/i2.jpg', '/reveal/i3.jpg', '/reveal/i4.jpg', '/reveal/i5.jpg']

function IntroReveal({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const context = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLImageElement>('.loader-intro__image')
      const wrapper = root.querySelector<HTMLElement>('.loader-intro__image-wrapper')
      if (!wrapper || images.length === 0) return

      gsap.set(images, { opacity: 0, scale: 1.12 })
      gsap.set(images[0], { opacity: 1 })
      gsap.set('.loader-intro__progress', { scaleX: 0, transformOrigin: 'left' })

      const timeline = gsap.timeline({ delay: .35, onComplete })
      timeline
        .to('.loader-intro__progress', { scaleX: 1, duration: 5.15, ease: 'none' }, 0)
        .to(wrapper, { width: () => window.innerWidth <= 700 ? '17vw' : 'clamp(145px, 13.5vw, 220px)', duration: .75, ease: 'power3.inOut' }, 0)

      images.slice(1).forEach((image, index) => {
        const previous = images[index]
        const position = 1.15 + index * .62
        timeline
          .to(previous, { opacity: 0, scale: 1.18, duration: .15, ease: 'power2.in' }, position)
          .to(image, { opacity: 1, scale: 1.08, duration: .21, ease: 'power2.out' }, position)
      })

      timeline
        .to('.loader-intro__text--left', { x: '-9vw', opacity: 0, duration: .7, ease: 'power3.in' }, 4)
        .to('.loader-intro__text--right', { x: '9vw', opacity: 0, duration: .7, ease: 'power3.in' }, 4)
        .to(wrapper, { scale: .88, opacity: 0, duration: .66, ease: 'power3.in' }, 4.06)
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut' }, 4.45)
    }, root)

    return () => context.revert()
  }, [onComplete])

  return (
    <div className="loader-intro" ref={rootRef} aria-label="Ayush Yadav opening image sequence">
      <div className="loader-intro__progress" aria-hidden="true" />
      <div className="loader-intro__name-loader">
        <div className="loader-intro__text loader-intro__text--left">Ayush</div>
        <div className="loader-intro__image-wrapper">
          {revealImages.map((src, index) => (
            <img className="loader-intro__image" src={src} alt={`Opening artwork ${index + 1}`} key={src} />
          ))}
        </div>
        <div className="loader-intro__text loader-intro__text--right">Yadav</div>
      </div>
    </div>
  )
}

function FloralMark() {
  return (
    <svg className="floral-mark" viewBox="0 0 420 520" role="img" aria-label="Abstract tropical flower illustration">
      <defs>
        <linearGradient id="petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f0df" />
          <stop offset="1" stopColor="#9dd5ee" />
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="18" floodOpacity=".35" /></filter>
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="2" filter="url(#shadow)">
        <path className="stem" d="M213 501c-10-110 8-179 0-277" />
        <path fill="url(#petal)" d="M211 246C119 209 66 146 70 77c77 6 135 64 141 169Z" />
        <path fill="#c7ff18" d="M213 247c4-101 46-171 115-203 26 71-13 159-115 203Z" />
        <path fill="#2ec4ff" d="M212 247C104 260 31 232 8 168c73-27 158 4 204 79Z" />
        <path fill="#ee5c25" d="M216 248c86-44 159-42 196 6-46 58-135 51-196-6Z" />
        <path fill="#f3e8d2" d="M214 245c-32-88-17-159 40-197 49 59 28 145-40 197Z" />
        <circle cx="213" cy="246" r="34" fill="#0b0b0b" />
        <circle cx="213" cy="246" r="9" fill="#c7ff18" stroke="none" />
        <path d="M204 356c-56-23-93-17-127 21 46 23 87 12 127-21Z" fill="#2ec4ff" />
        <path d="M220 406c59-28 105-23 137 16-56 28-98 15-137-16Z" fill="#c7ff18" />
      </g>
    </svg>
  )
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const greetings = ['Hello://', 'Hola://', 'नमस्ते://', 'おはよう://', 'Bonjour://', '你好://', '안녕하세요://', 'Olá://']
  const [greetingIndex, setGreetingIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % greetings.length)
    }, 1800)
    return () => window.clearInterval(interval)
  }, [greetings.length])

  return (
    <>
      <header className={`site-header ${menuOpen ? 'is-menu-open' : ''}`}>
        <a className="site-header__greeting" href="#top" aria-label={`Greeting: ${greetings[greetingIndex]}`}>
          <span className="site-header__greeting-text" key={greetings[greetingIndex]}>{greetings[greetingIndex]}</span>
        </a>
        <a className="site-header__name" href="#top">Ayush Yadav</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch>
        {menuOpen && <video className="menu-panel__video" src="/menu/spiderman.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />}
        <div className="menu-panel__veil" aria-hidden="true" />
        <div className="menu-panel__meta mono">INDEX://2026</div>
        <nav className="menu-panel__links" aria-label="Main menu">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              <sup>{item.number}</sup>
              <span>{item.label}</span>
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <div className="menu-panel__foot mono">
          <span>DELHI — INDIA / 28.6139° N</span>
          <a href="/Ayush-Yadav-Resume.pdf" download><FileText size={14} /> DOWNLOAD RÉSUMÉ</a>
        </div>
      </div>
    </>
  )
}

function SideIndex() {
  const [active, setActive] = useState('about')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const observers = navItems.map((item) => {
      const element = document.querySelector(item.href)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(item.href.slice(1))
      }, { rootMargin: '-40% 0px -50% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY < window.innerHeight * 0.68)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <nav className={`side-index ${visible ? 'is-visible' : ''}`} aria-label="Section index" aria-hidden={!visible}>
      {navItems.map((item) => (
        <a key={item.href} className={active === item.href.slice(1) ? 'is-active' : ''} href={item.href}>
          <span>{item.number}</span>{item.label}
        </a>
      ))}
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__ticker" aria-hidden="true">
        <span>2026</span><span>AYUSH — YADAV</span><span>＋</span><span>BUILD / LEARN / SHIP</span><span>PORTFOLIO</span><span>＋</span>
      </div>
      <div className="hero__location mono"><span>28.6139° N — 77.2090° E</span> DELHI, INDIA</div>
      <div className="hero__copy">
        <div className="hero__eyebrow mono">SCALABLE APPLICATIONS / APPLIED INTELLIGENCE</div>
        <h1>
          <span>Backend</span>
          <em>&amp;</em>
          <span>AI Systems</span>
        </h1>
        <div className="hero__roles mono">BACKEND DEVELOPER <i /> AI BUILDER <i /> OPEN SOURCE CONTRIBUTOR</div>
      </div>
      <div className="hero__flower-wrap">
        <FloralMark />
        <div className="hero__flower-note mono">SYSTEMS IN MOTION<br />BUILT WITH INTENT</div>
      </div>
      <a className="hero__scroll mono" href="#about"><span>SCROLL DOWN</span><ArrowDown size={16} /></a>
      <div className="hero__edition mono">AYUSH YADAV / VOL. 01<br />DELHI — 2026</div>
    </section>
  )
}

function SectionTitle({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-title ${light ? 'section-title--light' : ''}`}>
      <span className="mono">({number})</span>
      <h2>{children}</h2>
      <span className="section-title__line" />
    </div>
  )
}

function About() {
  return (
    <section className="about paper-section" id="about">
      <div className="marquee" aria-hidden="true"><div>ABOUT ME — ABOUT ME — ABOUT ME — ABOUT ME —&nbsp;</div></div>
      <div className="content-grid about__content">
        <div className="about__label mono">PROFILE://</div>
        <div className="about__statement reveal-copy">
          <p>I build scalable backend systems where real-time interaction meets practical intelligence.</p>
          <p>My work spans secure APIs, WebSockets, computer vision, and AI products designed to solve tangible problems.</p>
        </div>
        <div className="about__portrait" aria-label="Graphic portrait placeholder">
          <div className="about__portrait-grid" />
          <div className="about__portrait-head" />
          <div className="about__portrait-body" />
          <span className="mono">AY / 2026</span>
        </div>
        <p className="about__secondary reveal-copy">I am a Computer Science student in Delhi, currently building AI recommendations for IndiaHandmade.com and contributing to open source through GSSoC. I care about useful systems, clear architecture, and steady iteration.</p>
        <div className="about__stats">
          <div><strong>8.64</strong><span>Overall B.Tech<br />CGPA</span></div>
          <div><strong>200+</strong><span>Algorithm problems<br />solved</span></div>
          <div><strong>03</strong><span>Core practices<br />backend / AI / security</span></div>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="journey dark-section" id="journey">
      <SectionTitle number="02" light>My Journey</SectionTitle>
      <div className="journey__intro">
        <p className="mono">EDUCATION × EXPERIENCE</p>
        <h3>A path shaped by<br /><em>curiosity</em> and code.</h3>
      </div>
      <div className="journey__timeline">
        {journey.map((item, index) => (
          <article className="journey__item" key={item.year + item.role}>
            <span className="journey__dot" />
            <div className="journey__year">{item.year}</div>
            <div className="journey__role"><span className="mono">0{index + 1}</span><h4>{item.role}</h4><p>{item.place}</p></div>
            <p className="journey__text">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkArtwork({ work }: { work: typeof featuredWork[number] }) {
  return (
    <div className={`work-art work-art--${work.tone}`}>
      <div className="work-art__grid" />
      <div className="work-art__orb" />
      <strong>{work.monogram}</strong>
      <span className="mono">CASE STUDY / {work.index}</span>
      <svg viewBox="0 0 500 300" aria-hidden="true">
        <path d="M-20 220C60 100 160 330 245 160S395 60 520 140" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-20 250C80 140 150 350 265 190S410 100 520 180" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
      </svg>
    </div>
  )
}

function SelectedWork() {
  return (
    <section className="selected-work paper-section" id="selected-work">
      <SectionTitle number="03">Selected Work</SectionTitle>
      <div className="selected-work__lead">
        <p className="mono">A SHORT SELECTION / 2025—2026</p>
        <h3>Ideas turned into<br />working systems.</h3>
      </div>
      <div className="work-list">
        {featuredWork.map((work) => (
          <article className="work-card" key={work.title}>
            <div className="work-card__meta mono"><span>({work.index})</span><span>{work.stack}</span></div>
            <WorkArtwork work={work} />
            <div className="work-card__title"><h4>{work.title}</h4><p>{work.subtitle}</p><a className="work-card__link" href={work.href} target="_blank" rel="noreferrer" aria-label={`Open ${work.title} on GitHub`}><ArrowUpRight /></a></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects blue-section" id="projects">
      <SectionTitle number="04" light>Projects</SectionTitle>
      <div className="projects__list">
        {projects.map(({ name, type, stack, href }, index) => (
          <a href={href} target="_blank" rel="noreferrer" className="project-row" key={name}>
            <span className="mono">0{index + 1}</span>
            <h3>{name}</h3>
            <p>{type}</p>
            <p className="mono">{stack}</p>
            <ArrowUpRight />
          </a>
        ))}
      </div>
      <div className="projects__stamp mono"><span>OPEN TO</span><strong>COLLABORATION</strong><span>DELHI / REMOTE</span></div>
    </section>
  )
}

function SkillsField() {
  const fieldRef = useRef<HTMLDivElement>(null)

  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    const field = fieldRef.current
    if (!field) return
    const rect = field.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    field.style.setProperty('--skill-rx', `${(0.5 - y) * 8}deg`)
    field.style.setProperty('--skill-ry', `${(x - 0.5) * 10}deg`)
    field.style.setProperty('--skill-x', `${x * 100}%`)
    field.style.setProperty('--skill-y', `${y * 100}%`)
  }

  const resetTilt = () => {
    const field = fieldRef.current
    if (!field) return
    field.style.setProperty('--skill-rx', '0deg')
    field.style.setProperty('--skill-ry', '0deg')
    field.style.setProperty('--skill-x', '50%')
    field.style.setProperty('--skill-y', '20%')
  }

  return (
    <div className="skills-field" ref={fieldRef} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <div className="skills-field__topline">
        <span className="mono">TECHNICAL MATRIX://</span>
        <span className="mono">RÉSUMÉ + GITHUB / VERIFIED 2026</span>
      </div>
      <div className="skills-field__grid">
        {skillGroups.map((group) => (
          <article className="skill-cluster" key={group.category}>
            <div className="skill-cluster__head">
              <span className="mono">({group.number})</span>
              <span className="mono">{group.source}</span>
            </div>
            <h4>{group.category}</h4>
            <div className="skill-cluster__list">
              {group.skills.map((skill, index) => <span key={skill}><i>{String(index + 1).padStart(2, '0')}</i>{skill}</span>)}
            </div>
          </article>
        ))}
      </div>
      <div className="skills-field__cursor-note mono">MOVE CURSOR / TILT THE MATRIX</div>
    </div>
  )
}

function Skills() {
  return (
    <section className="skills-section dark-section" id="skills">
      <SectionTitle number="05" light>Skills</SectionTitle>
      <div className="skills-section__intro"><h3>Tools are temporary.<br /><em>Learning</em> is the skill.</h3><p>Languages, backend APIs, applied machine learning, real-time communication, and data platforms—validated across the résumé and live project work.</p></div>
      <SkillsField />
    </section>
  )
}

function Gallery() {
  return (
    <section className="gallery-section paper-section" id="gallery">
      <SectionTitle number="06">Gallery</SectionTitle>
      <div className="gallery-section__heading"><h3>Outside<br />the editor.</h3><p className="mono">MOMENTS / REFERENCES / PROCESS</p></div>
      <div className="gallery-track">
        {gallery.map((item, index) => (
          <figure className={`gallery-card gallery-card--${item.tone}`} key={item.label}>
            <div className="gallery-card__visual"><span>{item.label}</span><i /><b>{String(index + 1).padStart(2, '0')}</b></div>
            <figcaption><span>{item.caption}</span><span className="mono">AY—{index + 1}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__orb" />
      <p className="mono">HAVE A PROJECT, AN IDEA, OR JUST WANT TO SAY HELLO?</p>
      <h2>Let’s make<br /><em>something real.</em></h2>
      <a className="footer__email" href="mailto:ayushwell100@gmail.com">ayushwell100@gmail.com <ArrowUpRight /></a>
      <div className="footer__bottom">
        <span className="mono">© 2026 — DELHI, INDIA</span>
        <div>
          <a href="https://github.com/yadavayush834" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href="https://leetcode.com/u/ayushwell100" target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 /></a>
          <a href="/Ayush-Yadav-Resume.pdf" download aria-label="Download resume"><FileText /></a>
          <a href="mailto:ayushwell100@gmail.com" aria-label="Email"><Mail /></a>
        </div>
        <a href="#top" className="mono">BACK TO TOP ↑</a>
      </div>
    </footer>
  )
}

function Terminal() {
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const response = useMemo(() => command.trim().toLowerCase() === 'sudo hire-me' ? 'ACCESS GRANTED — email ayushwell100@gmail.com' : command ? `command not found: ${command}` : 'type “sudo hire-me” and press enter', [command])
  return (
    <div className={`terminal ${open ? 'is-open' : ''}`}>
      {open && <div className="terminal__window"><div className="terminal__bar"><span>AY://TERMINAL</span><button onClick={() => setOpen(false)}><X size={15} /></button></div><p>{response}</p><form onSubmit={(event) => event.preventDefault()}><span>$</span><input value={command} onChange={(event) => setCommand(event.target.value)} autoFocus aria-label="Terminal command" /></form></div>}
      <button className="terminal__toggle mono" onClick={() => setOpen(!open)} aria-label="Open terminal">&gt;_</button>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (loading) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ duration: reduced ? 0 : 1.05, smoothWheel: !reduced })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.hero__copy > *', { y: 70, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' })
      gsap.from('.floral-mark', { scale: 0.72, rotate: -10, opacity: 0, duration: 1.35, ease: 'expo.out' })
      gsap.to('.floral-mark', { rotate: 8, y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.utils.toArray<HTMLElement>('.section-title, .reveal-copy, .journey__item, .work-card, .project-row').forEach((element) => {
        gsap.from(element, { y: 55, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%' } })
      })
      media.add('(min-width: 701px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.gallery-card')
        const animation = gsap.to(cards, { xPercent: -72 * (cards.length - 1), ease: 'none', scrollTrigger: { trigger: '.gallery-section', start: 'top top', end: '+=4000', pin: true, scrub: 1, invalidateOnRefresh: true } })
        return () => animation.kill()
      })
    })

    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => { media.revert(); context.revert(); cancelAnimationFrame(frame); lenis.destroy() }
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = menuOpen || loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, loading])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {loading && <IntroReveal onComplete={() => setLoading(false)} />}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SideIndex />
      <main>
        <Hero />
        <About />
        <Journey />
        <SelectedWork />
        <Projects />
        <Skills />
        <Gallery />
      </main>
      <Footer />
      <Terminal />
    </>
  )
}

export default App
