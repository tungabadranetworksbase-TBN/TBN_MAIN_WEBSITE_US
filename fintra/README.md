# Fintra — static site

Self-contained static export of the Fintra Framer template, served locally.

```bash
python3 serve.py 8321
```

Then open http://localhost:8321.

All JS modules, images and fonts are vendored — the site makes zero external
requests. The Framer badge, editor-bar loader and generator metadata have been
removed.

## Notes

- `contact.html`'s "Book a Call" button still points at the original template
  author's X account — change it before using this for real.
- Template authored by Praha and exported from Framer; check your license before
  redistributing.
