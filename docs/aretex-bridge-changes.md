# Aretex Bridge Changes

## Phase 1 - Implementation of Initial Prototype

## v.0.1.0

* Initial Commit

## v.0.1.1

* Installed NextJS v14.0.4 as its framework
* Installed tailwind css v3.3.0
* Configured tailwind css to match Bridge's color palette
* Configured framework and components to match prototype's style in Figma
* Implemented Cognito Authentication for `backend` and `frontend`
* Added `Authenticator` Component from Amplify UI to test Cognito Authentication
* Fixed Reference Error `_window_` being accessed on the server

## v.0.2.0

* Added `Login` Page
* Added `Sidebar` and `NavigationBar` Component
* Added routes for `user` and `sign-in`
* Added custom font family `Helvetica Now Display` for Bridge
* Added reaction svg media for displaying reactions on `Post` Component
* Implemented Routing and Navigation for `frontend`
* Configured backend resources for Bridge
* Configured redirect URLs for sign-in and sign-out

## v.0.3.0

* Added Notifications Component
* Fixed Shortcuts to only scroll when overflowing

## v.0.3.1

* Added Functionality to Notifications & Shortcuts Component
* Fixed scrolling issue on shortcuts Component
* Added respective links to External Links Component
* Added respective links to Shortcuts Component
* Added AU and PH Aretex Website links to External Links
* Cleaned up and refactored source code
* Organized Project Structure
* Updated `README.md` for tracking updates

## v.0.3.2

* Updated Changelog

## v.0.3.3

* Added @dndkit for draggable Components
* Shortcuts are now draggable and sortable powered by @dndkit
* Added jotai-core and jotai-cache for global and local state management
* Added `store` folders for each component
* Implemented atom approach for a cleaner state management and to avoid prop drilling
* Fixed conflicting keys in sidebar Component

## v.0.3.3 - hotfix

* `SignInStore.jsx` commented contents due to build error

## v.0.3.4

* Removed Manual Sign In Component
* Added Shortcuts Functionality
* Fixed draggable shortcuts issue not updating on UI
* Fixed index conflict of draggable shortcuts by setting unique id for each sortable item(numbers eg. 1,2,3,4,5) does not work and using key prop does not work either
* Fixed unintentional behavior of draggable elements duplicating when double clicking it
* Changed `shortcuts` object in `ShortcutsStore` from

```javascript
const shortcuts = [{
key: string,
label: string,
link: string,
icon: <Icon>
suffix: <Icon>
}]
```

to

```javascript
const shortcuts = [{
id: number,
key: string,
label: string,
link: string,
}]
```

* Added routes for `admin`, `team_lead`, and `hr`
* Changed route name `team_lead` to `tl`
* Updated Switching Roles Functionality

## v.0.3.4 - hotfix

* Fixed bug on saving changes/edits of shortcuts due to `toUpperCase` method
* Fixed bug draggable shortcuts still draggable when editing shortcuts  

## v.0.4.0

* Added Onboarding Form
* Added route for `onboarding`
* Added react-form-stepper for stepper Component in Onboarding Form Component
* Removed Manual Sign In Components
* Updated Sign in Page to only display Google sign-in

## v.0.4.1

* Fixed index conflicting issue with `stepper` Component and content of the form.
* Merged backend and frontend from `devchloe` branch
* Created backup from `devchloe` branch

## v.0.4.2

* Reverted merge
* Separated frontend and backend for deployment
* Added @jotai/optics for large and nested object manipulation
* Added `store` folder in each major component and each page for managing its various state
* Added functionality of onboarding form - storing data
  * Note: Only `Background` section not yet done in onboarding form Component

## v.0.4.3

* Removed @jotai/optics due to `ReferenceError` during runtime
* Finished all functionality of onboarding form

## v.0.4.4

* Centralized frontend and backend repo to the `bridge-official` repo
* Added `store` folder for global state management
* Added `docs` folder for documentation
* Added `frontend-changes.md` in `docs` folder
* Moved contents for tracking frontend changes from `README.md` to `frontend-changes.md`
* Added `NewsFeed` Component
* Added `HighlightArea` Component
* Added `Trainings` Component
* Added `RexWinner` Component
* Added `Birthday` Component
* Renamed Component `NewsFeed.jsx` to `MainContent.jsx`
* Renamed Component `HighlightArea.jsx` to `RightBar.jsx`

## v.0.4.5

* Added @date-fns for datetime manipulation
* Added Recognitions Component
* Added HR Bulletin Board Component

## v.0.4.6

* Finished Adding All Components for Home Page

## v.0.4.6.1 - revision

* Changed External Links Label

## v.0.4.7

* Cleaned up and refactored source code
* Organized Project Structure
* Updated `package.json` and `package-lock.json` due to merge conflicts
* Updated old datetime functions with @date-fns functions
* Added protection for routes via middleware
* Added transition between navigating pages
* Added not-found page
* Added error page
* Added custom tailwind utility class `spinner` for page transition
* Added `light grey` and `dark grey` variant for color `grey` in `tailwind.config.js`

## v.0.4.8

* Cleaned up and refactored source code
* Organized Project Structure
* Updated Paths for All Components
* Disabled for now backend functions due to build configuration error
* Updated @tailwindcss to latest v3.4.1
* Added Media Layout Component
* Reverted middleware

## v.0.4.9

* `frontend` and `backend` separated and started from scratch due to build error in deployment
* Still disabled for now backend functions due to build configuration error (commented backend functions)
* Created and Downloaded backups of repos for `bridge-official` and `bridge-frontend`
* Added @swiper for image carousel/gallery
* Updated Media Layout Component to view the rest of the images via modal window
* Synced `bridge-frontend` repo to latest changes
* Checked and Fixed paths for Components
* Checked and Updated imports for Components
* Removed dead code and unused code
* Removed majority of `console.log()` left from development
* Added `TODO`s across the source code for logging tasks and reminders `prefix:// ### TODO...`
* Fixed post images now properly fill their container regardless of their shape

## v.0.4.10

* Updated Changelog

## v.0.5.0

* Merging of `frontend` and `backend`
* Synced changes from `frontend` as of v.0.4.10 and `backend` as of v.0.4.9
* Changed variable name from `export default ExternalLinksHeader;` to `export default SideBarHeader;`to match the Component's filename
* Changed redirect behavior of `ReconnectButton` to refresh the Page and `ReturnButton` to return to the previous page the user visits
* Added fetched user attributes to `UserDropdown` Component (name, picture, etc.)
* Added `signOut` function from @aws-amplify to `UserDropdown` Component
* Moved `options` for `UserDropdown` Component to `NavSideBarStore`
* Moved fetched user attributes from `user` page to `UserStore`
* Added `backend` functions for `shortcuts`

## v.0.5.0 - hotfix

* Added `middleware` for route protection
* Added missing libs in `package.json`

## v.0.5.0.1 - hotfix

* Fixed Import Error of `SwitchRoles`
* Added `Amplify.configure` to user page

## v.0.5.0.2 - hotfix

* Reverted adding `middleware`
* Reverted adding `routes` for `tl`, `admin`, and `hr`

## v.0.5.0.3 - hotfix

* Reverted remaining routes other than `user`

## v.0.5.0.4 - hotfix

* Reverted back to `clean backend` commit

## v.0.5.1

* Updated Changelog
* Implemented user attributes from `backend` and stored in `UserStore`
* Added `HRBulletinBoard` Component
* Added `Recognitions` Component
* Added `Trainings` Component
* Added `ImagePostCarousel` Component

## v.0.5.2

* Updated `UserDropdown` Component to get its state from `UserStore`
* Added Functionality to view a post's images full screen and displayed in a carousel/ gallery
* Fixed image gallery to display the correct selected image when viewing post
* Fixed image background blur on posts
* Added Functionality to increment and decrement reaction count
* Added Functionality when reacted to the post already it will persist
* Added tooltip for reaction's count
* Fixed animation for `Recognitions`, `Trainings`, and `HRBulletinBoard` Component when expanded and its height changes.
* Changed named export from `HighlightArea` to `RightBar`to match its filename
* Changed named export from `NewsFeed` to `MainContent` to match its filename
* Changed named export from `page` to `Onboarding` to match its filename
* Implemented database schema for `onboarding` form

## v.0.5.2 - hotfix

* Merged Changelog from prod repo `bridgev2` to `bridge-frontend`
* Removed `console.log()` on `PostFooter` Component
* Fixed import error by updating `next/router` to `next/navigation` on `ReconnectButton` and `ReturnButton` Component

## v.0.5.3

* Changed named export from `CreatePost` to `CreatePostCard`to match its filename
* Fetched user attributes are now displayed correctly in `UserDropdown` and `CreatePostCard` Component
* Adjusted whitespace around `MainContent` and `RightBar` Components
* Change text label for `ReturnButton`
* Added a role check on `NavigationBar` to fix the route issue
* Changed name export from `UserLayout` to `AdminLayout` to match its filename
* Changed name export from `UserLayout` to `TLLayout` to match its filename
* Changed name export from `UserLayout` to `HRLayout` to match its filename
* Added `middleware` for route protection and redirects

## v.0.5.4

* Reverted `middleware` again due to causing a internal server error on deployment
* Changed name export from `Item` to `ShortcutItem` to match its filename
* Rewrite `applicationOnboardingAtom` Atoms in to separate atoms
* Rewrite `backgroundOnboardingAtom` Atoms in to separate atoms
* Rewrite `employmentOnboardingAtom` Atoms in to separate atoms
* Rewrite `contactOnboardingAtom` Atoms in to separate atoms
* Added `applicationTabsAtom`in `OnboardingStore`
* Added `backgroundTabsAtom` in `OnboardingStore`
* Added `employmentTabsAtom` in `OnboardingStore`
* Added `contactTabsAtom` in `OnboardingStore`
* Added `OnboardingFieldInput` Component as a reusable component for better control of field inputs
* Added `OnboardingSubmitted` Component to show after onboarding form is done and submitted
* Merged all onboarding data object before submitting to server
* Created a UI when user completed and submitted the onboarding form
* Added illustration when onboarding form is completed and submitted and then redirects to login page
* Added `isRequired` check for the required fields in the onboarding form

## v.0.5.5

* Fixed fetching of shortcut data from the backend
* Pulled backend resources from amplify
* Rewrite atom architecture for manipulating data coming from the backend in `ShortcutStore`
* Added backend functionality and resources for local development testing
* Updated the links for `Shortcuts` to be clickable and open a new tab
* Added `DEL` and `PUT` functions for deleting and editing shortcuts respectively (backend not yet implemented)
* Removed the role check on `NavigationBar` to fix the route issue
* Fixed `Badge` and `Sidebar` state from previous state still persists when switching roles
* Fixed route issue when manually entering URL is does not reflect on the page
* Updated illustration for when onboarding form is submitted
* Added profile components for `Profile` page
* Added `scale` tailwind extension for flipping images, svg and related media horizontally.
* Added a simple check to shortcuts link string if it includes `https://` or `http://`, includes it otherwise
* Updated shortcuts link to a valid link to redirect properly

## v.0.5.6

* Added backend and frontend functionality for `Profile`
* Updated the clear variant of `CTAButtons` Component to have a colored text
* Added `LabelTag` Component as a reusable component for displaying short labels e.g. ("active")
* Added `RightBarCard` Component as a reusable component for displaying content on the right bar of pages
* Updated `UserDropdown` Component to display job positon below the user's name
* Updated `useEffect` dependency in `providers.jsx`
* Moved `user` object from `authenticationAtom` in `AuthenticationStore` to `userAtom` in `UserStore`
* Fixed the warning thrown when both `birthday` gif and `rexWinner` gif are being loaded on page load by setting the `priority` prop to true
* Added `ProfileStore` for profile components
* Added `MainContent` Component
* Added `RightBar` Component
* Added `Benefits` Component
* Added `EmergencyContact` Component
* Added `LeaveBalance` Component
* Added `UserOnboarding` Component
* Added `header-profile.png` for default background header photo in profile page
* Added `OnboardingHeader.jsx` as a reusable component for displaying to the users that they do not have onboarding data yet
* Updated `Error` Page to be more verbose
* Added illustration for `Error` Page
* Disabled redirection logic when already signed in from `providers.jsx` to fix warning from jotai having `Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044`

## v.0.5.6.1 - hotfix

* Renamed Component `OnboardingHeader.jsx` to `OnboardingStatusAlert.jsx` in `/app/components`
* Fixed build error on `OnboardingStatusAlert.jsx` due to unescaped apostrophes

## v.0.5.7

* Cleaned up and refactored source code
* Organized Project Structure
* Removed unused imports and dead code
* Updated atom hooks for all Components
* Updated Changelog
* Added an authentication check where it checks if `user` is already signed in
* Added `onboarding` validation to check if user has `onboarding` data already
* Removed redundant `use client;` directive from all components
* Removed `useWindow.js` from `navigation` folder
* Removed `applicationOnboardingAtom` from `OnboardingStore`
* Removed `backgroundOnboardingAtom` from `OnboardingStore`
* Removed `employmentOnboardingAtom` from `OnboardingStore`
* Removed `contactOnboardingAtom` from `OnboardingStore`
* Removed `store` folder and `SignInStore` from sign-in folder due to redundancy
* Wrapped strings passed as children in curly brackets to prevent build error like unescaped apostrophes and such
* Moved `MainContent` and `RightBar` components from each page to a single reusable component in `app/components` folder
* Deleted `MainContent` and `RightBar` components from each page
* Fixed content being clipped when scrolling in `MainContent` and `RightBar` component
* Moved `amplifyconfiguration.json` and `aws-exports.js` to `src` folder outside the `app` folder
* Added `light blue` and `dark blue` variant for color `blue` in `tailwind.config.js`
* Removed duplicate `HRBulletinBoard` component file
* Changed name export from `HRBulletinBoard` to `HRBulletinBoardCard` to match its filename
* Updated right bar components from home page to use `RightBarCard` component from `/app/components` folder
* Removed `HRBulletinBoardCard` component file
* Removed `RecognitionCard` component file
* Removed `TrainingCard` component file
* Added website details at the bottom-right of sign-in page
* Added `font-xxs` variant for text size `fontSize` in `tailwind.config.js`
* Updated `NavigationBar` Component to display `UserDropdown` and `Notifications` Component to the right.
* Created a UI when user has already completed and submitted the onboarding form then redirects to the home page
* Added `onboarding-already-done.jpg` illustration for `Onboarding` Page when user has already completed and submitted the onboarding form
* Renamed Image Media `onboarding.jpg` to `onboarding-done-submitted.jpg`

## v.0.5.7.1 - hotfix

* Missing closing bracket in `ShortcutsOptionsModal` Component
* Pulled backend resources from amplify

## v.0.5.8

* Moved all rest api functions in `amplify-rest.js` in `/app/utils/` to be reusable across all components
* Added backend functions for editing and deleting shortcut
* Added file upload functions for posting
* Renamed Component `ImagePostCarousel.jsx` to `ImagePostCarouselModal.jsx`
* Changed type `recognition` to `award` in `PostStore.jsx`
* Added functionality to `ManagePost` Components
* Separated `ManagePost` Components into SideBar and MainContent layout
* Added `PostTemplateStore` for Post Template Components
* Added `TagPersonSelect` Component
* Added `ManagePostSidebarContent` Component
* Renamed `type` prop to `orientation` for `MediaLayout` Component
* Renamed `single` key to `portrait` in`layout` for `OneMedia` Component to match consistency from sibling components
* Renamed `multiple` key to `landscape` in`layout` for `OneMedia` Component to match consistency from sibling components
* Added functionality for `ReactionSelect` Component
* Added functionality for `TagPersonSelect` Component
* Added `SearchBar` Component
* Added `ManagePostTabs` Component
* Added `PostItemCard` Component

## v.0.5.9

* Fixed `NavigationBar` alignment
* Fixed `ManagePostModal` window to be centered on the screen
* Adjusted right padding in `Rightbar` Component for easier scrolling
* Added notification function for notifications
* Updated schema for `posthandler`
* Added `notificationhandler` function
* Fixed `ManagePostModal` Component alignment
* Added `reaction` folder for reaction related components
* Moved all reaction related components to `reaction` folder

## v.0.5.10

* Added `lightblue` variant color for blue in `Chiptag` Component
* Implemented tabs navigation for `ManagePostMainContent` Component
* Renamed `templateItemsAtom` to `templateTypeSelectionAtom` in `ManagePostStore`
* Renamed `selectedTemplateAtom` to `selectedTemplateTypeAtom` in `ManagePostStore`
* Added default values for `postTemplatesAtom` in `ManagePostStore`
* Implemented Functionality for `PostItemCard` Component
* Implemented Functionality for `TagPersonSelect` Component
* Implemented Functionality for components in `ManagePostModal` Component
* Converted `PostItemCard` to be a checkable component by wrapping the `Checkbox` component around it.
* Added `purple` variant color in `tailwind.config.js`
* Added `purple` variant color in `Chiptag` Component
* Renamed `selectedTabAtom` to `selectedProfileTabAtom` in `ProfileStore`
* Added show and hide functionality for password changes in profile page
* Implemented searching functionality for managing posts in `ManagePostModal` Component
* Added `no-found-posts.jpg` as illustration for when searching for posts and are not found in `ManagePostModal` Component

## v.0.5.11

* Fixed minor bug all templates are deleted when deleting custom template
* Fixed media and template buttons correctly displaying post template details when creating new posts
* Removed left over `console.log` in `ManagePost` Components
* Added `grey` variant color for `CTAButtons` Component
* Added backend handler function for route `/account`
* Added backend handler function for route `/benefits`
* Added backend handler function for route `/leave`
* Updated `post` backend handler function
* Updated `profile` backend handler function
* Updated `shortcut` backend handler function
* Updated `user` backend handler function
* Deleted `S3Trigger2a62b9a1` backend handler function
* Deleted `S3Triggere0041d22` backend handler function
* Added `leave` balance validation
* Added `POST` and `PUT` backend handler function for `benefits`
* Updated input fields for onboarding form to be required fields, for not applicable or optional fields `N/A` is needed as an input
* Added input field for `Employee ID` in `ApplicationOnboarding`
* Added input field for `Other Courses` and `Date of Attendance` for each education level in `BackgroundOnboarding`
* Removed `HighSchool` input field in `BackgroundOnboarding` Component
* Updated `draftPostListAtom` to include `orientation` property
* Updated `publishedPostListAtom` to include `orientation` property
* Updated `archivedPostListAtom` to include `orientation` property
* Changed `home_phone_number` to `landline_number` in `OnboardingStore`
* Renamed filename and named export of `PostMediaButton` to `ManagePostMediaButton` Component for consistency of naming related components
* Renamed filename and named export of `PostItemCard` to `ManagePostItemCard` Component for consistency of naming related components
* Renamed filename and named export of `PostTemplateButton` to `CreatePostTemplateButton` Component for consistency of naming related components
* Created `createPost` folder for `CreatePost` Components
* Moved `CreatePostTemplateButton` to `createPost` folder
* Moved `CreatePostCard` to `createPost` folder
* Moved `CreatePostButton` to `createPost` folder
* Added `MediaLayoutSelection` Component

## v.0.5.12

* Updated `benefits` backend handler function to be flexible
* Added default value for `benefits` backend handler function
* Renamed `MediaLayout` to `MediaLayoutPost` Component for consistency of naming related components
* Added `MediaLayoutDisplay` Component for previewing the media layout on `ManagePostSidebarContent` Component
* Added `MediaLayoutSelect` Component
* Added `MediaOrientationSelect` Component
* Fixed media layout and orientation selection for `ManagePost` Component
