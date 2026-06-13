const news = [
  {
    id: 1,
    title: "Government prepares digital service plan for local offices",
    category: "Politics",
    time: "12 min ago",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80",
    summary: "The new plan aims to make public services faster, simpler, and easier to access from local levels.",
    body: "Government officials say the program will focus on online records, public complaints, and faster document processing. Local offices are expected to receive training and digital tools in phases.",
    trending: true,
    breaking: true
  },
  {
    id: 2,
    title: "Popular actor announces new Nepali feature film",
    category: "Celebrity",
    time: "35 min ago",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
    summary: "The production team says the film will bring a fresh story, original music, and a wide release plan.",
    body: "A well-known actor has confirmed a new movie project with a young creative team. Filming is expected to begin soon after final casting and location work.",
    trending: true,
    breaking: false
  },
  {
    id: 3,
    title: "Short video from Gorkha market goes viral online",
    category: "Viral",
    time: "1 hour ago",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80",
    summary: "A cheerful street moment has gained attention for its humor, timing, and local flavor.",
    body: "The clip has been shared widely across social media platforms. Viewers praised the natural humor and the glimpse of everyday life in Nepal's hill markets.",
    trending: true,
    breaking: true
  },
  {
    id: 4,
    title: "Nepali startup launches accounting app for small shops",
    category: "Technology",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    summary: "The mobile-first tool helps shop owners track sales, credit, expenses, and inventory.",
    body: "The startup says its app is designed for small retailers who need simple bookkeeping. The team plans to add Nepali language support and offline features.",
    trending: false,
    breaking: false
  },
  {
    id: 5,
    title: "Parties begin internal talks before parliament session",
    category: "Politics",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=80",
    summary: "Leaders are preparing agendas on governance, jobs, economy, and public service reform.",
    body: "Major parties have started consultations ahead of the next parliamentary meeting. Policy priorities are expected to include economic recovery and better public delivery.",
    trending: false,
    breaking: false
  },
  {
    id: 6,
    title: "Singer releases acoustic version of hit Nepali song",
    category: "Celebrity",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80",
    summary: "Fans praised the live arrangement, emotional vocals, and simple production style.",
    body: "The acoustic version highlights voice and melody over heavy production. The music team says more live sessions are planned for the coming weeks.",
    trending: false,
    breaking: false
  },
  {
    id: 7,
    title: "AI tools change how Nepali students prepare projects",
    category: "Technology",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    summary: "Teachers say AI can support learning when students verify facts and write original work.",
    body: "Schools and colleges are discussing responsible AI use. Educators recommend clear rules so students can research better while still building critical thinking.",
    trending: true,
    breaking: false
  },
  {
    id: 8,
    title: "Community clean-up campaign receives strong support",
    category: "Viral",
    time: "6 hours ago",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    summary: "Photos from the campaign are being shared as residents call for regular civic action.",
    body: "Hundreds of residents joined the campaign over the weekend. Organizers said the response shows growing public interest in cleaner neighborhoods.",
    trending: false,
    breaking: false
  }
];

const leadNews = document.getElementById("leadNews");
const sideNews = document.getElementById("sideNews");
const latestGrid = document.getElementById("latestGrid");
const trendingList = document.getElementById("trendingList");
const categoryGrid = document.getElementById("categoryGrid");
const articleView = document.getElementById("articleView");
const breakingText = document.getElementById("breakingText");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const modeBtn = document.getElementById("modeBtn");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

function card(item) {
  return `
    <article class="news-card">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="news-body">
        <div class="meta">
          <span class="tag">${item.category}</span>
          <span>${item.time}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a class="read-more" href="#article" data-id="${item.id}">Read more</a>
      </div>
    </article>
  `;
}

function renderHome() {
  const lead = news[0];
  leadNews.innerHTML = `
    <img src="${lead.image}" alt="${lead.title}">
    <div class="lead-body">
      <div class="meta">
        <span class="tag">${lead.category}</span>
        <span>${lead.time}</span>
      </div>
      <h1>${lead.title}</h1>
      <p>${lead.summary}</p>
      <a class="read-more" href="#article" data-id="${lead.id}">Read full story</a>
    </div>
  `;

  sideNews.innerHTML = news.slice(1, 4).map(card).join("");
  latestGrid.innerHTML = news.slice(2).map(card).join("");
  breakingText.textContent = news.filter((item) => item.breaking).map((item) => item.title).join(" | ");
  trendingList.innerHTML = news
    .filter((item) => item.trending)
    .map((item) => `<li><a href="#article" data-id="${item.id}">${item.title}</a><span>${item.category} / ${item.time}</span></li>`)
    .join("");
}

function renderCategory(category) {
  const items = news.filter((item) => item.category === category);
  categoryGrid.innerHTML = items.length ? items.map(card).join("") : `<div class="empty">No news found.</div>`;
}

function renderArticle(id) {
  const item = news.find((entry) => entry.id === Number(id)) || news[0];
  articleView.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="article-body">
      <div class="meta">
        <span class="tag">${item.category}</span>
        <span>${item.time}</span>
        <span>Status Nepal Desk</span>
      </div>
      <h1>${item.title}</h1>
      <p>${item.body}</p>
      <blockquote>Editors can update this article by editing the news array in script.js.</blockquote>
      <p>This static article design includes the essentials for a professional news page: category, time, headline, image, body text, and a readable layout.</p>
    </div>
  `;
}

function searchNews(term) {
  const query = term.trim().toLowerCase();
  const results = query
    ? news.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(query))
    : news.slice(2);

  latestGrid.innerHTML = results.length ? results.map(card).join("") : `<div class="empty">No news found for "${term}".</div>`;
  document.getElementById("latest").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-id]");
  if (link) {
    renderArticle(link.dataset.id);
  }
});

document.getElementById("categoryTabs").addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  document.querySelectorAll(".tabs button").forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");
  renderCategory(event.target.dataset.category);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchNews(searchInput.value);
});

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  modeBtn.textContent = dark ? "Light" : "Dark";
  localStorage.setItem("statusNepalTheme", dark ? "dark" : "light");
});

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

menu.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

document.getElementById("today").textContent = new Intl.DateTimeFormat("en", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(new Date());

if (localStorage.getItem("statusNepalTheme") === "dark") {
  document.body.classList.add("dark");
  modeBtn.textContent = "Light";
}

renderHome();
renderCategory("Politics");
renderArticle(1);
