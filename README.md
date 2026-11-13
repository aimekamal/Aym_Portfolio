# Aym Souidan — Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html            page structure (sections, projects, logo)
css/styles.css        all styling; colors are tokens at the top
js/config.js          YOUR email, links, CV path, skills lists
js/translations.js    all text in English + Arabic
js/main.js            helpers + language switch (RTL)
js/hero-network.js    hero network animation
js/skills.js          skills constellation
js/projects.js        project preview overlay + scroll reveal
js/init.js            starts everything (keep last)
assets/               logo SVGs, favicon, CV
```

## Edit
- **Contact links and CV:** `js/config.js`. Put your PDF in `assets/` and set `cv:'assets/Aym-Souidan-CV.pdf'`.
- **Any text:** `js/translations.js` (English and Arabic side by side).
- **Colors:** top of `css/styles.css`. Buttons use only the lilac tokens.
- **Skills:** `G` (groups) and `P` (skill → projects: 1, 2, 3) in `js/config.js`. Check `P` matches what you actually used.
- **Add a project:** copy an `<article class="p">` in `index.html`, change `data-i`, then add `p4t`, `p4c`, `p4s` in both languages in `js/translations.js`. Later add a link with a `data-href` attribute and descriptions.

## Run locally
```
python -m http.server 8000
```
Open http://localhost:8000

## Deploy
- **GitHub Pages:** push to a repo, then Settings → Pages → Deploy from branch → `main` / root.
- **Vercel:** import the repo, framework preset "Other", no build command, output directory `.`.
