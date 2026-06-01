# Bootstrap 5 Exercises: Explanations & Setup Guide

This document contains written solutions and explanations for **Exercise 2.1** and **Exercise 19** of the Bootstrap 5 curriculum.

---

## Exercise 2.1: Bootstrap Structure and Files

When you download the compiled version of Bootstrap 5, the package contains a specific directory structure. The structure and purpose of each folder are detailed below:

### 1. `css/` Folder
Contains the compiled stylesheets used to style layout blocks, utilities, and components.
- **`bootstrap.css`**: The full, unminified source CSS stylesheet. Helpful for inspecting or debugging CSS properties.
- **`bootstrap.min.css`**: The minified production stylesheet. Spaces, comments, and line breaks are fully stripped out to optimize load speeds and bandwidth.
- **`bootstrap-grid.css` / `bootstrap-utilities.css`**: Modular versions if you only want the Grid System or helper utilities without Bootstrap's pre-made UI components.

### 2. `js/` Folder
Contains the JavaScript modules that enable Bootstrap’s complex dynamic interactions (Modals, Dropdowns, Tooltips, Collapse accordions, Carousels, etc.).
- **`bootstrap.js`**: The unminified script containing raw event listeners and lifecycle triggers.
- **`bootstrap.bundle.js`**: Includes the core JavaScript plugins **plus** Popper.js (which is required for positioning dropdowns, tooltips, and popovers).
- **`bootstrap.bundle.min.js`**: The minified, production-ready version of the bundle.

### 3. `icons/` Folder
Contains the SVG icons library (Bootstrap Icons) representing hundreds of pixel-perfect vector symbols that scale smoothly to any screen resolution.

---

## Exercise 19: Customization with Sass

Sass (Syntactically Awesome Style Sheets) is the preprocessor language Bootstrap uses to build its core stylesheet. Working with Sass allows you to fully customize styles at compile time, reducing your production bundle size.

### Exercise 19.1: Setting Up a Bootstrap 5 project with Sass

1. Initialize a new Node.js package inside your project folder:
   ```bash
   npm init -y
   ```

2. Install Bootstrap and the Sass compiler as dependencies:
   ```bash
   npm install bootstrap sass --save-dev
   ```

3. Create a custom Sass source folder and stylesheet:
   - Create a directory `scss/` and a file named `custom.scss`.

4. Import Bootstrap inside your `scss/custom.scss` file:
   ```scss
   // Import Bootstrap's source files
   @import "../node_modules/bootstrap/scss/bootstrap";
   ```

5. Add a build command in your `package.json` file inside `scripts`:
   ```json
   "scripts": {
     "compile-sass": "sass scss/custom.scss dist/css/bootstrap-custom.css --watch"
   }
   ```

6. Run the compilation command:
   ```bash
   npm run compile-sass
   ```

---

### Exercise 19.2: Customizing Primary Colors and Border Radii via `_variables.scss`

To override Bootstrap's default values without editing core node modules, specify your modifications **before** importing the Bootstrap stylesheets. Bootstrap variables use the `!default` flag, meaning they will only apply if no previous value has been defined.

#### Example custom variables stylesheet (`scss/custom.scss`):
```scss
// 1. Define custom color values
$indigo-premium: #4f46e5;
$emerald-glow: #10b981;

// 2. Override default theme colors
$primary: $indigo-premium;
$success: $emerald-glow;
$dark: #0f172a;

// 3. Customize border radius and globally adjust component settings
$enable-gradients: true;
$enable-shadows: true;

$border-radius: .5rem;         // Default small border radius
$border-radius-lg: 1rem;       // Large border radius for Cards and Modals
$border-radius-sm: .25rem;

// 4. Import the rest of Bootstrap's stylesheets to compile with customized variables
@import "../node_modules/bootstrap/scss/bootstrap";
```

By compiling this customized `custom.scss`, Bootstrap automatically regenerates all classes (`btn-primary`, `bg-primary`, border utilities, spacing classes) incorporating your premium colors and design tokens, resulting in a cohesive bespoke design system!
