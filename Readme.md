# 🏯 Project: Zen Place

A lightweight, modern 3D web experience that renders open-source structural art natively in the browser. Built using raw JavaScript modules, HTML5, and Three.js with zero build system dependencies.

---

## 🛠️ Architecture Overview

The workspace is stripped of framework bloat, utilizing browser-native **Import Maps** to fetch dependencies dynamically via CDN.

### 📦 File Structure

```text
.
├── index.html          # Viewport container, CSS layer, & CDN Import Maps
├── app.js              # Three.js core engine, lighting, & interaction logic
└── try1.glb            # Open-source 3D asset file (glTF Binary format)
```
