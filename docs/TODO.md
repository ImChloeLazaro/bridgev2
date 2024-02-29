# TODO for Aretex Bridge Changes

## v.0.6.4

### GLOBAL: All Components and Files

* Clean Project Structure
* Clean Imports
* Clean Source Code
* Sanitize Data
* Update hard-coded hex code colors to `tailwind` variables
* Update components to be responsive

### New Feature: Info & Confirmation Modal Windows

* Add `modal` windows for actions, notifications, confirmation, and other related actionable event

### New Feature: Google APIs for G-Drive and G-Calendar

* Add foundation for `Google` APIs for G-Drive and G-Calendar

### Refactor: Migrating hard-coded hex code color to tailwind color

* Migrate hard-coded `hex` code color to `tailwind` color

### Profiling: `Onboarding` Components on Onboarding Page

* Add validation for required `input` fields before submitting to `server`

### Profiling: `OnboardingForm` Component on Onboarding Page

* Follow-up reminder for missing info on `onboarding` form

### Updating: `OnboardingHeader` Component on Onboarding Page

* Add functionality to be able to navigation thru the `stepper` component

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

### Updating: `Shortcuts` Component

* Add sorting functionality to `shortcut` via a `button`
* Newly added `shortcut` should be on top of the list
* Fix order of `shortcuts` does not persist after refresh or after sign in
* Add `alert` when the link is invalid when editing or adding link after `regex` validation

### Updating: `ClientItemCard` Component

* Add `label` attribute on atom for `ClientItemCard` Component

### Updating: `CreatePostButton` Component

* Add Randomize function to generate placeholder text for `CreatePostButton` Component

### Updating: `NavigationBar` Component

* Fix `NavbarMenu` Component when screen is small (responsiveness)
* Fix this warning, message: `warning A component changed from uncontrolled to controlled.` `NavbarMenu` and `NavbarContent` component part is the source of the warning

### Updating: `HRBulletinBoardList` Component

* Add No announcement illustration when the `list` for HR Bulletin is empty

### Updating: `ManagePostMainContent` Component

* Add Prompt for `media` selection that `images` should be at least ...px `width` to avoid `images` not properly displayed
* Add validation to check `post` data to be completed first before publishing to `post` feed

### Refactor: `ManagePostSidebarContent` Component

* Rewrite this component to be a `AutoComplete` Component from @next/UI library
* Include user custom post template keys as `filter` keys when browsing
* Add `template` as a `status` for posts to be able to filter out as a post `template`
* Sort files uploaded by users and must persist its order

### Updating: `MediaLayoutPost` Components (One-SixPlus)

* Add the `layout` prop to each media layout component to correctly display the media on post feed

### Updating: `ImageSwiper` Component

* Add `zoom` functionality
* Add `keyboard` controls when sliding images

### Updating: `PostOptions` Component

* Add Functionality when hiding and reporting a `post`

### Updating: `RecognitionList` Component

* Add Functionality to view recognition in a modal window or direct to calendar
* Add No recognition illustration when the `list` for Recognition is empty

### Updating: `TrainingList` Component

* Add Functionality to view training in a modal window or direct to calendar
* Add No training illustration when the `list` for Training is empty
* Add Functionality to edit and cancel the selected training

### Store: `ManagePostStore`

* Change `key` prop to `employee` id to uniquely identify each user and can be identify by `all` and `team`

### Updating: `ProfileHeader` Component

* Fix button for changing profile photo
