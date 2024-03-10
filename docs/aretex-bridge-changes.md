# Aretex Bridge Changes

## Phase 1 - Implementation of Initial Prototype

## v.0.1.0

* Initial Commit

## v.0.2.0

* Installed NextJS `^14.0.4` as its framework
* Installed @tailwindcss latest `^3.3.0`
* Configured @tailwindcss to match Bridge's color palette
* Configured framework and components to match prototype's style in Figma
* Implemented Cognito Authentication for `backend` and `frontend`
* Added `Authenticator` Component from Amplify UI to test Cognito Authentication
* Fixed a bug where Reference Error `_window_` is being accessed before the client renders

## v.0.3.0

* Added `Login` Page
* Added `Sidebar` and `NavigationBar` Component
* Added routes for `user` and `sign-in`
* Added custom font family `Helvetica Now Display` for Bridge
* Added reaction svg media for displaying reactions on `Post` Component
* Implemented Routing and Navigation for `frontend`
* Configured backend resources for Bridge
* Configured redirect URLs for sign-in and sign-out

## v.0.3.0 - hotfix

* Added Notifications Component
* Fixed a bug where shortcuts scroll when it is not overflowing

## v.0.3.1

* Added Functionality to Notifications & Shortcuts Component
* Fixed a bug on shortcuts Component that causes scrolling issue
* Added respective links to External Links Component
* Added respective links to Shortcuts Component
* Added AU and PH Aretex Website links to External Links
* Cleaned up and refactored source code
* Organized Project Structure
* Updated `README.md` for tracking updates

## v.0.3.2

* Updated Changelog

## v.0.3.3

* Added @dndkit/core latest `^6.1.0` for draggable Components
* Added @dndkit/modifiers latest `^7.0.0` for draggable Components
* Added @dndkit/sortable latest `^8.0.0` for draggable Components
* Shortcuts are now draggable and sortable powered by @dndkit
* Added jotai-core and jotai-cache for global and local state management
* Added `store` folders for each component
* Implemented atom approach for a cleaner state management and to avoid prop drilling
* Fixed a bug where keys used in sidebar Component are conflicting causing sidebar items to have the same keys

## v.0.3.3 - hotfix

* `SignInStore.jsx` commented contents due to build error

## v.0.3.4

* Removed Manual Sign In Component
* Added Shortcuts Functionality
* Fixed a bug where draggable shortcuts issue are not updating the UI
* Fixed a bug causing index conflict of draggable shortcuts by setting unique id for each sortable item(numbers eg. 1,2,3,4,5) does not work and using key prop does not work either
* Fixed a bug causing unintentional behavior of draggable elements duplicating when double clicking it
* Changed `shortcuts` object in `ShortcutsStore` from

```javascript
const shortcuts = [{
key: String,
label: String,
link: String,
icon: <Icon>
suffix: <Icon>
}]
```

to

```javascript
const shortcuts = [{
id: Number,
key: String,
label: String,
link: String,
}]
```

* Added routes for `admin`, `team_lead`, and `hr`
* Changed route name `team_lead` to `tl`
* Updated Switching Roles Functionality

## v.0.3.4 - hotfix

* Fixed a bug on saving changes/edits of shortcuts due to `toUpperCase` method
* Fixed a bug causing draggable shortcuts still being draggable when editing shortcuts  

## v.0.4.0

* Added Onboarding Form
* Added route for `onboarding`
* Added react-form-stepper for stepper Component in Onboarding Form Component
* Removed Manual Sign In Components
* Updated Sign in Page to only display Google sign-in

## v.0.4.1

* Fixed a bug causing index conflicting issue with `stepper` Component and content of the form.
* Merged backend and frontend from `devchloe` branch
* Created backup from `devchloe` branch

## v.0.4.2

* Reverted merge
* Separated frontend and backend for deployment
* Added @jotai/optics latest `^0.3.1` for large and nested object manipulation
* Added @optics-ts latest `^2.4.1` for large and nested object manipulation
* Added `store` folder in each major component and each page for managing its various state
* Added functionality of onboarding form - storing data
  * Note: Only `Background` section not yet done in onboarding form Component

## v.0.4.3

* Removed @jotai/optics due to `ReferenceError` during runtime
* Removed @optics-ts due to `ReferenceError` during runtime
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

* Added @date-fns latest `^3.3.1` for datetime manipulation
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
* Added `lightgrey` and `darkgrey` variant for color `grey` in `tailwind.config.js`

## v.0.4.8

* Cleaned up and refactored source code
* Organized Project Structure
* Updated Paths for All Components
* Disabled for now backend functions due to build configuration error
* Updated @tailwindcss to latest `^3.4.1`
* Added Media Layout Component
* Reverted middleware

## v.0.4.9

* `frontend` and `backend` separated and started from scratch due to build error in deployment
* Still disabled for now backend functions due to build configuration error (commented backend functions)
* Created and Downloaded backups of repos for `bridge-official` and `bridge-frontend`
* Added @swiper latest `^11.0.5` for image carousel/gallery
* Updated Media Layout Component to view the rest of the images via modal window
* Synced `bridge-frontend` repo to latest changes
* Checked and Updated paths for Components
* Checked and Updated imports for Components
* Removed dead code and unused code
* Removed majority of `console.log()` left from development
* Added `TODO`s across the source code for logging tasks and reminders `prefix:// ### TODO...`
* Fixed a bug where post images did not properly fill their container regardless of their shape

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

* Updated Import Path for `SwitchRoles` Component
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
* Fixed a bug where image gallery did not display the correct selected image when viewing post
* Updated image background blur on posts
* Added Functionality to increment and decrement reaction count
* Added Functionality when reacted to the post already it will persist
* Added tooltip for reaction's count
* Added `height` to extend the `transitionProperty` tailwind property for animating when component height changes
* Updated animation for `Recognitions`, `Trainings`, and `HRBulletinBoard` Component when expanded and its height changes.
* Changed named export from `HighlightArea` to `RightBar`to match its filename
* Changed named export from `NewsFeed` to `MainContent` to match its filename
* Changed named export from `page` to `Onboarding` to match its filename
* Implemented database schema for `onboarding` form

## v.0.5.2 - hotfix

* Merged Changelog from prod repo `bridgev2` to `bridge-frontend`
* Removed `console.log()` on `PostFooter` Component
* Updated import path by changing `next/router` to `next/navigation` on `ReconnectButton` and `ReturnButton` Component

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

* Fixed a bug where fetching shortcut data from the backend failed to send a response
* Pulled backend resources from amplify
* Rewrite atom architecture for manipulating data coming from the backend in `ShortcutStore`
* Added backend functionality and resources for local development testing
* Updated the links for `Shortcuts` to be clickable and open a new tab
* Added `DEL` and `PUT` functions for deleting and editing shortcuts respectively (backend not yet implemented)
* Removed the role check on `NavigationBar` to fix the route issue
* Fixed a bug where `Badge` and `Sidebar` state from previous state still persists when switching roles
* Fixed a bug causing route issue when manually entering URL is does not reflect on the page
* Updated illustration for when onboarding form is submitted
* Added profile components for `Profile` page
* Added `"-100":"-1"` to extend the `scale` tailwind property for flipping images, svg and related media horizontally.
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
* Fixed a warning thrown when both `birthday` gif and `rexWinner` gif are being loaded on page load by setting the `priority` prop to true
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
* Fixed a build error on `OnboardingStatusAlert.jsx` due to unescaped apostrophes

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
* Fixed a bug causing content being clipped when scrolling in `MainContent` and `RightBar` component
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

* Adjusted alignment for `NavigationBar` Component
* Adjusted `ManagePostModal` window to be centered on the screen
* Adjusted right padding in `Rightbar` Component for easier scrolling
* Added notification function for notifications
* Updated schema for `posthandler`
* Added `notificationhandler` function
* Adjusted alignment for `ManagePostModal` Component
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

* Fixed a minor bug all templates are deleted when deleting custom template
* Fixed a bug causing media and template buttons not correctly displaying post template details when creating new posts
* Removed left over `console.log()` in `ManagePost` Components
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
* Updated media layout and orientation selection for `ManagePost` Component
* Added `recruitment` backend handler function
* Updated employee information in `AboutInfo` Component in `Profile` Page
* Added `recruitmentStatusAtom` in `UserStore` for fetching the recruitment status of an employee

## v.0.5.13

* Added `MediaLayoutPreview` Component to display selected images before posting and displaying in `ManagePostItemCard` Component
* Updated style for displaying media to only include `backdrop-brightness` in the last media visible to the user in `ManagePostItemCard` Component
* Added display count overlay on the last media visible to indicate the excess count of media that are not visible
* Added smooth transition when hovering `ManagePostItemCard` Component
* Renamed `MediaLayoutDisplay` to `MediaLayoutPreview` Component for consistency of naming related components
* Added functionality to display a placeholder when `mediaFileList` does not exist or is empty in `MediaLayoutPreview` Component
* Refactor logic for displaying `mediaFileList` in `ManagePostSidebar` and `ManagePostMainContent` Component
* Renamed `picture` to `profileURL` property for `draftPostListAtom`, `publishedPostListAtom`, and `archivedPostListAtom` in `ManagePostStore`
* Updated sorting of posts according to `datetimePublished`
* Adjusted center alignment for `ImageSwiper` Component
* Added `publishKey` prop to track`postAtom` when published so the correct post is manipulated in `PostStore`
* Updated logic for `AboutInfo` Component to check for falsy/ nullish profile data values
* Added `under-construction.png` as illustration for pages that are still being developed or not yet developed
* Added under construction message to `ClientsInfo` and `TeamInfo` Component in `profile` page
* Added `clear`, `grey`, `lightgrey`, and `darkgrey` variant color for `LabelTag` Component
* Added falsy/ nullish check to `AboutInfo` Component in `profile` page
* Removed `Profile Footer` Component due to no meaningful purpose
* Added regex validation for `shortcut` link to check if https:// is already on string when adding link to avoid invalid link in `ShortcutsHeader`

## v.0.5.14

* Updated backend functions for `posting`, `shortcuts`, and `profile` components
* Refactored backend functions in `store` of all components
* Added `fetch`, `add`, `delete`, and `update` as utility functions for state management in the `store` of all components
* Adjusted max width: `max-w-lg` for `RightBarCard` Component
* Removed leftover `### TODO` tags in `OnboardingStore`
* Removed leftover `console.log()` in `ShortcutItem` Component
* Updated `fetchOnboardingStatus` function in `UserStore`
* Removed leftover `console.log()` in `ManagePostItemCard` Component
* Removed leftover `console.log()` in `ManagePostMainContent` Component
* Removed leftover `console.log()` in `ManagePostSidebarContent` Component
* Added `fetch`, `add`, `delete`, and `update` utility functions for `PostStore`
* Added `profileDataAtom` in `ProfileStore`
* Added `OnboardingBody` Component
* Moved body contents from `OnboardingForm` to `OnboardingBody` Component for reusability of the components individually
* Added `UserOnboardingModal` Component for browsing `onboarding` details at `profile` Page
* Refactored logic for handling states in `store` of all components due to updating all `atom` state's object structure to ensure consistency between `backend` and `frontend`
* Removed `isSignedIn` property from `authenticationAtom` in `AuthenticationStore`
* Updated `authenticationAtom` in `AuthenticationStore` from

``` javascript
authenticationAtom=atom({
  isAuthenticated: Boolean,
  isSignedIn: Boolean,
  sub: String,
})
```

to

``` javascript
authenticationAtom=atom({
  isAuthenticated: Boolean,
  sub: String,
})
```

* Renamed `profileURL` to `picture` property from `userAtom` in `UserStore`
* Updated `userAtom` in `UserStore` from

```javascript
userAtom = atom({
  id: Number,
  name: String,
  picture: String, 
  email: String,
  role: String[],
  team: String,
  supervisor: String,
  position: String,
  clients: String[],
  leaves: {
    vl: Number,
    sl: Number,
  },
  benefits: [
    { name: String, isAvailable: Boolean, number: String },
    { name: String, isAvailable: Boolean, number: String },
    { name: String, isAvailable: Boolean, number: String },
    { name: String, isAvailable: Boolean, number: String },
  ],

  emergencyContact: {
    name: String,
    relationship: String,
    contactNumber: String,
  },
  onboarding: {
    startDate: String,
    status: String,
  },
})
```

to

```javascript
userAtom = atom({
  name: String,
  picture: String,
  email: String,
  role: String[],
  team: String,
    })
```

* Added object structure for `postsAtom` in `PostStore`

```javascript
postsAtom = atom({
  id: Number,
  key: String,
  publishKey: String,
  publisher: String,
  publisherPicture: String,
  dateTimePublished: Date,
  dateTimeScheduled: Date,
  title: String,
  caption: String,
  type: String,
  reactionList: String[],
  reacted: Boolean,
  reactions: {
    star: Number,
    love: Number,
    birthday: Number,
    happy: Number,
  },
  comments: Number,
  taggedPeople: [{name:String, picture:String}],
  media: String[],
  mediaLayout: String,
  orientation: String,
})
```

## v.0.6.0

* Added `viewOnly` prop to `UserOnboardingModal` Component for browsing of onboarding details in `profile` page
* Added `CMS` Components for `CMS` page
* Added `CMSStore` store for `CMS` Components
* Added `ClientItemList` Component
* Updated `LabelTag` Component to include `Badge` functionality
* Removed `LabelTag` Component
* Merged `LabelTag` and `ChipTag` Component due to similar functionalities and for convenience developing since it is a HOC
* Updated affected components due to the merging of `LabelTag` and `ChipTag`
* Renamed `ChipTag` to `LabelTagChip` to reflect its multi-type functionality
* Added badge count functionality for `LabelTagChip` Component to display numerical detail
* Added `label` type and `tag` type variation for `LabelTagChip` Component
* Added `dot` variant for `tag` type in `LabelTagChip` Component
* Added `search` type and `filter` type variation for `SearchBar` Component

## v.0.6.1

* Fixed a bug causing issue on `ReactButton` Component not updating reaction count and throws an error
* Added validation to `ReactButton` Component to check empty or null value for `reactionList` attribute
* Fixed a bug causing issue on `PostStore` still rendering default/ initial data for `postAtom` before updating to the fetched data from API call
* Removed default/initial data for `postAtom` from `PostStore`
* Fixed a bug causing issue on `PostHeader` Component not displaying the `user` picture from `user` data
* Renamed attribute from `picture` to `publisherPicture` to display `user` data on `PostHeader` Component
* Added `status` attribute for `posts` to optimize filtering `posts` by `status` when rendering to `frontend`
* Moved `postTemplateItemsAtom` from `PostTemplateStore` to `ManagePostStore` due to minimal usage of `PostTemplateStore`
* Removed `PostTemplateStore`
* Updated utility functions for `draftPostListAtom`, `publishedPostListAtom`, and `archivedPostListAtom` in `ManagePostStore`

## v.0.6.2

* Added middleware for route protection (stable)
* Updated `node_modules` to latest
* Updated @aws-amplify/adapter-nextjs from `^6.0.13` to `^6.0.16`
* Updated @aws-amplify from `^1.0.13` to `^1.0.16`
* Removed @jotai/optics
* Removed @optics-ts
* Implemented File Upload Functionality on `ManagePostSidebarContent` for uploading media
* Fixed a bug where reactions not rendering properly and not updating when reacting
* Updated maintenance image on `UnderConstruction` Component to have no watermarks
* Fixed a bug causing unintentional scrolling behavior for `MainContent` and `SideBar` Component
* Scrolling behavior for `MainContent` and `SideBar` Component now scrolls separately
* `MainContent` scrolling behavior now scrolls with the main scrollbar without affecting `RightBar` Component
* `RightBar` scrolling behavior now scrolls with its own hidden scrollbar
* Added `TODO` `docs` for a centralize listing of `TODO`s
* Moved `TODO`s to `TODO.md` for a centralize listing of `TODO`s
* Rewrite role selection in `SwitchRoles` Component
* Adjusted `OnboardingFieldInput` Component for employee ID to be on top
* Added back middleware for route protection

## v.0.6.3

* Changed named export from `ChipTag` to `LabelTagChip`to match its filename
* Moved `recruitmentStatusAtom` from `UserStore` move to `ProfileStore`
* Updated `active` state of navigation when clicking a route in `NavSideBarStore`
* Added @shadcn/ui latest `^0.8.0`

* Added dependencies for @shadcn/ui:
  * @radix-ui/react-popover latest `^1.0.7`
  * @radix-ui/react-slot latest `^1.0.2`
  * @class-variance-authority latest `^0.7.0`
  * @clsx latest `^2.1.0`
  * @lucide-react latest `^0.336.0`
  * @react-day-picker latest `^8.10.0`
  * @tailwind-merge latest `^2.2.1`
  * @tailwindcss-animate latest `^1.0.7`

* Configured @shadcn/ui to work with the project
* Merged changes from @shadcn/ui to `tailwind.config.js` and `globals.css` in order to properly work with existing tailwind configuration
* @shadcn/ui configuration added `components` folder for storing components from this library
* Added `DatePicker` Component
* Added `DraftedStore` for better management of drafted posts
* Added `PublishedStore` for better management of published posts
* Added `ArchivedStore` for better management of archived posts
* Fix `post` not able to `delete` issue for `posting`
* Update `delete` post function handler for `posting`
* Fix `post` index issue due to not updated `schema` for posting
* Fix sorting post issue due to not updated `schema` for posting
* Cleaned up unused `imports` and `hooks` on `PostStore`
* Moved `add`, `publish`, `delete` functionality of `drafts`, `publish`, and `archive` from `ManagePostMainContent` to their respective store `DraftedStore`, `PublishedStore`
* Fixed a bug causing `reaction` count not displaying properly on `PostFooter` Component of posts in the feed
* Removed `add`, `delete` ,`update`, `insert` backend function handler for posts in `PostStore` since the same functionality is implemented in `DraftedStore`, `PublishedStore`
* Added a tooltip for the date on `PostHeader` Component for the exact date the post is published
* Fixed a bug causing `archive` key index issue when deleting `archived` posts

## v.0.6.4

* Removed left-over `console.log()` from development
* Cleaned up unused `imports` and `hooks` on `ManagePostMainContent` Component
* Fixed a bug where Unauthenticated API Call is executed on initial page load
* Removed `isSubmittedOnboardingFormAtom` due to Unauthenticated API Call on initial page load
* Added validation for `auth` atom in `fetchHasOnboardingDataAtom` on `OnboardingStore`
* Updated handling for setting `date` value object of `onboarding` form in `Onboarding` Page
* Merge `fetchAuthentication` atom and
`authenticationAtom` atom in `AuthenticationStore`
* Fixed a bug causing issue in `MediaLayoutSelect` and `MediaOrientationSelect` Component when selecting `single` as the media layout of a post, the media orientation is not passed to the backend so it values to an empty string
* Fixed a bug where the `post` index issue by changing the `PostCard` Component prop key to use the post's `_id` instead of post's `key`
* Rewrite logic for when changing post's `status` from `drafts` to `published` by only using the `post._id` as the filter to select the correct post to be changed in `DraftedStore` and `PublishedStore`
* Fixed a bug where posts not being updated in real time when `added`, `deleted`, `published`, and `archived`
* Included `fetchDraftPost`, `fetchPublishPost`, and `fetchArchivePost` when fetching post data for `drafts`, `published`, and `archived` then rendering the data to the component
* Fixed a bug causing issue on `reactions` on `post` not being updated properly

* Merged Changes from Interns:
  * Add `zoom` functionality on `ImageSwiper` Component
  * Add `keyboard` controls when sliding images on `ImageSwiper` Component
  * Add functionality for changing all `notification` to `read` status on `NotificationsList` Component
  * Add functionality for pressing the `notification` to change it to `read` status on `NotificationsList` Component
* Add functionality for hiding a `notification` via `button` on `NotificationsList` Component
* Add functionality for marking a `notification` read via `button` on `NotificationsList` Component

* Added the `layout` prop to each media layout component to correctly display the media on post feed(`OneMedia` - `SixPlusMedia`)
* Refactor posts to use `status` prop as filter for displaying `drafts`, `published`, and `archived` posts and use `sub` prop as filter for user's own posts

## v.0.6.5

* Updated Changelog
* Cleaned up unused `imports` and `hooks` on `user` Page
* Benchmarked project with Lighthouse from browser developer tools
* Updated `fallback` picture for displaying immediate head in `profile` page
* Fixed a bug where the UI of `ProfileCard` Component for displaying profile details in `profile` page is not consistent
* Added @sharp latest `^0.33.2` for image optimization in production
* Images are now optimized to improve performance and reduce latency when loading pages
* Configured `Nextjs` to optimize images from `Google` such as profile photos of users
* Fixed a bug where content for `Tabs` Component are not `children` hence causing rendering issues
* Changed image used `"@nextui-org/react"` from `next/image`
* Cleaned database queries used for fetching content on `profile` page
* Adjusted alignment for `UnderConstruction` Component
* Added additional content for `UnderConstruction` Component
* Removed left-over `console.log()` from development
* Adjusted alignment for `OnboardingBody` Component
* Refactor functionality of shortcuts for optimization when initial page load and navigating pages
* Refactor fetching data in Profile Page for optimization when initial page load
* Added @types/react latest `^18.2.61` for dismissing a warning when importing `react`
* Fixed a bug that triggers `Detected multiple Jotai instances. It may cause unexpected behavior with the default store.` when using an atom inside the `Provider` function from `jotai`
* Moved `RegisterProfile` function from `profile.js` to `UserStore` and refactored to `registerProfile` atom then implemented to run once on `user` page
* Removed `profile.js` file from `utils` folder in favor of moving `RegisterProfile` function to `UserStore`
* Renamed `recruitmentStatusAtom` to `profileAtom` in `ProfileStore`
* Moved `leaveStatusAtom` from `UserStore` move to `ProfileStore`
* Moved `benefitsStatusAtom` from `UserStore` move to `ProfileStore`
* Moved `onboardingDataAtom` from `UserStore` move to `ProfileStore`
* Moved `teamStatusAtom` from `UserStore` move to `ProfileStore`
* Moved list of `Postcard` for posts to its own component for `Suspense` functionality
* Updated `Link` to have descriptive text on `OnboardingStatusAlert` Component
* Added `aria-label` on `Button` of `RightBarCard` Component
* Added `aria-label` on `Button` of `NotificationsDropdown` Component
* Added `aria-label` on `Button` of `ShortcutsHeader` Component
* Added `aria-label` on `Button` of `ShortcutsOptions` Component
* Added `aria-label` on `Button` of `ExternalLinks` Component
* Adjusted header alignment of the content on `SideBar` Component to improve accessibility
* Adjusted placement of `UserDropdown`, `RoleBadge`, and `NotificationsDropdown` on `NavigationBar` Component to improve accessibility
* Adjusted alignment and background for content in `onboarding` page
* Adjusted alignment and gap of input fields in `OnboardingBody` Component
* Added link headers to  preconnect to required origins to establish early connections to important third-party origins e.g. Google or AWS in `middleware`
* Removed unused CSS in `globals.css` to reduce CSS file size
