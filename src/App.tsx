import { useState, useEffect, useRef } from "react";
import "./styles.css";

/* ─────────────────────── data ─────────────────────── */

const PROPERTIES = [
  {
    id: 1,
    type: "Apartamento",
    title: "Apto Garden — Bairro Vítor Meireles",
    price: "R$ 485.000",
    beds: 3,
    baths: 2,
    area: "92 m²",
    tag: "Destaque",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
  {
    id: 2,
    type: "Casa",
    title: "Casa de Alto Padrão — Condomínio Serra Verde",
    price: "R$ 1.290.000",
    beds: 4,
    baths: 3,
    area: "280 m²",
    tag: "Novo",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
  },
  {
    id: 3,
    type: "Apartamento",
    title: "Studio Moderno — Centro Histórico",
    price: "R$ 298.000",
    beds: 1,
    baths: 1,
    area: "48 m²",
    tag: "Oportunidade",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    id: 4,
    type: "Terreno",
    title: "Terreno Comercial — Rodovia BR-282",
    price: "R$ 620.000",
    beds: 0,
    baths: 0,
    area: "1.200 m²",
    tag: "Exclusivo",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
  {
    id: 5,
    type: "Casa",
    title: "Casa com Piscina — Bairro Jardim Sul",
    price: "R$ 870.000",
    beds: 4,
    baths: 2,
    area: "320 m²",
    tag: "Destaque",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
  },
  {
    id: 6,
    type: "Apartamento",
    title: "Cobertura Duplex — Beira-Lago",
    price: "R$ 2.150.000",
    beds: 5,
    baths: 4,
    area: "380 m²",
    tag: "Alto Padrão",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Fernanda Oliveira",
    city: "Florianópolis, SC",
    text: "A SBS me ajudou a encontrar o apartamento perfeito em menos de 2 semanas. Atendimento impecável do início ao fim!",
    stars: 5,
    avatar: "FO",
  },
  {
    name: "Ricardo Mendes",
    city: "Porto Alegre, RS",
    text: "Vendi minha casa por um preço acima do mercado graças à estratégia de marketing deles. Recomendo sem hesitar.",
    stars: 5,
    avatar: "RM",
  },
  {
    name: "Carla Bittencourt",
    city: "Curitiba, PR",
    text: "Corretores extremamente profissionais e transparentes. Todo o processo foi tranquilo e bem explicado.",
    stars: 5,
    avatar: "CB",
  },
];

const STATS = [
  { value: "2.400+", label: "Imóveis vendidos" },
  { value: "18 anos", label: "De experiência" },
  { value: "97%", label: "Clientes satisfeitos" },
  { value: "3 estados", label: "Sul do Brasil" },
];

const SERVICES = [
  {
    icon: "🏠",
    title: "Compra e Venda",
    desc: "Intermediação profissional com análise de mercado, negociação e toda a parte jurídica incluída.",
  },
  {
    icon: "🔑",
    title: "Locação",
    desc: "Gestão completa de locações: divulgação, seleção de inquilinos, contratos e administração mensal.",
  },
  {
    icon: "📊",
    title: "Avaliação de Imóveis",
    desc: "Laudo técnico com base em metodologia reconhecida pelo CRECI e pelo mercado local.",
  },
  {
    icon: "💰",
    title: "Consultoria de Investimento",
    desc: "Análise de retorno, localização estratégica e tendências para quem quer investir com segurança.",
  },
  {
    icon: "📋",
    title: "Assessoria Jurídica",
    desc: "Parceria com escritórios especializados para contratos, due diligence e regularização de documentos.",
  },
  {
    icon: "🏦",
    title: "Financiamento",
    desc: "Parceria com os principais bancos para as melhores taxas e aprovação facilitada de crédito imobiliário.",
  },
];

/* ─────────────────────── component ─────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Comprar",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters = ["Todos", "Apartamento", "Casa", "Terreno"];
  const filtered =
    activeFilter === "Todos"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.type === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* ── NAVBAR ── */}
      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="nav-inner">
          <button className="logo" onClick={() => scrollTo("hero")}>
            <div className="logo-icon">SBS</div>
            <div>
              <div className="logo-title">SBS</div>
              <div className="logo-sub">IMOBILIÁRIA</div>
            </div>
          </button>

          <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
            {["Imóveis", "Serviços", "Sobre", "Depoimentos", "Contato"].map((item) => (
              <button
                key={item}
                className="nav-link"
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
            <button className="btn-nav-cta" onClick={() => scrollTo("contato")}>
              Fale Conosco
            </button>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={menuOpen ? "bar bar--top-open" : "bar"} />
            <span className={menuOpen ? "bar bar--mid-open" : "bar"} />
            <span className={menuOpen ? "bar bar--bot-open" : "bar"} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Mais de 2.400 famílias atendidas no Sul do Brasil
          </div>
          <h1 className="hero-title">
            Encontre o Imóvel <br />
            <span className="hero-accent">dos seus Sonhos</span>
          </h1>
          <p className="hero-sub">
            A SBS Imobiliária conecta você ao lar ideal com assessoria
            completa, transparência total e a expertise de quem conhece o
            mercado do sul do Brasil há 18 anos.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("imóveis")}>
              Ver Imóveis Disponíveis
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("contato")}>
              Falar com Especialista
            </button>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="trust-icon">✓</span> Avaliação gratuita</div>
            <div className="trust-item"><span className="trust-icon">✓</span> CRECI regularizado</div>
            <div className="trust-item"><span className="trust-icon">✓</span> Financiamento facilitado</div>
          </div>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo("stats")}>
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="stats-band">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── PROPERTIES ── */}
      <section id="imóveis" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Portfólio</span>
            <h2 className="section-title">Imóveis em Destaque</h2>
            <p className="section-sub">
              Selecionados com critério para atender diferentes perfis e
              objetivos de vida.
            </p>
          </div>

          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-tab ${activeFilter === f ? "filter-tab--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="properties-grid">
            {filtered.map((p) => (
              <div key={p.id} className="property-card">
                <div className="property-img-wrap">
                  <img src={p.img} alt={p.title} className="property-img" loading="lazy" />
                  <div className="property-tag">{p.tag}</div>
                  <div className="property-type-badge">{p.type}</div>
                </div>
                <div className="property-body">
                  <h3 className="property-title">{p.title}</h3>
                  <div className="property-price">{p.price}</div>
                  <div className="property-features">
                    {p.beds > 0 && <span className="feat">🛏 {p.beds} quartos</span>}
                    {p.baths > 0 && <span className="feat">🚿 {p.baths} banheiros</span>}
                    <span className="feat">📐 {p.area}</span>
                  </div>
                  <button className="btn-card" onClick={() => scrollTo("contato")}>
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="center-action">
            <button className="btn-outline" onClick={() => scrollTo("contato")}>
              Ver Todos os Imóveis
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="serviços" className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O que fazemos</span>
            <h2 className="section-title">Serviços Completos</h2>
            <p className="section-sub">
              Do primeiro contato até a entrega das chaves — estamos com você em cada etapa.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="sobre" className="section">
        <div className="container about-grid">
          <div className="about-img-side">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80"
              alt="Equipe SBS Imobiliária"
              className="about-img"
              loading="lazy"
            />
            <div className="about-badge">
              <div className="about-badge-num">18</div>
              <div className="about-badge-label">Anos de mercado</div>
            </div>
          </div>
          <div className="about-text-side">
            <span className="section-tag">Quem somos</span>
            <h2 className="section-title section-title--left">
              A Imobiliária que Conhece o Sul
            </h2>
            <p className="about-p">
              Fundada em 2006, a SBS Imobiliária nasceu do desejo de oferecer
              um atendimento diferenciado para quem busca imóveis nos estados do
              Rio Grande do Sul, Santa Catarina e Paraná.
            </p>
            <p className="about-p">
              Nossa equipe de mais de 40 corretores certificados atua com ética,
              transparência e profundo conhecimento dos mercados locais — do litoral
              catarinense às serras gaúchas.
            </p>
            <div className="about-points">
              {[
                "Corretores com CRECI ativo e treinamento contínuo",
                "Parceria com mais de 60 construtoras regionais",
                "Tecnologia de ponta para avaliação e marketing",
                "Suporte pós-venda e relacionamento duradouro",
              ].map((point) => (
                <div key={point} className="about-point">
                  <span className="point-check">✓</span>
                  {point}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => scrollTo("contato")}>
              Conheça Nossa Equipe
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="depoimentos" className="section section--dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag--light">Depoimentos</span>
            <h2 className="section-title section-title--light">O que Nossos Clientes Dizem</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">{"★".repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div className="cta-text">
            <h2 className="cta-title">Pronto para dar o próximo passo?</h2>
            <p className="cta-sub">
              Fale agora com um dos nossos especialistas. Atendimento rápido, sem compromisso.
            </p>
          </div>
          <div className="cta-buttons">
            <a
              href="https://wa.me/5548999999999?text=Ol%C3%A1!%20Tenho%20interesse%20em%20um%20im%C3%B3vel."
              className="btn-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <button className="btn-primary btn-primary--dark" onClick={() => scrollTo("contato")}>
              Enviar Mensagem
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contato" className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-tag">Contato</span>
            <h2 className="section-title section-title--left">Fale com um Especialista</h2>
            <p className="contact-sub">
              Preencha o formulário e um corretor entrará em contato em até 2 horas úteis.
            </p>
            <div className="contact-details">
              {[
                { icon: "📍", label: "Endereço", val: "Rua das Araucárias, 450 — Florianópolis, SC" },
                { icon: "📞", label: "Telefone", val: "(48) 3456-7890" },
                { icon: "📧", label: "E-mail", val: "contato@sulbrasilimobiliaria.com.br" },
                { icon: "🕐", label: "Atendimento", val: "Seg–Sex: 8h–18h | Sáb: 9h–13h" },
              ].map((d) => (
                <div key={d.label} className="contact-detail">
                  <span className="contact-icon">{d.icon}</span>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    <div className="contact-detail-val">{d.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="success-msg">
                <div className="success-icon">✓</div>
                <h3>Mensagem enviada!</h3>
                <p>Obrigado pelo contato. Um especialista entrará em contato em breve.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nome completo *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Seu nome"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone / WhatsApp *</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="(48) 99999-9999"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tenho interesse em</label>
                  <select
                    className="form-input"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option>Comprar</option>
                    <option>Vender</option>
                    <option>Alugar</option>
                    <option>Investir</option>
                    <option>Avaliar meu imóvel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Mensagem</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Descreva o imóvel que você busca ou deixe sua dúvida..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary btn-full">
                  Quero Falar com um Especialista
                </button>
                <p className="form-disclaimer">🔒 Seus dados estão protegidos. Não fazemos spam.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <div className="logo-icon">SBS</div>
              <div>
                <div className="logo-title">SBS</div>
                <div className="logo-sub">IMOBILIÁRIA</div>
              </div>
            </div>
            <p className="footer-tagline">
              Conectando pessoas aos melhores imóveis do Sul do Brasil desde 2006.
            </p>
            <p className="footer-creci">CRECI-SC 12.345 | CRECI-RS 67.890 | CRECI-PR 34.567</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navegação</h4>
            {["Imóveis", "Serviços", "Sobre nós", "Depoimentos", "Contato"].map((item) => (
              <button
                key={item}
                className="footer-link"
                onClick={() => scrollTo(item.toLowerCase().replace(" nós", "").replace(" ", ""))}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Tipos de Imóvel</h4>
            {["Apartamentos", "Casas", "Terrenos", "Comerciais", "Lançamentos"].map((t) => (
              <button key={t} className="footer-link" onClick={() => scrollTo("imóveis")}>
                {t}
              </button>
            ))}
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contato Rápido</h4>
            <p className="footer-contact">(48) 3456-7890</p>
            <p className="footer-contact">contato@sulbrasilimobiliaria.com.br</p>
            <a
              href="https://wa.me/5548999999999"
              className="btn-whatsapp-sm"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 SBS Imobiliária. Todos os direitos reservados.</p>
          <p>Desenvolvido com ❤ no Sul do Brasil</p>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/5548999999999?text=Ol%C3%A1!%20Tenho%20interesse%20em%20um%20im%C3%B3vel."
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Contato pelo WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
