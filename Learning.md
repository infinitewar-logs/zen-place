docs: document layer stacking rules for 3D canvases and 2D UI overlays

### Core Learning: Stacking 3D Canvases vs. 2D Elements

When rendering 3D scenes (Three.js/WebGL) alongside standard HTML interfaces,
dynamic runtime injections will often override the natural HTML stacking layout.

1. The 3D Canvas Trap:
   `renderer.domElement` appends a `<canvas>` dynamically to the DOM. If left
   unmanaged, this canvas behaves like an invisible barrier that blocks all mouse
   inputs, clicks, and hover states meant for underlying UI components.

2. Activating Depth with CSS Layouts:
   The `z-index` property is completely ignored by browsers unless the targeted
   element has an explicit positioning strategy defined.

3. The Formula for Interactive UI Overlays:
   To force UI headers, buttons, or dashboard cards to float cleanly over a 3D scene,
   the overlay elements must explicitly declare these three integrated properties:
   - `position: absolute;` (or `fixed`) -> Unlocks depth layers and isolates the layout.
   - `z-index: [High Number];` -> Forces the element to stack in front of the canvas.
   - `pointer-events: auto;` -> Guarantees the browser intercepts mouse/touch inputs.

### Standard Architecture Reference:

- Background Canvas Layer: position: absolute; z-index: 1;
- Foreground Interactive UI: position: absolute; z-index: 9999; pointer-events: auto;
