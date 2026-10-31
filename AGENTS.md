# Project conventions

## Architecture

- Keep the application entry at `src/App.tsx` and global styles at `src/index.css`; do not move them into extra folders.

- Follow a small, feature-based Bulletproof React structure: `src/App.tsx` composes features and shared code; features may use shared code; shared code must not import features or the app.
- This site has one portfolio feature. Keep About, Skills, Projects, and WorkDetail as complete section/page components under `src/features/portfolio/components`.
- Keep one-off markup and logic in its owning component. Do not split cards, previews, summaries, galleries, or case-study paragraphs into separate files solely to reduce line count.
- Extract a reusable component/module only after the same responsibility is used in at least three distinct places. Repeated items in a single list do not count. Application entry points, complete pages, and required infrastructure can have their own files.
- Keep feature data and domain types inside the feature. Keep only genuinely shared primitives, configuration, hooks, and UI outside it.
- Use direct imports; do not add barrel files, empty scaffolding folders, or new architecture dependencies without a concrete need.
- Use `@/` for imports across the shared/application boundary and relative imports within a feature.

## UI consistency

- Prefer standard Tailwind typography sizes (`text-xs`, `text-sm`, etc.) over arbitrary pixel font sizes. Use standard spacing utilities where practical.

- Preserve the existing page design, Chinese/English content, theme behavior, and navigation while refactoring.
- Keep title spacing, section padding, and tag styling consistent using `SectionHeader`, `TagList`, and the shared classes in `src/index.css`.
- Shared navigation and WorkDetail must complement each other without repeating category labels, counters, and return actions at the same breakpoint.

## Verification

- Run `npm run lint` and `npm run build` after structural changes.
- Check formatting for changed files and verify the affected UI where browser preview is available.
