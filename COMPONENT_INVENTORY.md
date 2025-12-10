# Component Inventory - Keep/Remove Decision List

**Generated:** 2025-12-10  
**Purpose:** Complete list of all components and UI elements for review and cleanup decisions

---

## 📊 Summary
- **Total Components:** 64 files → **~35 files** (after cleanup)
- **Currently Used in App:** 20+ components
- **Removed:** ~25-30 unused components and empty directories
- **Cleanup Date:** 2025-12-10

---

## ✅ CORE COMPONENTS (Currently Used - KEEP)

### Layout & Structure
- ✅ `components/ui/PageContainer.tsx` - **USED** - Main container component (used in all pages)
- ✅ `components/providers/ThemeProvider.tsx` - **USED** - Theme context provider (used in layout)

### Navigation
- ✅ `components/navigation/Design9Nav.tsx` - **USED** - Main navigation (used in layout.tsx)
- ❌ ~~`components/navigation/Navigation.tsx`~~ - **REMOVED**
- ❌ ~~`components/navigation/Design5Nav.tsx`~~ - **REMOVED**
- ❌ ~~`components/navigation/GlowNav.tsx`~~ - **REMOVED**
- ❌ ~~`components/navigation/MainNav.tsx`~~ - **REMOVED**

### UI Primitives (shadcn/ui)
- ✅ `components/ui/Button.tsx` - **USED** - Core button component (used extensively)
- ✅ `components/ui/accordion.tsx` - **USED** - Accordion component (used in where/page.tsx)
- ✅ `components/ui/dialog.tsx` - **USED** - Dialog/modal component (used in onboarding-checklist)
- ✅ `components/ui/badge.tsx` - **USED** - Badge component (used in blog-post-card)
- ✅ `components/ui/tabs.tsx` - Tabs component
- ✅ `components/ui/card.tsx` - Card component

### About Section Components
- ✅ `components/about/AboutSection.tsx` - **USED** - Main about section wrapper (used in who/page.tsx, what/page.tsx)
- ✅ `components/about/AboutBento.tsx` - **USED** - Bento grid layout (used in who/page.tsx)
- ✅ `components/about/AboutHero.tsx` - Hero section for about page
- ✅ `components/about/AboutCTA.tsx` - **USED** - Call-to-action component
- ✅ `components/about/FounderSection.tsx` - Founder information section
- ✅ `components/about/FounderCard.tsx` - Individual founder card
- ✅ `components/about/MissionVisionSection.tsx` - Mission & vision section
- ✅ `components/about/MissionCard.tsx` - Mission card component
- ✅ `components/about/VisionCard.tsx` - Vision card component
- ✅ `components/about/StatsGrid.tsx` - Statistics grid display
- ✅ `components/about/StatCard.tsx` - Individual stat card
- ✅ `components/about/StartupProgramSection.tsx` - Startup program section
- ✅ `components/about/StartupProgramCard.tsx` - **USED** - Startup program card
- ✅ `components/about/HowWeWorkSection.tsx` - How we work section

### Hero Components
- ✅ `components/hero/Hero.tsx` - **USED** - Main hero component
- ✅ `components/ui/Design7Hero.tsx` - **USED** - Design 7 hero variant (used in what/page.tsx)
- ❌ ~~`components/ui/Design4Hero.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/HeroSection.tsx`~~ - **REMOVED**

### Page-Specific Components
- ✅ `components/ui/TeamGrid.tsx` - **USED** - Team grid (used in app/page.tsx)
- ✅ `components/ui/ExploreSection.tsx` - **USED** - Explore section (used in app/page.tsx)
- ✅ `components/ui/WhySection.tsx` - **USED** - Why section (used in why/page.tsx)
- ✅ `components/ui/ProductFeatures.tsx` - **USED** - Product features (used in how/page.tsx)
- ✅ `components/ui/QuoteSection.tsx` - **USED** - Quote section (used in how/page.tsx)
- ✅ `components/ui/typewriter-testimonial.tsx` - **USED** - Typewriter testimonials (used in how/page.tsx)

### Layout Components
- ✅ `components/ui/TextBanner.tsx` - **USED** - Text banner (used in layout.tsx)
- ✅ `components/ui/footer-section.tsx` - **USED** - Footer component (used in layout.tsx)
- ✅ `components/ui/Banner.tsx` - **USED** - Image banner component (used in Hero, TeamGrid)

### Utility Components
- ✅ `components/ui/AvatarGroup.tsx` - **USED** - Avatar group component (used in Hero)
- ✅ `components/ui/Icon.tsx` - **USED** - Icon component (used in MainNav, CardNav)
- ✅ `components/ui/PageContainer.tsx` - **USED** - Page container (used everywhere)

---

## ⚠️ POTENTIALLY UNUSED COMPONENTS (Review Needed)

### Card Components
- ✅ `components/ui/card-21.tsx` - **KEPT** - Destination card (used in ProductFeatures)
- ✅ `components/ui/blog-post-card.tsx` - **KEPT** - Blog post card (used in ProductFeatures)
- ❌ ~~`components/ui/VisitingCard.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/CreditCard.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/CardNav/`~~ - **REMOVED** (entire directory)

### Animation & Effects
- ✅ `components/ui/Tilt.tsx` - **KEPT** - Tilt effect component (used in FounderCard, MissionCard, VisionCard)
- ❌ ~~`components/ui/DomeGallery.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/OrbitingCirclesContainer.tsx`~~ - **REMOVED** (was only used in Design4Hero)
- ❌ ~~`components/ui/OrbitingCircle.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/Silk.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/ethereal-shadow.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/EtherealShadowSection.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/background-gradient-animation.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/GradientText.tsx`~~ - **REMOVED**

### Interactive Components
- ✅ `components/ui/onboarding-checklist.tsx` - **KEPT** - Onboarding checklist (used in ProductFeatures)
- ❌ ~~`components/ui/interactive-image-accordion.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/image-swiper.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/glow-menu.tsx`~~ - **REMOVED** (was only used in GlowNav)
- ❌ ~~`components/ui/video-player.tsx`~~ - **REMOVED**
- ❌ ~~`components/ui/MagicBento.tsx`~~ - **REMOVED**

---

## 🗑️ EMPTY DIRECTORIES (Removed)

- ❌ ~~`components/CardStack/`~~ - **REMOVED**
- ❌ ~~`components/demo/`~~ - **REMOVED**
- ❌ ~~`components/explore-grid/`~~ - **REMOVED**
- ❌ ~~`components/trusted-band/`~~ - **REMOVED**
- ❌ ~~`components/ui/tilt/`~~ - **REMOVED** (empty directory)

---

## 📝 COMPONENT USAGE MAP

### Used in `app/layout.tsx`:
- Design9Nav
- ThemeProvider
- TextBanner
- Footer (footer-section)

### Used in `app/page.tsx` (Home):
- TeamGrid
- ExploreSection
- PageContainer

### Used in `app/who/page.tsx`:
- AboutBento
- AboutSection
- PageContainer

### Used in `app/what/page.tsx`:
- AboutSection
- Design7Hero
- PageContainer

### Used in `app/why/page.tsx`:
- WhySection
- PageContainer

### Used in `app/how/page.tsx`:
- ProductFeatures
- QuoteSection
- TypewriterTestimonial
- PageContainer

### Used in `app/where/page.tsx`:
- Accordion
- PageContainer

---

## 🎯 RECOMMENDATIONS

### HIGH PRIORITY - KEEP (Core Functionality)
1. All components in "CORE COMPONENTS" section
2. All About section components (used in /who and /what pages)
3. All Hero components (used in various pages)
4. All Navigation components (at least one variant)

### MEDIUM PRIORITY - REVIEW (May Be Used Indirectly)
1. Card components (card-21, blog-post-card) - used in ProductFeatures
2. Animation components (OrbitingCircles, Tilt) - used in other components
3. Interactive components (onboarding-checklist, glow-menu) - used in other components

### LOW PRIORITY - CONSIDER REMOVING (Unused or Experimental)
1. Empty directories (CardStack, demo, explore-grid, trusted-band)
2. Unused card variants (VisitingCard, CreditCard)
3. Unused animation effects (Silk, ethereal-shadow, background-gradient-animation)
4. Unused interactive components (interactive-image-accordion, image-swiper, video-player)
5. Alternative nav designs (Design5Nav, GlowNav, MainNav) - if Design9Nav is the only one needed
6. Alternative hero designs (Design4Hero, HeroSection) - if Design7Hero and Hero are sufficient

---

## 📋 DECISION CHECKLIST

Use this checklist to mark your decisions:

### Navigation Components
- [ ] Keep Design9Nav (currently used)
- [ ] Keep/Remove Design5Nav
- [ ] Keep/Remove GlowNav
- [ ] Keep/Remove MainNav
- [ ] Keep/Remove Navigation

### Hero Components
- [ ] Keep Hero (currently used)
- [ ] Keep Design7Hero (currently used)
- [ ] Keep/Remove Design4Hero
- [ ] Keep/Remove HeroSection

### Card Components
- [ ] Keep card-21 (used in ProductFeatures)
- [ ] Keep blog-post-card (used in ProductFeatures)
- [ ] Keep/Remove VisitingCard
- [ ] Keep/Remove CreditCard
- [ ] Keep/Remove CardNav components

### Animation Components
- [ ] Keep OrbitingCirclesContainer (used in Design4Hero)
- [ ] Keep Tilt (used in Founder/Mission/Vision cards)
- [ ] Keep/Remove DomeGallery
- [ ] Keep/Remove Silk
- [ ] Keep/Remove ethereal-shadow components
- [ ] Keep/Remove background-gradient-animation
- [ ] Keep/Remove GradientText

### Interactive Components
- [ ] Keep onboarding-checklist (used in ProductFeatures)
- [ ] Keep glow-menu (used in GlowNav)
- [ ] Keep/Remove interactive-image-accordion
- [ ] Keep/Remove image-swiper
- [ ] Keep/Remove video-player
- [ ] Keep/Remove MagicBento

### Empty Directories
- [ ] Remove CardStack/
- [ ] Remove demo/
- [ ] Remove explore-grid/
- [ ] Remove trusted-band/

---

## 📊 STATISTICS

- **Total Components (Before):** 64
- **Total Components (After):** ~35
- **Removed:** ~25-30 components + 5 empty directories
- **Core Components (Kept):** ~35
- **Test Files:** 1 (Button.test.tsx) - Removed 2 test files (nav.test.tsx, interactive-accordion.test.tsx)

## ✅ CLEANUP COMPLETED (2025-12-10)

### Removed Components Summary:
- **Navigation:** 4 variants removed (kept Design9Nav)
- **Hero:** 2 variants removed (kept Hero and Design7Hero)
- **Cards:** 3 components removed (kept card-21 and blog-post-card)
- **Animations:** 8 components removed (kept Tilt)
- **Interactive:** 5 components removed (kept onboarding-checklist)
- **Empty Directories:** 5 removed
- **Test Files:** 2 removed (nav.test.tsx, interactive-accordion.test.tsx)

### Build Status:
✅ Build passes successfully after cleanup

---

**Next Steps:**
1. Review this list and mark your decisions
2. I can help remove unused components and clean up the codebase
3. Update imports if any components are removed

