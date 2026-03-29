

# TaskFlow — Fully Customizable Task & Project Manager

## What Changed
The user wants **maximum customization** — users should be able to change literally everything about their workspace. This transforms TaskFlow from a static-design app into a deeply personalized experience.

## Customization Features

### 1. Theme & Appearance (Settings > Appearance)
- **Accent color picker** — user picks any primary color (stored as HSL)
- **Font selection** — choose from 5-6 curated fonts (Inter, Poppins, Space Grotesk, DM Sans, etc.)
- **Font size** — small / medium / large
- **Dark / Light / System mode** toggle
- **Border radius** — sharp / rounded / pill
- **Density** — compact / comfortable / spacious (controls padding/spacing)
- All preferences stored in a `user_settings` Supabase table and applied via CSS variables

### 2. Dashboard Customization
- **Widgets are draggable/removable** — stats cards, recent projects, upcoming tasks, activity feed
- **Widget visibility toggles** — show/hide any widget
- **Layout choice** — grid or list view for projects
- User can choose their **default landing view** (dashboard, projects list, or a specific project)

### 3. Project Customization
- **Custom colors** — pick any color for each project
- **Custom icons** — choose from icon library per project
- **Custom statuses** — instead of fixed To Do/In Progress/Done, users create their own columns (e.g., "Backlog", "Review", "QA", "Shipped")
- **Custom fields** on tasks — add text, number, date, or select fields per project
- **View modes** — switch between Kanban board, List view, or Table view per project

### 4. Task Customization
- **Custom priority levels** — rename or add priority tiers
- **Custom labels/tags** — create colored tags, assign multiple per task
- **Custom due date display** — relative ("in 2 days") or absolute ("Mar 31")
- **Subtasks** — nested checklist items within a task

### 5. Sidebar & Navigation
- **Reorder projects** in sidebar via drag preference (stored order)
- **Favorite/pin projects** to top
- **Collapsible sidebar**

## Technical Approach

### Database Schema (Supabase)
- `profiles` — display name, avatar
- `user_settings` — theme color, font, font size, dark mode, radius, density, default view, widget config (JSON)
- `projects` — name, description, color, icon, owner, position (for ordering)
- `project_statuses` — project_id, name, color, position (custom columns)
- `custom_fields` — project_id, name, type, options
- `tasks` — project_id, title, description, status_id, priority, due_date, position, custom_field_values (JSONB)
- `task_labels` — project_id, name, color
- `task_label_assignments` — task_id, label_id
- All tables with RLS so users only see their own data

### Theme Engine
- A React context (`ThemeContext`) reads `user_settings` and applies CSS custom properties to `:root`
- Changing accent color instantly updates `--primary`, `--ring`, etc.
- Font loaded dynamically via Google Fonts link injection
- Density maps to a spacing scale variable

### Pages
1. **Landing** — premium marketing page with hero, features (emphasizing customization), pricing, footer
2. **Auth** — login, signup, password reset (clean card forms)
3. **Dashboard** — customizable widget grid with show/hide controls
4. **Projects List** — grid/list toggle, create/edit project with color & icon picker
5. **Project Board** — Kanban/List/Table views, custom columns, custom fields
6. **Settings** — Appearance tab (theme engine), Account tab (profile, password)

### Implementation Order
1. Supabase setup — auth, tables, RLS policies
2. Auth pages (login, signup, reset)
3. Theme engine + Settings page
4. Landing page
5. Dashboard with customizable widgets
6. Projects CRUD with custom colors/icons
7. Custom statuses (columns) per project
8. Task board with Kanban/List/Table views
9. Custom fields, labels, subtasks

