# BioCareer Connect - Design System

## Color Palette

### Primary (Brand)
- **Teal-600** (`#0D9488`): Primary buttons, active states, key branding.
- **Teal-50** (`#F0FDFA`): Backgrounds for active items.

### Functional (AI & Actions)
- **Indigo-600** (`#4F46E5`): "Generate Cover Letter", AI Insights.
- **Violet-100** (`#EDE9FE`): AI content backgrounds.

### Semantic (Match Scores)
- **Emerald-500** (`#10B981`): High Match / Pro / Qualification Met.
- **Rose-500** (`#F43F5E`): Mismatch / Con / Qualification Missing.
- **Amber-500** (`#F59E0B`): Partial Match / Warning.
- **Slate-400** (`#94A3B8`): Neutral / Metadata.

## Typography
- **Headings**: SemiBold (600), Tight tracking.
- **Body**: Regular (400), Slate-700.
- **Data/Labels**: Medium (500), Uppercase, Small (text-xs), Slate-500.

## Component Styles

### Cards (The "Opportunity" Container)
- Background: White
- Border: 1px solid Slate-200
- Shadow: `shadow-sm` (hover: `shadow-md`)
- Radius: `rounded-xl` (Modern, soft approach)

### Badges (Qualifications)
- Pill shape (`rounded-full`)
- Flex layout with icon + text
- Color-coded border based on status (Met/Missing)

### Layout
- **Sidebar**: Filters & Navigation (Fixed Left).
- **Main Feed**: Center column, infinite scroll feel.
- **Detail Panel**: Slide-over or Modal for deep dives (keeps context of list).

