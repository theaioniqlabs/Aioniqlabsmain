# Navigation Viewport Clipping Fix
**Date:** 2025-12-29  
**Issue:** Dropdown content is hidden/clipped in viewport container

---

## Problem Identified

**Symptom:** Content div is rendered (270px height) but hidden inside viewport container

**Root Cause:**
1. Viewport has `overflow-hidden` which clips content
2. Viewport height `h-[var(--radix-navigation-menu-viewport-height)]` might be 0 or too small
3. Content is positioned inside viewport but gets clipped

**DOM Evidence:**
- Content div: `width=510px, height=270px` ✅ (content exists)
- Viewport: `h-[var(--radix-navigation-menu-viewport-height)]` ⚠️ (height might be 0)
- Viewport: `overflow-hidden` ⚠️ (clips content)

---

## Fixes Applied

### 1. Viewport Overflow
**File:** `components/ui/navigation-menu.tsx`

**Change:** `overflow-hidden` → `overflow-visible` on NavigationMenuViewport

**Before:**
```tsx
"... overflow-hidden rounded-md border ..."
```

**After:**
```tsx
"... overflow-visible rounded-md border ..."
```

**Reason:** Allows content to be visible even if viewport height calculation is delayed

### 2. Viewport Min-Height
**File:** `components/ui/navigation-menu.tsx`

**Added:** `min-h-[200px]` to NavigationMenuViewport

**Before:**
```tsx
"h-[var(--radix-navigation-menu-viewport-height)] ..."
```

**After:**
```tsx
"min-h-[200px] h-[var(--radix-navigation-menu-viewport-height)] ..."
```

**Reason:** Ensures viewport has minimum height while Radix calculates actual height

### 3. Content Overflow
**File:** `components/ui/navigation-menu.tsx`

**Added:** `overflow-visible` to NavigationMenuContent

**Before:**
```tsx
"... md:absolute md:w-auto"
```

**After:**
```tsx
"... md:absolute md:w-auto overflow-visible"
```

**Reason:** Ensures content is not clipped by content container

---

## Why These Fixes Work

### `overflow-visible` on Viewport
- **Trade-off:** Loses rounded corner clipping, but content is visible
- **Solution:** Content itself has rounded corners, so viewport doesn't need to clip
- **Alternative:** Could use `overflow-y-auto` if content is very tall

### `min-h-[200px]` Fallback
- **Purpose:** Ensures viewport has height while Radix calculates
- **Value:** 200px is enough for most dropdown content
- **Behavior:** Radix will override with calculated height when ready

### `overflow-visible` on Content
- **Purpose:** Ensures nested content (UL, list items) are fully visible
- **Impact:** No clipping of menu items or icons

---

## Expected Result

After these fixes:
- ✅ Dropdown content is fully visible
- ✅ No clipping by viewport container
- ✅ Content appears correctly below triggers
- ✅ All menu items and text are visible
- ✅ Icons are visible

---

## Testing

1. ✅ Viewport overflow changed to `overflow-visible`
2. ✅ Viewport has `min-h-[200px]` fallback
3. ✅ Content has `overflow-visible`
4. ⚠️ **Action Required:** Hard refresh browser (Ctrl+Shift+R)
5. ⚠️ **Action Required:** Test "Explore" dropdown - content should be visible
6. ⚠️ **Action Required:** Test "Company" dropdown - content should be visible
7. ⚠️ **Action Required:** Verify all menu items are fully visible

---

## Alternative Solution (If Needed)

If rounded corners are critical, we could:
1. Keep `overflow-hidden` on viewport
2. Add padding to content to account for rounded corners
3. Ensure viewport height is always calculated correctly

But for now, `overflow-visible` is the simplest solution to ensure content is visible.

---

**Status:** ✅ **FIXES APPLIED** - Ready for testing
