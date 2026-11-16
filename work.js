/* =========================================================
   work.js — behaviour of the Work page
   Sections:
   1. Theme            4. Row builder
   2. Page elements    5. Rendering and filtering
   3. Helpers          6. Scroll progress + start-up
   Project data comes from work-data.js (loaded first).
   ========================================================= */


/* ---------- 1. THEME ----------
   Same rule as the home page: use the light theme if the device prefers it. */
const rootElement = document.documentElement;
const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

if (!rootElement.dataset.theme && prefersLightTheme) {
  rootElement.dataset.theme = 'light';
}


/* ---------- 2. PAGE ELEMENTS AND STATE ---------- */
const filterBar     = document.getElementById('filter-bar');
const projectList   = document.getElementById('work-list');
const readout       = document.getElementById('work-readout');
const progressBar   = document.getElementById('scroll-progress-bar');

let activeCategoryId = 'all';   // which filter is selected


/* Small graphics for rows. The key must match "visual" in work-data.js.
   To add one: add a new entry here and set visual: 'yourname' on a project. */
const PROJECT_VISUALS = {
  signaloud: `
    <svg viewBox="0 0 640 220" role="img" aria-label="Sensors feeding a processing node that outputs a gesture">
      <g class="sv-links">
        <line x1="100" y1="40" x2="320" y2="130" />
        <line x1="210" y1="28" x2="320" y2="130" />
        <line x1="320" y1="22" x2="320" y2="130" />
        <line x1="430" y1="30" x2="320" y2="130" />
        <line x1="540" y1="52" x2="320" y2="130" />
      </g>
      <g>
        <circle class="sv-sensor" style="--i:0" cx="100" cy="40" r="6" />
        <circle class="sv-sensor" style="--i:1" cx="210" cy="28" r="6" />
        <circle class="sv-sensor" style="--i:2" cx="320" cy="22" r="6" />
        <circle class="sv-sensor" style="--i:3" cx="430" cy="30" r="6" />
        <circle class="sv-sensor" style="--i:4" cx="540" cy="52" r="6" />
      </g>
      <circle class="sv-hub" cx="320" cy="130" r="14" />
      <path class="sv-flow" d="M336 130 H470" />
      <rect class="sv-box" x="470" y="95" width="70" height="70" />
      <text class="sv-letter" x="505" y="141" text-anchor="middle">A</text>
      <path class="sv-wave" d="M40 200q12-18 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0" />
    </svg>`
};


/* ---------- 3. HELPERS ---------- */

// Does this project belong to the given category?
function projectMatchesCategory(project, categoryId) {
  if (categoryId === 'all') {
    return true;
  }
  return project.categories.includes(categoryId);
}

// How many projects are in a category? (used for the counts on the buttons)
function countProjectsInCategory(categoryId) {
  return WORK_PROJECTS.filter(function (project) {
    return projectMatchesCategory(project, categoryId);
  }).length;
}

// Turn a category id into its label, e.g. 'ai-ml' -> 'AI & Machine Learning'
function getCategoryLabel(categoryId) {
  const category = WORK_CATEGORIES.find(function (item) {
    return item.id === categoryId;
  });
  return category.label;
}


/* ---------- 4. ROW BUILDER ----------
   Builds ONE project row. If the project has a url it becomes a link,
   otherwise it becomes a button that opens a "coming soon" note. */
function createProjectRow(project, position) {
  const hasPage = project.url !== null;

  const row = document.createElement('li');
  row.className = 'work-row';
  row.style.setProperty('--row-delay', position * 60 + 'ms');   // staggered entrance
  if (project.featured) {
    row.classList.add('is-featured');
  }

  // A real link when the page exists, otherwise a button
  const link = document.createElement(hasPage ? 'a' : 'button');
  link.className = 'work-link';
  if (hasPage) {
    link.href = project.url;
  } else {
    link.type = 'button';
    link.setAttribute('aria-expanded', 'false');
  }

  // Optional pieces (empty text means "leave it out")
  const subtitleHtml = project.subtitle
    ? '<span class="work-subtitle-text">' + project.subtitle + '</span>'
    : '';
  const kindHtml = project.kind
    ? '<span class="work-kind">' + project.kind + '</span>'
    : '';
  const visualHtml = PROJECT_VISUALS[project.visual]
    ? '<span class="work-visual" aria-hidden="true">' + PROJECT_VISUALS[project.visual] + '</span>'
    : '';
  const featuredHtml = project.featured
    ? '<span class="work-featured-tag">Featured</span>'
    : '';

  link.innerHTML = `
    <span class="work-number">${project.number}</span>
    <span class="work-main">
      ${featuredHtml}
      <span class="work-title-text">${project.title}</span>
      ${subtitleHtml}
      <span class="work-description">${project.description}</span>
      ${visualHtml}
    </span>
    <span class="work-meta">
      <span class="work-category">${getCategoryLabel(project.categories[0])}</span>
      ${kindHtml}
    </span>
    <span class="work-arrow" aria-hidden="true">${hasPage ? '→' : '+'}</span>
  `;
  row.appendChild(link);

  // Projects without a page yet: click to show / hide a short note
  if (!hasPage) {
    const note = document.createElement('p');
    note.className = 'work-note mono';
    note.textContent = 'Case study · coming soon';
    note.hidden = true;
    row.appendChild(note);

    link.addEventListener('click', function () {
      const isOpen = link.getAttribute('aria-expanded') === 'true';
      link.setAttribute('aria-expanded', String(!isOpen));
      note.hidden = isOpen;
    });
  }

  return row;
}


/* ---------- 5. RENDERING AND FILTERING ---------- */

// Build the filter buttons once
function renderFilters() {
  WORK_CATEGORIES.forEach(function (category) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.dataset.categoryId = category.id;
    button.innerHTML =
      category.label +
      '<span class="filter-count">' + countProjectsInCategory(category.id) + '</span>';

    button.addEventListener('click', function () {
      setActiveCategory(category.id);
    });
    filterBar.appendChild(button);
  });
}

// Highlight the selected filter button
function updateFilterButtons() {
  filterBar.querySelectorAll('.filter-chip').forEach(function (button) {
    const isActive = button.dataset.categoryId === activeCategoryId;
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// Rebuild the project list for the selected category
function renderProjects() {
  const visibleProjects = WORK_PROJECTS.filter(function (project) {
    return projectMatchesCategory(project, activeCategoryId);
  });

  projectList.innerHTML = '';
  visibleProjects.forEach(function (project, position) {
    projectList.appendChild(createProjectRow(project, position));
  });

  readout.textContent =
    'Showing ' + visibleProjects.length + ' of ' + WORK_PROJECTS.length +
    ' · ' + getCategoryLabel(activeCategoryId);
}

function setActiveCategory(categoryId) {
  activeCategoryId = categoryId;
  updateFilterButtons();
  renderProjects();
}


/* ---------- 6. SCROLL PROGRESS + START-UP ---------- */

// The thin lilac line at the top grows as you scroll down
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = 'scaleX(' + progress + ')';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

// Start
renderFilters();
setActiveCategory('all');
updateScrollProgress();
