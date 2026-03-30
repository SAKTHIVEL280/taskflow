# TaskFlow

A modern, high-performance task management application designed for streamlined workflows. This project is built using **React**, **TypeScript**, and **Vite** to ensure a fast, type-safe, and responsive user experience.

## 🚀 Features

* **Efficient Task Tracking**: Create, update, and manage tasks with an intuitive UI.
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
* **Type-Safe Architecture**: Leverages TypeScript for robust code quality and fewer runtime errors.
* **Modern Styling**: Utilizes Tailwind CSS for a clean, professional aesthetic.
* **Developer Friendly**: Powered by Vite for near-instant Hot Module Replacement (HMR).

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Library |
| **TypeScript** | Static Typing |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Styling & Layout |
| **Lucide React** | Iconography |
| **Vitest / Playwright** | Unit & E2E Testing |

## 📦 Installation & Local Development

To get a local copy up and running, follow these steps:

### Prerequisites

* **Node.js** (v18.0.0 or higher)
* **npm** or **bun** package manager

### Setup

1. **Clone the Repository**
   ```bash
   git clone [https://github.com](https://github.com)
   cd taskflow
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🌐 GitHub Pages Documentation

This project is configured for automated deployment via GitHub Pages.

### 1. Deployment Strategy
Since this is a Single Page Application (SPA) built with Vite, the deployment process involves compiling the source code into static assets (HTML, CSS, JS) that GitHub's servers can serve directly.

### 2. Configuration Details
* **Base URL**: The project is configured with a base path of `/taskflow/` in `vite.config.ts` to ensure assets load correctly under the GitHub sub-directory.
* **Build Directory**: The output of the build process is stored in the `dist/` folder.

### 3. Automated Workflow (GitHub Actions)
The site uses GitHub Actions for Continuous Deployment (CD).
* **Trigger**: Any push to the `main` branch.
* **Action**: The runner installs dependencies, executes `npm run build`, and uploads the `dist/` folder to the deployment runner.
* **Live URL**: `sakthivel280.github.io`

### 4. Handling Client-Side Routing
To prevent `404` errors when refreshing sub-pages on GitHub Pages, the deployment is configured to redirect traffic through the `index.html` file, ensuring the React Router correctly handles deep links.

## 📝 License

This project is open-source and available under the MIT License.

Developed by **SAKTHIVEL280**
