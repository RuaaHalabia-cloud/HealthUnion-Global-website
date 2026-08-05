{
  "brand": {
    "name": "HealthUnion Global",
    "attributes": [
      "authoritative",
      "clinical-precision",
      "government-grade trust",
      "premium B2B",
      "cross-border security"
    ],
    "visual_metaphors": [
      "protective shield",
      "global grid/globe",
      "regulated pathways",
      "audit trails"
    ]
  },
  "directionality_i18n": {
    "routing": {
      "strategy": "localized route prefixes",
      "paths": {
        "en": "/en",
        "ar": "/ar"
      },
      "language_switcher_behavior": [
        "Switch keeps the same sub-route (e.g., /en/services -> /ar/services)",
        "Persist language in localStorage",
        "If route has no locale prefix, redirect to /en"
      ]
    },
    "html_attributes": {
      "must_set": [
        "<html lang=\"en|ar\">",
        "<html dir=\"ltr|rtl\">"
      ],
      "react_hook_scaffold_js": "// useEffect(() => {\n//   const dir = i18n.dir(i18n.language);\n//   document.documentElement.setAttribute('dir', dir);\n//   document.documentElement.setAttribute('lang', i18n.language);\n// }, [i18n.language]);"
    },
    "rtl_rules": {
      "layout_mirroring": [
        "Mirror macro layout: logo aligns to inline-start (right in RTL), nav items flow inline-start -> inline-end",
        "Use CSS logical properties (ms/me/ps/pe in Tailwind) instead of left/right",
        "Prefer text-start/text-end over text-left/text-right",
        "Use flex-row-reverse ONLY when the visual order must invert but DOM order should remain for a11y"
      ],
      "icons_arrows": [
        "Directional icons must flip in RTL (chevrons, arrows, breadcrumbs separators)",
        "Non-directional icons must NOT flip (shield, globe, document, building)",
        "If using lucide-react, wrap directional icons with a class that applies scaleX(-1) when [dir=rtl]"
      ],
      "numbers_dates": {
        "numbers_policy": "Use Western numerals for corporate consistency (0-9) across both locales unless product owner requests Eastern Arabic numerals.",
        "dates_policy": "Use Intl.DateTimeFormat with locale; keep Gregorian calendar for business contexts.",
        "js_scaffold": "// const fmt = new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US', { dateStyle: 'medium' });\n// fmt.format(new Date());"
      },
      "typography_arabic_specific": [
        "Do not apply tracking/letter-spacing utilities to Arabic text",
        "Avoid italics for Arabic",
        "Increase Arabic line-height slightly (leading-relaxed -> leading-[1.75])",
        "Use font-semibold sparingly; rely on color + spacing for hierarchy"
      ]
    }
  },
  "palette": {
    "mandatory_hex": {
      "midnight_navy": "#0A2240",
      "corporate_indigo": "#1E3A8A",
      "emerald_teal": "#0D9488",
      "mint_green_accent": "#10B981",
      "clinical_gray": "#F8FAFC"
    },
    "semantic_roles": {
      "bg": {
        "page": "#F8FAFC",
        "section_alt": "#FFFFFF",
        "header_footer": "#0A2240",
        "hero_overlay": "rgba(10,34,64,0.72)"
      },
      "text": {
        "primary": "#0A2240",
        "secondary": "#1E3A8A",
        "on_dark": "#F8FAFC",
        "muted": "rgba(10,34,64,0.72)"
      },
      "border": {
        "subtle": "rgba(30,58,138,0.18)",
        "strong": "rgba(30,58,138,0.32)",
        "focus_ring": "#0D9488"
      },
      "cta": {
        "primary_bg": "#0D9488",
        "primary_hover": "#10B981",
        "primary_text": "#F8FAFC",
        "secondary_outline": "#1E3A8A"
      },
      "state": {
        "success": "#10B981",
        "info": "#1E3A8A",
        "danger": "#B91C1C",
        "warning": "#B45309"
      }
    },
    "gradients": {
      "allowed_usage": [
        "Hero background overlay only (<=20% viewport)",
        "Large decorative section header bands (not behind long text)",
        "Large CTA background accents (>=100px)"
      ],
      "approved_gradients": {
        "navy_to_teal": "linear-gradient(135deg, #0A2240 0%, #1E3A8A 45%, #0D9488 100%)",
        "teal_mint_soft": "linear-gradient(135deg, rgba(13,148,136,0.18) 0%, rgba(16,185,129,0.12) 100%)"
      },
      "restriction": "Follow GRADIENT RESTRICTION RULE from General UI UX Design Guidelines. Do not introduce purple/pink/red saturated gradients."
    }
  },
  "typography": {
    "fonts": {
      "en": {
        "primary": "Inter",
        "fallback": "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      },
      "ar": {
        "primary": "IBM Plex Sans Arabic",
        "fallback": "Tajawal, system-ui"
      }
    },
    "loading": {
      "google_fonts": [
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
      ],
      "notes": [
        "Apply font via CSS variables and [lang='ar'] selector",
        "Do not use italics for Arabic"
      ]
    },
    "scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-[color:var(--hu-text-secondary)]",
      "h3": "text-lg font-semibold",
      "body": "text-sm md:text-base leading-relaxed",
      "small": "text-xs md:text-sm"
    },
    "arabic_overrides": {
      "base_size": "[lang='ar'] body: text-[17px] md:text-[18px]",
      "line_height": "[lang='ar'] .prose, [lang='ar'] p: leading-[1.75]",
      "no_tracking": "Avoid tracking-* utilities on Arabic headings"
    }
  },
  "design_tokens_css": {
    "file_targets": [
      "/app/frontend/src/index.css",
      "/app/frontend/src/App.css"
    ],
    "instructions": [
      "Replace default shadcn :root tokens with HealthUnion semantic tokens mapped to the mandatory hex palette.",
      "Remove the default CRA demo styles in App.css (App-logo/App-header) and avoid .App { text-align:center }.",
      "Use explicit backgrounds for all sections (no transparent section backgrounds)."
    ],
    "css_variables_scaffold": ":root {\n  --hu-navy: 10 34 64; /* #0A2240 */\n  --hu-indigo: 30 58 138; /* #1E3A8A */\n  --hu-teal: 13 148 136; /* #0D9488 */\n  --hu-mint: 16 185 129; /* #10B981 */\n  --hu-gray: 248 250 252; /* #F8FAFC */\n\n  --background: var(--hu-gray);\n  --foreground: var(--hu-navy);\n  --card: 0 0% 100%;\n  --card-foreground: var(--hu-navy);\n  --popover: 0 0% 100%;\n  --popover-foreground: var(--hu-navy);\n\n  --primary: var(--hu-teal);\n  --primary-foreground: 248 250 252;\n  --secondary: 210 40% 98%;\n  --secondary-foreground: var(--hu-navy);\n  --muted: 210 40% 96%;\n  --muted-foreground: 215 16% 47%;\n  --accent: 210 40% 96%;\n  --accent-foreground: var(--hu-navy);\n\n  --border: 220 30% 88%;\n  --input: 220 30% 88%;\n  --ring: var(--hu-teal);\n\n  --radius: 0.75rem; /* 12px */\n\n  --hu-shadow-sm: 0 1px 2px rgba(10,34,64,0.06);\n  --hu-shadow-md: 0 10px 30px rgba(10,34,64,0.10);\n  --hu-shadow-lg: 0 18px 60px rgba(10,34,64,0.14);\n}\n\nhtml[dir='rtl'] {\n  direction: rtl;\n}\n\nbody {\n  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;\n  background-color: rgb(var(--hu-gray));\n  color: rgb(var(--hu-navy));\n}\n\nhtml[lang='ar'] body {\n  font-family: 'IBM Plex Sans Arabic', Tajawal, system-ui;\n}\n\n::selection {\n  background: rgba(13,148,136,0.22);\n}\n\n/* Subtle noise overlay utility (apply to hero only) */\n.hu-noise {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.08\"/></svg>');\n  background-repeat: repeat;\n}\n"
  },
  "layout_spacing": {
    "grid": {
      "container": "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
      "columns": "12-col mental model; implement with Tailwind grid grid-cols-12 gap-4 sm:gap-6",
      "section_padding": "py-14 sm:py-18 lg:py-22",
      "rhythm": "Use 2-3x more whitespace than typical corporate templates; prefer generous vertical spacing"
    },
    "patterns": {
      "home": [
        "Hero (navy overlay + image) <= 20% viewport gradient usage",
        "Focus Markets grid (4 cards) with subtle borders",
        "Services pathways preview (3 pathway cards)",
        "Trust strip (regulators logos as text badges)",
        "Insights preview (magazine grid)",
        "CTA band (solid navy, teal CTA)"
      ],
      "services": [
        "Tabbed or segmented pathways: North America / Saudi (SFDA) / Other GCC",
        "Each pathway: intro + deliverables list + timeline chips",
        "Disclaimer note in Alert component"
      ],
      "about_team": [
        "Two-unit layout: Canada Strategy Unit + Riyadh Operations Unit",
        "Team cards with role + region badge",
        "Map-style abstract section (no interactive map required)"
      ],
      "insights": [
        "Magazine grid: 1 featured article + 6 standard cards",
        "Filters via Select (category) + Input (search)"
      ],
      "contact": [
        "Split layout: left = intake form, right = trust + response expectations",
        "Secure upload note + consent checkbox"
      ]
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": [
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/navigation-menu.jsx",
        "/app/frontend/src/components/ui/sheet.jsx",
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/badge.jsx",
        "/app/frontend/src/components/ui/separator.jsx",
        "/app/frontend/src/components/ui/accordion.jsx",
        "/app/frontend/src/components/ui/tabs.jsx",
        "/app/frontend/src/components/ui/select.jsx",
        "/app/frontend/src/components/ui/checkbox.jsx",
        "/app/frontend/src/components/ui/input.jsx",
        "/app/frontend/src/components/ui/textarea.jsx",
        "/app/frontend/src/components/ui/alert.jsx",
        "/app/frontend/src/components/ui/dialog.jsx",
        "/app/frontend/src/components/ui/sonner.jsx"
      ],
      "optional": [
        "Flowbite: breadcrumb patterns (but implement using shadcn breadcrumb.jsx)",
        "21st.dev: bento grid inspiration only; implement with Tailwind grid"
      ]
    },
    "header_nav": {
      "style": [
        "Sticky header with solid navy background (no transparency): bg-[#0A2240]",
        "Add subtle bottom border: border-b border-white/10",
        "Height: h-16 sm:h-18",
        "CTA button always visible on desktop; on mobile inside Sheet"
      ],
      "language_switcher": {
        "ui": "Segmented pill with two options EN / العربية",
        "tailwind": "inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1",
        "active_state": "bg-white text-[#0A2240] shadow-sm",
        "data_testids": {
          "switch_en": "language-switch-en",
          "switch_ar": "language-switch-ar"
        }
      },
      "data_testids": {
        "nav": "site-header-nav",
        "cta": "header-book-consultation-button",
        "mobile_menu": "header-mobile-menu-button"
      }
    },
    "buttons": {
      "shape": "Rounded 10-12px (use --radius 12px)",
      "variants": {
        "primary": {
          "use": "Book a Consultation, Submit Intake",
          "classes": "bg-[#0D9488] text-white hover:bg-[#10B981] focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2",
          "motion": "hover: translateY(-1px) + shadow-md; active: scale-[0.98]"
        },
        "secondary": {
          "use": "View Services, Download Capability Deck",
          "classes": "border border-[#1E3A8A]/30 text-[#0A2240] bg-white hover:bg-[#F8FAFC]",
          "motion": "hover: border color strengthens + subtle shadow"
        },
        "ghost": {
          "use": "Inline actions in blog cards",
          "classes": "bg-transparent text-[#1E3A8A] hover:bg-[#1E3A8A]/5"
        }
      },
      "do_not": [
        "Do not use gradient buttons (small UI element restriction)",
        "Do not use transition: all"
      ]
    },
    "cards": {
      "base": {
        "classes": "rounded-xl bg-white border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-sm)] hover:shadow-[var(--hu-shadow-md)]",
        "hover": "translateY(-2px) on hover for clickable cards",
        "header_line": "Add a 2px top accent line in teal for featured cards: before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-[#0D9488]"
      },
      "market_card": {
        "layout": "Icon + title + 2 bullets + small badge",
        "accent": "Use Mint bullets (#10B981) and Indigo badge",
        "data_testid_pattern": "market-card-usa | market-card-canada | market-card-saudi | market-card-gcc"
      },
      "team_card": {
        "use": "Avatar + name + role + unit badge",
        "badge": "Badge variant outline with indigo border"
      }
    },
    "forms": {
      "intake_form": {
        "layout": "Two-column on lg, single column on mobile; labels aligned to start/end based on dir",
        "components": [
          "Input (company name)",
          "Select (product category)",
          "Select (device classification)",
          "Checkbox group (target markets)",
          "Textarea (message)",
          "Input type=file (PDF upload) wrapped in Card with security note",
          "Checkbox (GDPR/PDPL consent)",
          "Button (submit)"
        ],
        "field_styles": [
          "Inputs: bg-white border-[#1E3A8A]/15 focus-visible:ring-[#0D9488]",
          "Helper text: text-xs text-[#0A2240]/70",
          "Error text: text-sm text-[#B91C1C]"
        ],
        "data_testids": {
          "company": "intake-company-input",
          "product_category": "intake-product-category-select",
          "device_class": "intake-device-classification-select",
          "markets": "intake-target-markets-checkbox-group",
          "message": "intake-message-textarea",
          "upload": "intake-pdf-upload-input",
          "consent": "intake-consent-checkbox",
          "submit": "intake-submit-button",
          "success": "intake-success-message",
          "error": "intake-error-message"
        }
      }
    },
    "blog": {
      "list_layout": {
        "pattern": "Magazine grid: featured card spans 2 columns on desktop; others in 3-col grid",
        "featured_card": "Use AspectRatio for image + overlay label",
        "meta": "Date + reading time chips (Badge)"
      },
      "detail_layout": {
        "pattern": "Readable article container max-w-3xl; use Separator; sticky TOC optional",
        "typography": "Use prose classes but ensure colors map to navy/indigo"
      },
      "data_testids": {
        "blog-card": "blog-card",
        "blog-featured-card": "blog-featured-card",
        "blog-search-input": "blog-search-input",
        "blog-category-select": "blog-category-select"
      }
    },
    "disclaimer": {
      "component": "Alert",
      "style": "bg-[#F8FAFC] border border-[#1E3A8A]/20 text-[#0A2240]",
      "icon_color": "#1E3A8A",
      "data_testid": "services-disclaimer-alert"
    },
    "footer": {
      "style": [
        "Solid navy background: bg-[#0A2240]",
        "Top border: border-t border-white/10",
        "Columns: 2 on mobile, 4 on desktop",
        "Include compliance disclaimer + privacy links"
      ],
      "data_testids": {
        "footer": "site-footer",
        "footer-consultation": "footer-book-consultation-button"
      }
    }
  },
  "motion_microinteractions": {
    "principles": [
      "Subtle, clinical motion: 120-220ms durations",
      "Use easing: cubic-bezier(0.2, 0.8, 0.2, 1)",
      "No bouncy overshoot; keep it corporate"
    ],
    "interactions": {
      "nav": [
        "Sticky header adds shadow after scroll (IntersectionObserver)"
      ],
      "cards": [
        "Hover lift: translateY(-2px) + shadow-md",
        "Focus-visible: ring-2 ring-teal"
      ],
      "buttons": [
        "Hover: slight lift + shadow",
        "Active: scale-[0.98]",
        "Loading: show spinner + disable"
      ],
      "page_sections": [
        "Entrance: fade-up on scroll for section headers and grids (Framer Motion optional)"
      ]
    },
    "libraries": {
      "optional": {
        "framer_motion": {
          "install": "npm i framer-motion",
          "usage": "Use for section fade-up and staggered card entrances; respect prefers-reduced-motion"
        }
      }
    }
  },
  "imagery": {
    "direction": [
      "Photorealistic, high-end: modern labs, clean cosmetic R&D, corporate glass architecture",
      "Avoid clichés: no gloved hands, no generic stethoscope shots",
      "Prefer abstract structural visuals: globe grids, architectural lines, lab equipment wide shots",
      "Use images as side panels or card headers; keep text on solid backgrounds for readability"
    ],
    "image_urls": {
      "hero_background": [
        {
          "url": "https://images.pexels.com/photos/6213098/pexels-photo-6213098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "Glass facade / global corporate feel; use with navy overlay + subtle noise"
        }
      ],
      "services_section": [
        {
          "url": "https://images.pexels.com/photos/9574395/pexels-photo-9574395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "Modern lab equipment wide shot; use as card header image"
        }
      ],
      "insights_featured": [
        {
          "url": "https://images.pexels.com/photos/13891122/pexels-photo-13891122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "Premium skyscraper; use for featured insight card"
        }
      ],
      "cosmetics_context": [
        {
          "url": "https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "description": "Minimal premium cosmetic product still-life; use sparingly for cosmetics pathway"
        }
      ]
    }
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast: navy text on clinical gray/white; white text on navy",
      "Visible focus states: ring-teal + ring-offset",
      "Keyboard navigable menus and dialogs (shadcn defaults)",
      "Respect prefers-reduced-motion: disable scroll animations"
    ],
    "rtl_a11y": [
      "Keep DOM order logical for screen readers; avoid purely visual reordering unless necessary",
      "Ensure language switcher updates lang attribute for correct screen reader pronunciation"
    ]
  },
  "instructions_to_main_agent": [
    "Update /app/frontend/src/index.css : replace :root tokens with the provided HealthUnion tokens; keep shadcn structure.",
    "Remove CRA demo styles from /app/frontend/src/App.css and replace with minimal layout helpers only.",
    "Implement sticky header using shadcn NavigationMenu + Sheet for mobile; include language switcher pill.",
    "Use Tailwind logical utilities for RTL: ms-*, me-*, ps-*, pe-*, text-start/text-end; avoid left/right utilities.",
    "Ensure every interactive element and key info has data-testid (kebab-case).",
    "Do not use gradients beyond hero decorative overlay (<=20% viewport). Use solid navy/gray/white for reading areas.",
    "Use shadcn Select/Checkbox/Input/Textarea for the intake form; file upload can be native input styled inside Card.",
    "Blog list uses magazine grid with one featured card; blog detail uses max-w-3xl readable layout.",
    "Arabic typography: no tracking, no italics, slightly larger base size and line-height."
  ]
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black-white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2-4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
