# TODO for Aretex Bridge Changes

## v.0.6.2

### GLOBAL: All Components and Files

* Clean Project Structure
* Clean Imports
* Clean Source Code
* Sanitize Data
* Update hard-coded hex code colors to `tailwind` variables
* Update components to be responsive

### Posting: `MainContent` Component on Home Page

* Fix sorting on posting - update schema for posting

* Fix posting index issue

### Store: `UserStore` for Home Page

* Move `recruitmentStatusAtom` from `UserStore` move to `profileStore`

### Profiling: `Onboarding` Components on Onboarding Page

* Add validation for required `input` fields before submitting to `server`
* Add date picker for consistency of date formats

### Profiling: `OnboardingForm` Component on Onboarding Page

* Follow-up reminder for missing info on `onboarding` form

### Updating: `CTAButtons` Component

* Add `filled` and `unfilled` type variant same as `LabelTag` Component
* Add `IconOnly` or maybe a separate component

### Updating: `NotificationsList` Component

* Add functionality for pressing the `notification` to change it to `read` status
* Add functionality for hiding a `notification` via `button`
* Add functionality for marking a `notification` read via `button`

### Updating: `NotificationsFooter` Component

* Add functionality for changing all `notification` to `read` status
* Add functionality for viewing all `notification` on a modal window

### Updating: `NotificationsDropdown` Component

* Add functionality for updating `notification` count in real time
* Add `toaster` component for notifying `users`

### Store: `NavSideBarStore` for Home Page

* Add Active state of Routes

### Updating: `Shortcuts` Component

* Add sorting functionality to `shortcut` via a `button`
* Newly added `shortcut` should be on top of the list
* Fix order of `shortcuts` does not persist after refresh or after sign in
* Add `alert` when the link is invalid when editing or adding link after `regex` validation

### Updating: `Sidebar` Component

* Fix `active` state of navigation when clicking a route

### Updating: `ClientItemCard` Component

* Add `label` attribute on atom for `ClientItemCard` Component

### Updating: `CreatePostButton` Component

* Randomize placeholder text
