# KET GAMES - Official Website

The website for **KET GAMES**, my space to showcase the games I design and create, share the ideas behind them, and show the process of bringing them to life. Based in Nepal. It features my current project, **JumpRift: 3D Platformer**.

Live address (via GitHub Pages): https://ket-games.github.io

Contact: officialketgames@gmail.com

## About this site

A static website built with plain HTML, CSS and vanilla JavaScript. There is no build step, no package manager and no external dependencies, and all images are served from this repository using relative paths.

```
index.html                     Homepage
games/jumprift/index.html      JumpRift: 3D Platformer page
assets/css/style.css           Site styles
assets/js/main.js              Navigation, gallery filter, lightbox, scroll effects
assets/brand/                  Brand artwork (logo, social image, favicon)
assets/jumprift/store-screenshots/   JumpRift gameplay screenshots
robots.txt, sitemap.xml        Search engine files
```

## Preview locally

**Simplest:** open `index.html` in a web browser (double-click it). All paths are relative, so the site works straight from the folder.

**Optional local server:** if Python is already installed, run this in the project folder and visit http://localhost:8000

```
python -m http.server 8000
```

(Any simple static file server works, for example the Live Server extension in VS Code.)

## Publish with GitHub Pages

1. Create a GitHub repository named `ket-games.github.io` under the `KET-Games` account. A repository with this exact name is published at https://ket-games.github.io.
2. Add the project files to the repository and push them to the `main` branch.
3. In the repository, open **Settings > Pages**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then save.
4. After a minute or two the site is available at https://ket-games.github.io.

Because the site uses only relative paths, no configuration changes are needed.

## Notes

- The brand logo (`assets/brand/ket-games-master-logo.png`) must be used exactly as supplied and must not be redrawn, recoloured, cropped or distorted.
- Gameplay imagery must come only from real JumpRift screenshots.
- Local working files are kept out of the repository through `.gitignore`.

&copy; 2026 KET GAMES. All rights reserved.
