# Blackjack Trainer Hint Feature Plan

## Goal

Add a **Hint** button that opens a basic strategy chart in a modal
overlay. Closing the modal should return the user to the exact same
training state (same hand, score, mode, and retry queue). The existing
training logic should remain untouched.

------------------------------------------------------------------------

## Step 1 - Add the Hint Button

-   Add a **Hint** button below the action buttons and above **Back to
    Mode Select**.
-   Create a `showHint()` function that temporarily displays
    `alert("Hint")`.

**Verify** - Button appears. - Existing gameplay is unchanged.

------------------------------------------------------------------------

## Step 2 - Add the Hidden Modal

Create a hidden `<div id="hintModal">` containing: - Title ("Basic
Strategy") - Close button - Placeholder text

Add: - `showHint()` - `hideHint()`

These functions simply show/hide the modal.

**Verify** - Hint opens the modal. - Close returns to the same hand
without resetting anything.

------------------------------------------------------------------------

## Step 3 - Style the Modal

Add CSS for: - Dark translucent backdrop - Centered dialog - Rounded
corners - Scrollable content - Close button

**Verify** - Works on desktop and mobile.

------------------------------------------------------------------------

## Step 4 - Build the Strategy Chart

Replace the placeholder with an HTML table.

Include: - Dealer up cards (2-A) - Hard totals - Soft totals - Pairs

Each cell contains: - H - S - D - P - R

No colors yet.

**Verify** - Table displays correctly. - Scrolls if necessary on small
screens.

------------------------------------------------------------------------

## Step 5 - Color Coding

Color only the action letters:

-   Stand = Green
-   Hit = Red
-   Double = Blue
-   Split = Gold
-   Surrender = Purple

------------------------------------------------------------------------

## Step 6 - Add a Legend

Add a legend above the chart explaining each letter using the same
colors.

------------------------------------------------------------------------

## Step 7 - Final Verification

Confirm: - Hint opens and closes repeatedly. - Current hand is
preserved. - Score is preserved. - Retry queue is preserved. - Mode is
preserved. - No console errors. - Desktop and mobile layouts work.

------------------------------------------------------------------------

## Design Constraint

Do **not** modify the existing trainer logic (`scenario`, `answer()`,
`next()`, `mistakeQueue`, scoring, or mode behavior). Limit changes to:

-   HTML (Hint button and modal)
-   CSS (modal styling)
-   JavaScript (`showHint()` / `hideHint()` only)
