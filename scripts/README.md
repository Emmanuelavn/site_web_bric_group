ingest scripts
===============

This folder contains small utilities to build JSON manifests from image folders.

ingest_projets.js
------------------

Purpose:
 - Scan `public/images/projets/<type>/<project>/` and produce `src/entites/projets_auto.json`.

Modes and expectations:
 - Expected structure (recommended):
     public/images/projets/
       residentiel/
         M1/
           img1.jpg
           img2.jpg
         M2/
       renovation/
         R1/
 - The script will create one project per subfolder (e.g. `residentiel/M1`).
 - If a type folder contains images directly (no subfolders), the script will create
   a single project for that type using those images.

Usage (PowerShell):

```powershell
node ./scripts/ingest_projets.js --src ./public/images/projets --out ./src/entites/projets_auto.json --publicBase /images/projets
```

Notes:
 - `--publicBase` helps the script produce web URLs (it will use the `public` segment
   of a path to build a leading `/images/...` URL). If you run the script from the
   repo root, the generated `url` fields will be suitable for use in the frontend.
 - The output JSON format is:

```
{
  "generatedAt": "...",
  "projects": [
    {
      "id": "residentiel_M1",
      "slug": "residentiel/M1",
      "type": "residentiel",
      "title": "M1",
      "shortDesc": "",
      "cover": "/images/projets/residentiel/M1/01.jpg",
      "images": [{ "url": "/images/..", "filename": "01.jpg" }, ...]
    }
  ]
}
```

After running the script, import or copy `src/entites/projets_auto.json` into the
frontend code. The `projects` array is intended to be loaded by the projects page and
displayed via existing card/lightbox components.
