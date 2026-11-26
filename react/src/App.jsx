 import { useState, useEffect } from "react";
import "./App.css";

/* ===== ДАННЫЕ: 30 страниц ===== */
const GROUPS = [
  ["Услуги", "c-blue", ["Сайты", "Приложения", "Брендинг", "Реклама", "SEO", "Поддержка"]],
  ["Работы", "c-pink", ["Кафе «Ветер»", "Банк «Орбита»", "Фитнес «Рывок»", "Школа «Искра»", "Маркет «Лавка»", "Музей «Эхо»"]],
  ["Компания", "c-lemon", ["О нас", "Команда", "Вакансии", "Новости", "Блог", "Награды"]],
  ["Ресурсы", "c-mint", ["Гайды", "Шаблоны", "Видео", "Подкаст", "Словарь", "Инструменты"]],
  ["Помощь", "c-blue", ["Цены", "Вопросы", "Доставка", "Гарантии", "Договор", "Поддержка 24/7"]],
];
const PAGES = [{ id: "home", title: "Главная", group: "Главная", color: "c-blue" }];
GROUPS.forEach(([g, c, items]) =>
  items.forEach((t, i) => PAGES.push({ id: `p${PAGES.length}`, title: t, group: g, color: c, n: i + 1 }))
);
PAGES.pop(); // ровно 30: главная + 29 внутренних

const useRoute = () => {
  const get = () => location.hash.slice(1) || "home";
  const [r, setR] = useState(get());
  useEffect(() => {
    const f = () => { setR(get()); window.scrollTo(0, 0); };
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return r;
};

/* ===== КОМПОНЕНТЫ (10) ===== */
const Navbar = ({ route }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a href="#home" className="logo">ВОЛНА<i>!</i></a>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Меню">☰</button>
      <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
        {GROUPS.map(([g, , items], gi) => {
          const first = PAGES.find((p) => p.group === g);
          return <a key={g} href={`#${first.id}`} className={PAGES.find((p) => p.id === route)?.group === g ? "on" : ""}>{g}</a>;
        })}
        <a href="#contact" className="btn small">Связаться</a>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="hero">
    <h1>Делаем сайты,<br />которые <span className="blob">заряжают</span></h1>
    <p>Яркий дизайн, быстрый код, результат с первого дня. 30 страниц истории и услуг — выбирайте.</p>
    <div className="row">
      <a href="#p1" className="btn">Смотреть услуги</a>
      <a href="#contact" className="btn ghost">Обсудить проект</a>
    </div>
  </section>
);

const Marquee = () => (
  <div className="marquee"><div>
    {Array(2).fill(["ДИЗАЙН", "КОД", "БРЕНД", "РОСТ", "СМЕЛОСТЬ", "СКОРОСТЬ"]).flat().map((w, i) => <span key={i}>{w} ✦</span>)}
  </div></div>
);

const Stats = () => (
  <section className="stats">
    {[["250+", "проектов"], ["12 лет", "на рынке"], ["98%", "клиентов остаются"], ["24/7", "поддержка"]].map(([a, b], i) => (
      <div key={i} className={`stat s${i}`}><b>{a}</b><span>{b}</span></div>
    ))}
  </section>
);

const Card = ({ p }) => (
  <a href={`#${p.id}`} className={`card ${p.color}`}>
    <small>{p.group}</small>
    <h3>{p.title}</h3>
    <span>Открыть</span>
  </a>
);

const Grid = ({ items, title }) => (
  <section className="block">
    <h2>{title}</h2>
    <div className="grid">{items.map((p) => <Card key={p.id} p={p} />)}</div>
  </section>
);

const Pricing = () => (
  <section className="block">
    <h2>Тарифы</h2>
    <div className="grid three">
      {[["Старт", "49 000 ₽", "Лендинг до 5 блоков"], ["Рост", "129 000 ₽", "Многостраничный сайт"], ["Мощь", "от 300 000 ₽", "Сайт + приложение"]].map(([n, pr, d], i) => (
        <div key={n} className={`price ${i === 1 ? "top" : ""}`}>
          <h3>{n}</h3><b>{pr}</b><p>{d}</p><a href="#contact" className="btn small">Выбрать</a>
        </div>
      ))}
    </div>
  </section>
);

const Faq = () => {
  const [o, setO] = useState(0);
  const q = [["Сколько занимает работа?", "Лендинг — от 7 дней, большой сайт — от 4 недель."], ["Есть ли поддержка?", "Да, 24/7 и бесплатный месяц после запуска."], ["Можно ли вносить правки?", "Три круга правок входят в любой тариф."]];
  return (
    <section className="block">
      <h2>Вопросы</h2>
      {q.map(([a, b], i) => (
        <div key={i} className={`faq ${o === i ? "open" : ""}`}>
          <button onClick={() => setO(o === i ? -1 : i)}>{a}<i>{o === i ? "−" : "+"}</i></button>
          {o === i && <p>{b}</p>}
        </div>
      ))}
    </section>
  );
};

const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <section className="block contact" id="contact">
      <h2>Расскажите о проекте</h2>
      {sent ? <p className="ok">Отправлено! Ответим в течение часа.</p> : (
        <div className="form">
          <input placeholder="Ваше имя" />
          <input placeholder="Телефон или e-mail" />
          <textarea placeholder="Что хотите сделать?" rows="3" />
          <button className="btn" onClick={() => setSent(true)}>Отправить заявку</button>
        </div>
      )}
    </section>
  );
};

const PageView = ({ page }) => {
  const idx = PAGES.findIndex((p) => p.id === page.id);
  const prev = PAGES[idx - 1], next = PAGES[idx + 1];
  return (
    <article className="page">
      <div className={`banner ${page.color}`}>
        <small>{page.group}</small>
        <h1>{page.title}</h1>
      </div>
      <div className="text">
        <p>Страница «{page.title}» — раздел {idx + 1} из {PAGES.length}. Здесь коротко и понятно рассказываем, как это работает и что вы получите.</p>
        <p>Мы начинаем с цели, а не с картинки: сначала разбираемся, зачем нужен проект, затем быстро показываем первый рабочий вариант.</p>
        <ul><li>Прозрачные сроки и цена</li><li>Живой прототип на третий день</li><li>Результат, который можно измерить</li></ul>
        <a href="#contact" className="btn" onClick={() => setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50)}>Обсудить</a>
      </div>
      <div className="pager">
        {prev ? <a href={`#${prev.id}`}>← {prev.title}</a> : <span />}
        {next && <a href={`#${next.id}`}>{next.title} →</a>}
      </div>
    </article>
  );
};

const Footer = () => (
  <footer className="foot">
    <b>ВОЛНА!</b>
    <div>{PAGES.slice(1).map((p) => <a key={p.id} href={`#${p.id}`}>{p.title}</a>)}</div>
    <small>© 2026 Студия «Волна»</small>
  </footer>
);

/* ===== ПРИЛОЖЕНИЕ ===== */
export default function App() {
  const route = useRoute();
  const page = PAGES.find((p) => p.id === route);
  return (
    <>
      <Navbar route={route} />
      <main>
        {!page || page.id === "home" ? (
          <>
            <Hero /><Marquee /><Stats />
            <Grid title="Что мы делаем" items={PAGES.filter((p) => p.group === "Услуги")} />
            <Grid title="Свежие работы" items={PAGES.filter((p) => p.group === "Работы")} />
            <Pricing /><Faq />
          </>
        ) : <PageView page={page} />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}