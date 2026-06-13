const news = [
  {
    id: 20,
    title: "EU T20 Belgium live broadcast 8th to 14th June",
    category: "Sports",
    time: "Today",
    image: "eut20.jfif",
    summary: "EU T20 Belgium cricket tournament will be shown live from 8th to 14th June.",
    body: "EU T20 Belgium cricket action is scheduled from 8th to 14th June with live broadcast coverage. Cricket fans can follow the matches through the listed TV and digital channels.",
    trending: true,
    breaking: true
  },
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
let activeArticleId = Number(new URLSearchParams(window.location.search).get("news")) || news[0].id;

function absoluteUrl(path) {
  return new URL(path, window.location.href).href;
}

function articleUrl(id) {
  const url = new URL(window.location.href);
  url.searchParams.set("news", id);
  url.hash = "article";
  return url.href;
}

function updateMeta(item) {
  document.title = `${item.title} - Status Nepal`;
  const meta = {
    "description": item.summary,
    "og:title": item.title,
    "og:description": item.summary,
    "og:image": absoluteUrl(item.image),
    "og:url": articleUrl(item.id),
    "twitter:title": item.title,
    "twitter:description": item.summary,
    "twitter:image": absoluteUrl(item.image)
  };

  Object.entries(meta).forEach(([name, content]) => {
    const selector = name.startsWith("og:")
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    let tag = document.querySelector(selector);

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(name.startsWith("og:") ? "property" : "name", name);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  });
}

function copyText(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  return Promise.resolve();
}

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
  activeArticleId = item.id;
  updateMeta(item);
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
      <div class="share-box" id="share">
        <h3>Share this news</h3>
        <div class="share-actions">
          <a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl(item.id))}" target="_blank" rel="noopener">Facebook</a>
          <a class="twitter" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl(item.id))}&text=${encodeURIComponent(item.title)}" target="_blank" rel="noopener">Twitter/X</a>
          <a class="whatsapp" href="https://api.whatsapp.com/send?text=${encodeURIComponent(`${item.title} ${articleUrl(item.id)}`)}" target="_blank" rel="noopener">WhatsApp</a>
          <button type="button" data-share="native">Instagram/TikTok</button>
          <button type="button" data-share="copy">Copy Link</button>
        </div>
        <p class="share-note">Instagram and TikTok do not provide a normal website share dialog, so use the share button on mobile or copy the link and paste it there.</p>
      </div>
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
    event.preventDefault();
    renderArticle(link.dataset.id);
    history.replaceState(null, "", articleUrl(link.dataset.id));
  }

  const shareButton = event.target.closest("[data-share]");
  if (shareButton) {
    const item = news.find((entry) => entry.id === activeArticleId) || news[0];
    const url = articleUrl(item.id);

    if (shareButton.dataset.share === "native" && navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url
      });
      return;
    }

    copyText(url).then(() => {
      shareButton.textContent = "Copied";
      setTimeout(() => {
        shareButton.textContent = shareButton.dataset.share === "copy" ? "Copy Link" : "Instagram/TikTok";
      }, 1400);
    });
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
renderArticle(activeArticleId);
