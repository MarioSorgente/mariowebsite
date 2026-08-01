import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Copy, MapPin } from 'lucide-react';
import Navigation from './Navigation';
import { chapters, certifications, education, expertise, languages, metrics, publications, type Company, type Role } from '../data/backgroundData';
import './background.css';

const linkedIn = 'https://www.linkedin.com/in/mario-sorgente';
const highlight = (text: string) => {
  const parts = text.split(/(TRL 8|1,000|170|120%|125%|99\.8%|95%|30%|28%|20%|1 to 7|15\+)/g);
  return <>{parts.map((part, i) => /\d/.test(part) ? <strong key={i}>{part}</strong> : part)}</>;
};

function SectionHeading({ label, title }: { label: string; title: string }) {
  return <header className="bg-section-heading"><p>{label}</p><h2>{title}</h2></header>;
}

function AchievementList({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = role.achievements.length > 4;
  return <>
    {role.summary && <p className="role-summary">{role.summary}</p>}
    <ul className={expanded ? '' : 'achievements-collapsed'}>{role.achievements.map((item, i) => <li key={i}>{highlight(item)}</li>)}</ul>
    {hasMore && <button className="expand-control no-print" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show concise view' : 'View full contribution'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>}
    {role.technologies && <div className="tag-row">{role.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>}
  </>;
}

function CompanyBlock({ company }: { company: Company }) {
  return <article className="company-block">
    <header className="company-header"><div><h3>{company.name}</h3>{company.description && <p>{company.description}</p>}</div>{company.totalTenure && <time>{company.totalTenure}</time>}</header>
    <div className="role-list">{company.roles.map(role => <section className="role-block" key={`${role.title}-${role.dates}`}><div className="role-dot" /><header><div><h4>{role.title}</h4>{role.location && <p><MapPin size={13} />{role.location}</p>}</div><time>{role.dates}</time></header><AchievementList role={role} /></section>)}</div>
    {company.tags && <div className="tag-row company-tags">{company.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
  </article>;
}

export default function Background() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { await navigator.clipboard.writeText('ms.sorgente@gmail.com'); setCopied(true); window.setTimeout(() => setCopied(false), 2200); };
  return <div className="background-page">
    <Navigation />
    <main>
      <section className="background-hero" aria-labelledby="background-title">
        <div className="bg-container hero-grid"><div><p className="eyebrow">Senior Product Manager · AI Product Builder</p><h1 id="background-title">Mario Sorgente</h1><h2>Building AI, platform and SaaS products from ambiguity to scale.</h2></div><div className="hero-copy"><p>Senior Product Manager with 6+ years of experience building B2B and B2C products across AI systems, LLM-powered workflows, agent design, SaaS platforms, energy and deep-tech.</p><p>I turn complex technical and commercial problems into focused product strategies, intuitive experiences and scalable products.</p><div className="hero-actions"><a className="primary-action" href="#experience">View experience <ArrowDownRight size={17}/></a><a className="text-action" href={linkedIn}>LinkedIn profile <ArrowUpRight size={16}/></a></div><address><span><MapPin size={15}/>The Randstad, Netherlands</span><a href="mailto:ms.sorgente@gmail.com">ms.sorgente@gmail.com</a><a href="tel:+31687206252">+31 687206252</a></address></div></div>
        <div className="bg-container status-line"><span /><p>Product leadership · AI products · Platform strategy</p></div>
      </section>

      <section className="metrics-section" aria-label="Selected impact"><div className="bg-container metrics-row">{metrics.map(([value,label]) => <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section id="profile" className="bg-section"><div className="bg-container"><SectionHeading label="Profile" title="Product direction where technology, users and business meet."/><div className="profile-layout"><div className="profile-copy"><p>Mario is a Senior Product Manager and product builder with experience across AI, SaaS, platform products, energy systems, deep-tech hardware and B2C digital products.</p><p>He specialises in turning ambiguous opportunities into clear product direction, leading cross-functional teams and taking products from discovery and validation through launch and scale.</p><p>His work spans public APIs, LLM workflows, AI agents, platform architecture, product packaging, onboarding, access control and hardware-software systems.</p><p>He combines strategy, technical understanding, UX thinking and commercial awareness to create products that are useful, explainable and viable.</p></div><div className="pillars">{[['Product Strategy','Vision, discovery, prioritisation, roadmaps, business models and go-to-market.'],['AI Product Development','LLM workflows, AI agents, NLP, evaluation, safeguards and human review.'],['Platform & SaaS','Public APIs, RBAC, multitenancy, integrations, onboarding and scalable architecture.']].map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></div></section>

      <section id="experience" className="bg-section experience-section"><div className="bg-container"><SectionHeading label="Experience" title="Four chapters. One product-building practice."/>{chapters.map(chapter => <div className="chapter" id={chapter.id} key={chapter.id}><aside><span>Chapter {chapter.number}</span><h3>{chapter.title}</h3><p>{chapter.introduction}</p></aside><div>{chapter.companies.map(company => <CompanyBlock company={company} key={company.name}/>)}</div></div>)}</div></section>

      <section id="expertise" className="bg-section expertise-section"><div className="bg-container"><SectionHeading label="Core expertise" title="Strategy grounded in technical fluency."/><div className="expertise-grid">{Object.entries(expertise).map(([group,items],i)=><article key={group}><span>0{i+1}</span><h3>{group}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

      <section id="education" className="bg-section credentials-section"><div className="bg-container"><SectionHeading label="Education & credentials" title="Engineering depth, continuously extended."/><div className="credentials-grid"><div className="education-list">{education.map(([school,degree,field,dates])=><article key={`${school}-${degree}`}><div><h3>{school}</h3><p>{degree}</p><span>{field}</span></div><time>{dates}</time></article>)}</div><aside><h3>Languages</h3>{languages.map(([language,level])=><p key={language}><strong>{language}</strong><span>{level}</span></p>)}<h3>Certifications</h3><ul>{certifications.map(item=><li key={item}>{item}</li>)}</ul></aside></div></div></section>

      <section className="bg-section publications-section"><div className="bg-container"><SectionHeading label="Publications" title="Selected writing and research."/><ol>{publications.map((title,i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><p>{title}</p></li>)}</ol></div></section>
    </main>
    <footer id="contact" className="background-contact"><div className="bg-container contact-grid"><div><p className="eyebrow">Start a conversation</p><h2>Let’s build something people can understand, use and scale.</h2><p>Open to senior product leadership, fractional product work and collaborations involving AI products, SaaS platforms and technically complex systems.</p></div><address><strong>Mario Sorgente</strong><a href="mailto:ms.sorgente@gmail.com">ms.sorgente@gmail.com</a><a href="tel:+31687206252">+31 687206252</a><span>The Randstad, Netherlands</span><div><a className="contact-cta" href={linkedIn}>Connect on LinkedIn <ArrowUpRight size={17}/></a><button type="button" onClick={copyEmail}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'Email copied' : 'Copy email address'}</button></div></address></div><div className="bg-container footer-line"><span>© 2026 Mario Sorgente</span><a href="/">Return to main website</a></div></footer>
  </div>;
}
