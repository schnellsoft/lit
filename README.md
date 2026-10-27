# Lit teaching repo

Lit components and docs for the Snel Dan **Learning with demos** section.

## Layout

```
components/
  repeat-vs-map/
    repeat-vs-map.ts   # source
    repeat-vs-map.js   # from Vite dist
    repeat-vs-map.css  # from Vite dist
docs/
  index.html           # Lit hub (header/footer + component list)
  repeat-vs-map.html   # description + live <repeat-vs-map>
  components/…         # published copies of JS/CSS for GitHub Pages
  assets/              # site theme CSS/JS
```

## GitHub Pages

Serve the `docs/` folder so the live demos resolve `./components/...`.

- Hub: https://schnellsoft.github.io/lit/
- Linked from: https://schnellsoft.github.io/learning/programming.html (Lit)
