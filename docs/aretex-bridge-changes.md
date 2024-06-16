# Aretex Bridge Changes

## Phase 1 - Implementation of Initial Prototype

## v.0.1.0

* Initial Commit

## v.0.2.0

* Added @next latest `^14.0.4` as its framework
* Added @tailwindcss latest `^3.3.0`
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
* Configured `backend` resources for Bridge
* Configured redirect URLs for sign-in and sign-out

## v.0.3.0.1 - hotfix

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

## v.0.3.3.1 - hotfix

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

## v.0.3.4.1 - hotfix

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
* Merged `backend` and `frontend` from `devchloe` branch
* Created backup from `devchloe` branch

## v.0.4.2

* Reverted merge
* Separated `frontend` and `backend` for deployment
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

* Centralized `frontend` and `backend` repo to the `bridge-official` repo
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
* Added protection for routes via `middleware`
* Added transition between navigating pages
* Added not-found page
* Added error page
* Added custom tailwind utility class `spinner` for page transition
* Added `lightgrey` and `darkgrey` variant for color `grey` in `tailwind.config.js`

## v.0.4.8

* Cleaned up and refactored source code
* Organized Project Structure
* Updated Paths for All Components
* Disabled for now `backend` functions due to build configuration error
* Updated @tailwindcss to latest `^3.4.1`
* Added Media Layout Component
* Reverted `middleware` changes

## v.0.4.9

* `frontend` and `backend` separated and started from scratch due to build error in deployment
* Still disabled for now `backend` functions due to build configuration error (commented `backend` functions)
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

## v.0.5.0.1 - hotfix

* Added `middleware` for route protection
* Added missing libs in `package.json`

## v.0.5.0.2 - hotfix

* Updated Import Path for `SwitchRoles` Component
* Added `Amplify.configure` to user page

## v.0.5.0.3 - hotfix

* Reverted adding `middleware` file
* Reverted adding `routes` for `tl`, `admin`, and `hr`

## v.0.5.0.4 - hotfix

* Reverted remaining routes other than `user`

## v.0.5.0.5 - hotfix

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

## v.0.5.2.1 - hotfix

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
* Added `onboarding-done-submitted.jpg` illustration when onboarding form is completed and submitted and then redirects to login page
* Added `isRequired` check for the required fields in the onboarding form

## v.0.5.5

* Fixed a bug where fetching shortcut data from the `backend` failed to send a response
* Pulled `backend` resources from amplify
* Rewrite atom architecture for manipulating data coming from the `backend` in `ShortcutStore`
* Added `backend` functionality and resources for local development testing
* Updated the links for `Shortcuts` to be clickable and open a new tab
* Added `DEL` and `PUT` functions for deleting and editing shortcuts respectively (`backend` not yet implemented)
* Removed the role check on `NavigationBar` to fix the route issue
* Fixed a bug where `Badge` and `Sidebar` state from previous state still persists when switching roles
* Fixed a bug causing route issue when manually entering URL is does not reflect on the page
* Updated illustration `onboarding-done-submitted.jpg` for when onboarding form is submitted
* Added profile components for `Profile` page
* Added `"-100":"-1"` to extend the `scale` tailwind property for flipping images, svg and related media horizontally.
* Added a simple check to shortcuts link string if it includes `https://` or `http://`, includes it otherwise
* Updated shortcuts link to a valid link to redirect properly

## v.0.5.6

* Added `backend` and frontend functionality for `Profile`
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
* Added `error.jpg` illustration for `Error` Page
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
* Pulled `backend` resources from amplify

## v.0.5.8

* Moved all rest api functions in `amplify-rest.js` in `/app/utils/` to be reusable across all components
* Added `backend` functions for editing and deleting shortcut
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

* Fixed a minor bug all templates are deleted when deleting custom template in `ManagePost` Components
* Fixed a bug causing media and template buttons not correctly displaying post template details when creating new posts in `ManagePost` Components
* Removed left over `console.log()` in `ManagePost` Components
* Added `grey` variant color for `CTAButtons` Component
* Added `backend` handler function for route `/account`
* Added `backend` handler function for route `/benefits`
* Added `backend` handler function for route `/leave`
* Updated `post` `backend` handler function
* Updated `profile` `backend` handler function
* Updated `shortcut` `backend` handler function
* Updated `user` `backend` handler function
* Deleted `S3Trigger2a62b9a1` `backend` handler function
* Deleted `S3Triggere0041d22` `backend` handler function
* Added `leave` balance validation
* Added `POST` and `PUT` backend handler function for `benefits`
* Updated input fields for onboarding form to be required fields, for not applicable or optional fields `N/A` is needed as an input
* Added input field for `Employee ID` in `ApplicationOnboarding`
* Added input field for `Other Courses` and `Date of Attendance` for each education level in `BackgroundOnboarding`
* Removed `HighSchool` input field in `BackgroundOnboarding` Component
* Updated `draftPostListAtom` to include `orientation` as property
* Updated `publishedPostListAtom` to include `orientation` as property
* Updated `archivedPostListAtom` to include `orientation` as property
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

* Updated `benefits` `backend` handler function to be flexible
* Added default value for `benefits` `backend` handler function
* Renamed `MediaLayout` to `MediaLayoutPost` Component for consistency of naming related components
* Added `MediaLayoutDisplay` Component for previewing the media layout on `ManagePostSidebarContent` Component
* Added `MediaLayoutSelect` Component
* Added `MediaOrientationSelect` Component
* Updated media layout and orientation selection for `ManagePost` Component
* Added `recruitment` `backend` handler function
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

* Updated `backend` functions for `posting`, `shortcuts`, and `profile` components
* Refactored `backend` functions in `store` of all components
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
* Added `CMSStore` store for `CMS` Components in user page
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

* Added `middleware` for route protection (stable)
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
* Added back `middleware` for route protection

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
* Removed `add`, `delete` ,`update`, `insert` `backend` function handler for posts in `PostStore` since the same functionality is implemented in `DraftedStore`, `PublishedStore`
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
* Fixed a bug causing issue in `MediaLayoutSelect` and `MediaOrientationSelect` Component when selecting `single` as the media layout of a post, the media orientation is not passed to the `backend` so it values to an empty string
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
* Changed image used `@nextui-org/react` from `next/image`
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

## v.0.6.6

* Updated `reaction` functionality on `posts`
* Added additional `reaction` to `posts`, when hovering the `reaction` button it is the same functionality as in Facebook's reactions

* Added components for `CMS` page in `User` Side:
  * Added `ClientDetails` Component
  * Added `ClientInfo` Component
  * Added `ClientItemCard` Component
  * Added `ClientList` Component
  * Added `Clients` Component
  * Added `CMSFooter` Component
  * Added `CMSHeader` Component
  * Added `ColumnContainer` Component
  * Added `TaskBoardCard` Component
  * Added `TaskBoardView` Component
  * Added `TaskTableView` Component

* Added `label` attribute on atom for `ClientItemCard` Component
* Updated `layout.jsx` to contain content within the viewport of the user by setting the `height` to match the screen of the user
* Removed unused css in tailwind.config.js
* Fixed user registration upon initial load of the page
* Renamed `CloseButton` to `IconButton` Component to cover all icon only buttons use cases
* Updated `IconButton` to accept any icon as its `children`
* Updated `IconButton` Component to accept `className` as its prop to override its base style
* Updated lighter colors `["clear", "grey", "lightgrey"]` to have dark text color for readability in `LabelTagChip` Component
* Renamed `fetchedShortcutAtom` to `fetchShortcutAtom` for consistency in naming setter atoms
* Moved client-related atoms to its own store from `CMSStore` to be globally accessible
* Added `ClientStore` to global store
* Moved task-related atoms to its own store from `CMSStore` to be globally accessible
* Added `TaskStore` to global store
* Added `white` variant color for `CTAButtons` Component
* Updated `CTAButtons` Component to include `size` as prop
* Added `disallowEmptySelection` prop in `SearchBar` Component for its base component and functionality
* Added New API Endpoint URL `/profile/self_data` to provide the complete onboarding data
* Renamed `profile` API Endpoint URL from `/profile` to `/profile/self_data` in `ProfileStore`
* Removed the text color `text-black-default/80` of the badge counter from its base component in `LabelTagChip` Component
* Added `browseOnboardingDataAtom` to handle fetching onboarding data for viewing/ browsing in `UserOnboardingModal` Component
* Rearrange the order of task `status` column in `TaskStore` sorted by the status's urgency
* Added `id` attribute to the converted task object in `TaskStore`
* Added `columnId` attribute to the converted task object in `TaskStore` to corrected filter the tasks to their respective columns
* Fixed a bug where nullish values are not handled correctly in `UserOnboardingContent` Component
* Updated `UserOnboardingModal` Component to use `browseOnboardingDataAtom` instead for fetch onboarding data
* Added `no-data.png` as illustration when no data is available to display
* Updated `PostSchema`'s `reacted` attribute for handling reactions on posts
* Added `search` functionality for list of clients and its respective tasks in `CMSHeader` Component
* Added `filter` functionality for list of clients and its respective tasks in `CMSHeader` Component
* Added `sort` functionality for list of clients and its respective tasks in `CMSHeader` Component
* Removed `startDate` and `endDate` attribute from the converted task object in `TaskStore`
* Removed fetching user data function in `user` page to reduce redundancy
* Cleaned up unused `imports` and `hooks` on `ClientDetails` Component
* Cleaned up unused `imports` and `hooks` on `ClientInfo` Component
* Cleaned up unused `imports` and `hooks` on `ClientItemCard` Component
* Cleaned up unused `imports` and `hooks` on `ClientList` Component
* Cleaned up unused `imports` and `hooks` on `Clients` Component
* Cleaned up unused `imports` and `hooks` on `CMSFooter` Component
* Cleaned up unused `imports` and `hooks` on `CMSHeader` Component
* Cleaned up unused `imports` and `hooks` on `ColumnContainer` Component
* Cleaned up unused `imports` and `hooks` on `TaskBoardCard` Component
* Cleaned up unused `imports` and `hooks` on `TaskBoardView` Component
* Cleaned up unused `imports` and `hooks` on `TaskTableView` Component
* Renamed Component `Clients` to `CMSUser` to distinguish from `admin` and `tl` side of CMS
* Renamed Store `CMSStore` to `CMSUserStore` to distinguish from `admin` and `tl` side of CMS

* Added components for `CMS` page in `Admin` Side:
  * Added `ClientDetails` Component
  * Added `ClientInfo` Component
  * Added `ClientItemCard` Component
  * Added `ClientList` Component
  * Added `CMSAdmin` Component
  * Added `CMSFooter` Component
  * Added `CMSHeader` Component
  * Added `ColumnContainer` Component
  * Added `TaskBoardCard` Component
  * Added `TaskBoardView` Component
  * Added `TaskTableView` Component

* Added components for Client Onboarding Form in `Admin` Side:
  * Added `AddClientModal` Component
  * Added `AddTaskModal` Component

* Added `CMSAdminStore` for `CMS` admin Page
* Updated admin `home` page style to be the same as user `home` page style

* Added `FormField` Components for `Form` Components
  * Renamed Component `OnboardingFieldInput` to `FormFieldInput`
  * Added `FormFieldRadio` Component
  * Added `FormFieldTextArea` Component

* Added `store-placeholder.png` as illustration when no data is available to display
* Added `isReadOnly` prop in `FormFieldInput` Component for its base component and functionality

* Added components for `CMS` page in `TL` Side:
  * Added `ClientDetails` Component
  * Added `ClientInfo` Component
  * Added `ClientItemCard` Component
  * Added `ClientList` Component
  * Added `CMSTL` Component
  * Added `CMSFooter` Component
  * Added `CMSHeader` Component
  * Added `ColumnContainer` Component
  * Added `TaskBoardCard` Component
  * Added `TaskBoardView` Component
  * Added `TaskTableView` Component

* Added `CMSTLStore` for `CMS` tl Page
* Updated tl `home` page style to be the same as user `home` page style

* Added components for SLA Form in `Admin` Side:
  * Added `TaskFormSections` Component

* Removed left-over `console.log()` from development
* Merged and Approved PR of interns to Bridge main source code
  * Merged Notifications changes
  * Merged Shortcuts changes
  * Merged Post Reactions changes
  * Merged Reporting Post changes

## v.0.6.7

* Migrated `TODO.md` to Google Spreadsheet
* Removed `TODO.md` due to migration
* Updated `CTAButtons` Component to include `aria-label` as prop
* Updated `CTAButtons` Component to include `startContent` as prop
* Updated `CTAButtons` Component to include `endContent` as prop
* Added `/cms/task/sla` path for `/cms/task/*` `GET` endpoint to fetch tasks assigned to the user
* Added `/cms/task/processor` path for `/cms/task/*` `GET` endpoint
* Updated `PUT` endpoint for `/cms/task*` for updating a task's `processor` and `reviewer` and the task itself
* Added `/cms/task/update-processor` path for `/cms/task/*` `PUT` endpoint
* Added `/cms/task/remove-processor` path for `/cms/task/*` `PUT` endpoint
* Added `/cms/task/update-reviewer` path for `/cms/task/*` `PUT` endpoint
* Added `/cms/task/remove-reviewer` path for `/cms/task/*` `PUT` endpoint
* Updated `PUT` endpoint for `/cms/task` for updating all of a task's details
* Updated `PUT` endpoint for `/cms/task/*` to only include `reviewer` and `processor` as the query
* Renamed Component `Clients` to `CMSTL`
* Renamed Component `Clients` to `CMSUser`
* Added `100` to extend the `zIndex` tailwind property for adjusting stacking of elements
* Renamed atom `selectedClient` to `selectedClientToEdit` to avoid confusion and to better distinguish its purpose in `ClientStore` Store
* Added utility functions for tasks in `TasksStore` Store
* Added utility functions for clients in `ClientStore` Store
* Removed dummy data from atoms in `TasksStore` and `ClientStore` in preparation of API integration
* Added `popover` component to `FormFieldInput` as `endContent` Component to handle selecting date inside the component
* Updated `FormFieldInput` Component to include `isDateModal`as prop
* Fixed a bug where `popover` component from @shadcn/ui to stack higher than the `modal` window from `@nextui-org/react`
* Added `DatePicker` Component to wrap the `modal` window from `@nextui-org/react` and `popover` component from @shadcn/ui in order to render correctly the `popover` component on top of the `modal` window
* Added `DatePicker` component to `FormFieldInput` as `endContent` Component to handle selecting date inside the component
* Updated `DatePicker` Component to inherit its parent's prop
* Changed datatype of `id` attribute in tasks from `String` to `Number`
* Added `index` attribute to `taskSchema` for handling dragging tasks in `TaskBoardView` Component
* Moved `recurrence` attribute from main object to the inside of each `sla`'s duration attribute
* Implemented `backend` integration to CMS Components across roles(Admin, TL, User)
* Added error handling to utility functions for tasks in `TasksStore` Store
* Added error handling to utility functions for clients in `ClientStore` Store
* Added `showSearchBar` atom to `CMSAdminStore` Store
* Updated `SearchBar` Component to include `showSearchBar` prop to handle `hidden` state of the component via `data-attributes`
* Adjusted font style and size for `FormFieldInput` Component
* Adjusted font style and size for `FormFieldTextArea` Component
* Fixed a bug where `TaskBoardView` Component does not update its data automatically
* Added empty message for `ClientList` Component when list of clients is empty or does not exist
* Added `Spinner` Component as fallback to the `Avatar` Component inside `ClientItemCard` Component
* Adjusted alignment of `LabelTagChip` Component for `ClientItemCard` Component
* Updated CMS Components to use the `client_id` attribute as their unique identifier instead of using the `key` attribute
* Added `unread` attribute to `notificationSchema`
* Added `hidden` attribute to `notificationSchema`
* Added `GET` endpoint for `/notification/` and `/notification/*`
* Added `POST`endpoint for `/notification/` and `/notification/*`
* Added `PUT` endpoint for `/notification/` and `/notification/*`
* Added `DEL` endpoint for `/notification/` and `/notification/*`
* Updated `req.body` to `req.query` in `DEL` endpoint for `/cms/client` to correctly `delete` the selected client
* Updated `req.body` to `req.query` in `DEL` endpoint for `/cms/task` to correctly `delete` the selected task
* Updated `calendar` Component to disable past days in the date picker
* Updated `taskDataAtom` schema to match its new changes in `TaskStore` Store
* Adjusted width for `FormFieldTextArea` Component
* Updated `assigneesList` to `processorList` to match its name in its schema in `TaskTableView` Component
* Updated `select` Components for `TaskFormSections` Component to disallow empty selection
* Adjusted width for `TaskFormSections` Component
* Updated `key` used in `select` Components for `TaskFormSections` Component to instead use `sub` attribute as the `key` of each item in the selection
* Adjusted vertical alignment of `select` Components for `TaskFormSections` Component
* Adjusted font style and size, height, and min-height for `TaskBoardCard` Component
* Fixed a bug where `task` `status` `count` does not update automatically on the list of clients when task is created or updated in `ClientItemCard` Component
* Removed `ClientInfoCard` Component due to redundancy
* Fixed a bug when adding task the `filter` function returns `undefined` as a result disrupts the rendering of `data` on components
* Updated `LabelTagChip` Component to include a default value of its `color` prop
* Added sorting functionality for `TaskTableView` Component
* Updated `key` used in `TableRow` Component for `TaskTableView` Component to instead use `_id` attribute as the `key` of each `TableRow` item
* Updated manager `select` Component for `TaskFormSection` Component to disallow empty selection
* Renamed prop `sortedItemTasks` to `itemTasks` for `TaskBoardView` Component
* Fixed a bug when updating the `status` of `task` via dragging the task card to another column or over a task it maxes out on re-renders and triggering max `recursion` depth on the `setState` function
* Moved the updating code block from `onDragOver` function to `onDragEnd` function to only update the status of the task card when it is done dragging to avoid triggering max `recursion` depth on the `setState` function
* Renamed handler function `handleAddTask` to `handleOpenTaskWindow` in `CMSHeader` Component
* Renamed handler function `handleAddClient` to `handleOpenClientWindow` in `CMSHeader` Component
* Renamed attribute `key` to `clientKey` in `CMSAdmin` Component
* Renamed prop `sortedItemTasks` to `itemTasks` in `CMSAdmin` Component
* Updated prop `values` for renamed `props` in `CMSAdmin` Component
* Moved sorting functionality from `CMSAdmin` Component to `TaskTableView` Component
* Fixed a bug where the total item `count` on the `footer` displays the number of `clients` instead of number of `tasks` based from the selected `client`
* Removed `sortedItemTasks` prop in `ClientList` Component
* Fixed a bug where filtering for the task `status` count because it runs earlier than the the `fetch` function so it receives `undefined` thus when rendering the `data` in the `component` it triggers a crash
* Updated `CTAButtons` to include `showButton` as prop
* Updated `CTAButtons` Component to include `showButton` prop to handle `hidden` state of the component via `data-attributes`
* Updated task name in `TaskTableView` Component to be a `Link` Component
* Updated Client Selection Component in `TaskFormSections` to be hidden when adding `task` while selected a `client` already
* Adjusted width for `CTAButtons` in `ClientHeader` Component to fill all the available space
* Wrapped the `filter` function with `useMemo` to increase `performance` when `tasks` are filtered
* Updated action buttons in `CMSHeader` Component to be `hidden` when viewing client details
* Added error handling for fetching the task `status` `count`
* Added initial value for `selectedRecurrenceAtom` in `TaskStore` Store
* Removed `statusCountAtom` in `TaskStore` Store
* Updated `clientSelectionChangeAtom` to include `selectedClient` when changing selection during adding task in `TaskStore` Store
* Added `constraints` when dragging task cards to minimize its `impact` when updating `status` of `task` in in `TableBoardView` Component
* Adjusted width for `TableBoardView` Component
* Adjusted height for `TaskBoardCard` Component
* Adjusted width for `ColumnContainer` Component
* Removed `checkbox` component from `ClientHeader` Component
* Removed `selectedAllClients` prop from `CMSAdmin` Component
* Removed `setSelectedAllClients` prop from `CMSAdmin` Component
* Removed `showCheckBox` prop from `CMSAdmin` Component
* Removed `showOptions` prop from `CMSAdmin` Component
* Added `Suspense` to display for `ClientItemCard` Component in `ClientList` Component when client and task data is still loading
* Fixed a bug where `fetch` task status `count` still receives `undefined` despite being called inside `useEffect`
* Updated `LabelTagChip` Component in `ClientItemCard` Component to display status label for `forReview` to `For Review`
* Added error handling for `ClientItemCard` Component to handle `LabelTagChip` Component receiving `undefined` as value
* Added `onPress` functionality for clicking `client` name on `ClientItemCard` Component to view the client's details

* Added dependencies for @shadcn/ui:
  * @next-themes latest `^0.3.0`
  * @sonner latest `^1.4.41`

* Configured `sonner/toaster` Component to be able to `display` throughout the `project` and be able to be called from any `component`
* Added real `team` data for `clientFilterKeysAtom`
* Updated `SearchBar` Component to include `disabledSearch` prop to handle `hidden` state of the component via `data-attributes`
* Updated `SearchBar` Component to include `disabledFilter` prop to handle `hidden` state of the component via `data-attributes`
* Adjusted border radius for `SearchBar` Component
* Adjusted border radius for `CTAButtons` Component
* Adjusted border radius for `ColumnContainer` Component
* Adjusted border radius if action buttons for `ClientHeader` Component
* Added sorting functionality when rendering `LabelTagChip` Component in `ClientItemCard` Component
* Updated `sonner/toaster` Component to render more vibrant colors
* Added `promise` toaster when adding `task` and waits for the `task` to be successful and displays the corresponding `message`
* Fixed a bug when filtering/ searching in `searchBar` dragging `task` cards deletes all `task` that does not satisfy the `condition`
* Removed data-attribute for showing and hiding `IconButton` Component due to redundancy
* Added dropdown selection for each task in `TaskTableView` Component
* Fixed a bug where updating `task` status does not `render` properly its outline where to drop off when dragging in `TaskBoardView` Component
* Added dropdown selection for each task in `TaskBoardCard` Component
* Adjusted margin for `ColumnContainer` Component
* Converted `file` extension from `.png` to `.webp` of the illustration for `No-Shortcuts.webp`
* Refactored CMS Components to have `shared` components and `individual` components
* Removed `ToastNotifications` Component
* Removed `NotificationToaster` Component
* Moved `ClientDetails` Component to `components` folder
* Moved `ClientInfo` Component to `components` folder
* Moved `ClientItemCard` Component to `components` folder
* Moved `ClientList` Component to `components` folder
* Moved `ColumnContainer` Component to `components` folder
* Moved `TaskBoardCard` Component to `components` folder
* Moved `TaskBoardView` Component to `components` folder
* Moved `TaskTableView` Component to `components` folder
* Renamed Component `CMSHeader` to `CMSAdminHeader`
* Renamed Component `CMSFooter` to `CMSAdminFooter`
* Renamed Component `CMSHeader` to `CMSTLHeader`
* Renamed Component `CMSFooter` to `CMSTLFooter`
* Renamed Component `CMSHeader` to `CMSUserHeader`
* Renamed Component `CMSFooter` to `CMSUserFooter`
* Added `aria-label` on `Button` of `ShortcutsHeader` Component
* Added `aria-label` on `Button` of `SearchBar` Component
* Cleaned up and refactored source code
* Organized Project Structure
* Removed unused imports and dead code
* Removed left-over `console.log()` from development
* Fix a bug where incorrectly redirecting the user after sign-in and despite already authenticated in `middleware`
* Added automatic fetching of `task` and `client` data with an `interval` of `2.5secs` on `CMSAdmin` Component
* Added automatic fetching of `task` and `client` data with an `interval` of `2.5secs` on `CMSTL` Component
* Added automatic fetching of `task` and `client` data with an `interval` of `2.5secs` on `CMSUser` Component

## v.0.6.8

* Adjusted color opacity for `LabelTagChip` Component
* Adjusted font color for `RightBarCard` Component
* Refactored `NavbarItem` Component for `NavigationBar` Component
* Removed `unoptimized` prop on `NextImage` for `BirthdayCard` Component
* Updated Components with `Image` from `@nextui-org/react` into `NextImage` from `next/image` due to performance issues
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `FiveMedia` Component
* Adjusted alignment and position for responsiveness on `FiveMedia` Component
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `FourMedia` Component
* Adjusted alignment and position for responsiveness on `FourMedia` Component
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `OneMedia` Component
* Adjusted alignment and position for responsiveness on `OneMedia` Component
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `SixPlusMedia` Component
* Adjusted alignment and position for responsiveness on `SixPlusMedia` Component
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `ThreeMedia` Component
* Adjusted alignment and position for responsiveness on `ThreeMedia` Component
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` for `TwoMedia` Component
* Adjusted alignment and position for responsiveness on `TwoMedia` Component
* Added `aria-label` on Button of `PostOptions` Component
* Added `id` prop on `ListBoxItem` Component on `PostOptions` Component
* Removed `unoptimized` prop on `NextImage` for `RexWinnerCard` Component
* Updated image format used on `ProfileHeader` Component from `jpeg` to `webp`
* Updated priority prop on `NextImage` for `ProfileHeader` Component
* Added `header-profile.webp` as illustration for profile header photo on `Profile` page
* Updated headers in `middleware` to `dns-prefetch` instead of `preconnect`
* Added s3 bucket URL link in `next.config.js` file for image optimization. This is to protect the application from malicious users, configuration is required in order to use external images. This ensures that only external images from the links provided in the `config` file can be served from the Next.js Image Optimization API.
* Removed `await` from reading value of `authenticationAtom` in `OnboardingStore` Store
* Adjusted font color for `SearchBar` Component
* Removed `loading` prop on `NextImage` for `ExternalLinksHeader` Component
* Updated image format used on `TaskTableView` Component from `jpeg` to `webp`
* Added `no-data.webp` as illustration for rendering empty state when there is no `task` available
* Configured `postcss.config.js` to use `cssnano` to purge unused css when creating in production build
* Removed light extend on custom theme on `tailwind.config.js`
* Added `aria-label` on `Pagination` of `CMSAdminFooter` Component
* Adjusted width and alignment for `ClientItemCard` Component
* Updated `OnboardingStatusAlert`Component to use `<p>` tag instead of `<span>`
* Added `aria-label` on `ListBox` of `NotificationsList` Component
* Updated import path for `SidebarHeader` due to updated image format
* Added `aria-label` on `Pagination` of `CMSTLFooter` Component
* Added `aria-label` on `Pagination` of `CMSUserFooter` Component
* Added `header.webp` as illustration for navigation logo photo on all pages
* Updated @tailwindcss to latest `^3.4.3`
* Updated @autoprefixer to latest `^10.4.19`
* Updated @postcss to latest `^8.4.38`
* Adjusted `darkgrey` color for `default` from `"#7d7d85"` to `"#6B6B72"`in `tailwind.config.js`
* Adjusted `darkgrey` color for `hover` from `"#55555A"` to `"#565656"`in `tailwind.config.js`
* Adjusted `green` color for `default` from `"#01C875"` to `"#005D38"`in `tailwind.config.js`
* Adjusted `green` color for `hover` from `"#0A7147"` to `"#006736"`in `tailwind.config.js`
* Added new `tailwindcss` utility function for `text-stroke` in order to improve readability of white text in front of yellow background in `tailwind.config.js`

## v.0.6.8.1 - hotfix

* Reverted configuration on `postcss.config.js`

## v.0.6.9

* Disabled rendering `reaction` count on drafts in `ManagePostItemCard` Component
* Adjusted alignment, padding, border radius, width, and height for `ManagePostMainContent` Component
* Adjusted alignment, margin, padding, border radius, width, and height for `ManagePostModal` Component
* Adjusted alignment, margin, padding, border radius, width, and height for `ManagePostSidebar` Component
* Adjusted margin for `ManagePostSidebarContent` Component
* Added `ref` for handling file input media to remove any selected media file when `fileListAtom` is empty in `ManagePostSidebarContent` Component
* Adjusted width for `TagPersonSelect` Component
* Adjusted width for `MediaLayoutSelect` Component
* Adjusted width for `MediaOrientationSelect` Component
* Adjusted width for `ReactionSelect` Component

## v.0.6.10

* Added @socket.io-client latest `^4.7.5` for handling notifications in real time
* Configured test `web-socket` on a separate page
* Configured amplify `backend` to handle `web-socket` connections
* Adjusted margin for `CMSAdmin` Component
* Renamed variable state from `isDisabled` to `isLoading` in `ClientAdminHeader` Component
* Renamed variable state from `setIsDisabled` to `setIsLoading` in `ClientAdminHeader` Component
* Removed `tailwind` css animation on the icon of the button in favor of the built-in loading animation of `Button` from `@nextui-org/react`
* Added new `tailwindcss` utility function for `text-shadow` in order to improve readability of white text in front of yellow background in `tailwind.config.js`
* Added `text-shadow` to components that have yellow background in all Components due to readability issues
* Added `text-shadow` to components that have yellow background in `ColumnContainer` Component
* Added `text-shadow` to components that have yellow background in `LabelTagChip` Component
* Adjusted text-truncate and width for `SearchBar` Component
* Added handling for when the `index` of the task `status` is `undefined` in `TaskBoardView` Component
* Removed redundant checking of task `status` before passing it as a prop to `LabelTagChip` Component in `TaskTableView` Component
* Adjusted margin for `CMSTL` Component
* Renamed variable state from `isDisabled` to `isLoading` in `CMSTLHeader` Component
* Renamed variable state from `setIsDisabled` to `setIsLoading` in `CMSTLHeader` Component
* Adjusted margin for `CMSUser` Component
* Renamed variable state from `isDisabled` to `isLoading` in `CMSUserHeader` Component
* Renamed variable state from `setIsDisabled` to `setIsLoading` in `CMSUserHeader` Component
* Adjusted width for `ManagePostItemCard` Component
* Adjusted alignment and width for `ManagePostModal` Component
* Adjusted height for `ManagePostSidebar` Component
* Adjusted alignment, height, and width for `ManagePostSidebarContent` Component
* Removed `width` and `height` props for `Image` Component in `Shortcuts` Component
* Removed `loading`, `width`, and `height` props for `NextImage` Component in `SideBarHeader` Component
* Reverted changes on headers in `middleware` to `dns-prefetch` instead of `preconnect`
* Added @cssnano latest `^6.1.2` for purging unused css
* Configured `postcss.config.js` to use `cssnano` to purge unused css when creating in production build
* Updated `Image` from `@nextui-org/react` to `NextImage` Component from `next/image` in `Shortcuts` Component
* Added functionality to show the footer in `CMS` pages across roles when going back to the client list view
* Added illustration when the client list is empty in `ClientList` Component
* Updated text-label for `ColumnContainer` Component from `No data to display` to `No available tasks.`
* Added `TaskOptionsDropdown` Component
* Added functionality for task `options` in `TaskBoardCard` Component
* Updated text-label for `TaskTableView` Component from `No rows to display` to `No available tasks.`
* Added functionality for task `options` in `TaskTableView` Component
* Added functionality for rendering empty state when team is `undefined` in a draft post in `ManagePostItemCard` Component
* Added functionality for rendering empty state when type is `undefined` in a draft post in `ManagePostItemCard` Component
* Adjusted padding for `ManagePostItemCard` Component
* Added `no-data-1.webp` as illustration for rendering empty state when there is no `task` available
* Added `no-data-2.webp` as illustration for rendering empty state when there is no `task` available

## v.0.6.11

* Updated functionality to show a `toast` notification when adding new client `data` is successfully saved on `CMSAdminHeader` Component
* Added functionality to assign a `task` to a team on `CMSAdminHeader` Component
* Adjusted font color for `ColumnContainer` Component
* Updated `ColumnContainer` Component to use `text-white-default text-shadow` as its default text color style
* Adjusted font decoration for `TaskBoardCard` Component to change its `text-label` to have a line strike through it when the `task` is done
* Added color, icon, and label for the `selection` list down for `task` options on `TaskBoardCard` Component
* Updated functionality to show a `toast` notification when dragging a `task` to the done column, hence marking it done on `TaskBoardView` Component
* Adjusted font weight and background color when hovering for `TaskOptionsDropdown` Component
* Added `text-shadow` to `DropdownItem` Component that have yellow background for `TaskOptionsDropdown` Component
* Added color, icon, and label for the `selection` list down for `task` options on `TaskTableView` Component
* Added route sub-paths for `/evp`, `/culture`, and `/learning` in `NavSideBarStore` Store
* Added route sub-paths details for `/evp`, `/culture`, and `/learning` in `RoutesIconDetails` Store
* Refactored `SideBar` Component to accommodate the route sub-paths for `/empower`path
* Added additional mock up user data in `TaskStore` Store
* Added `Corina McCoy.png` as illustration for additional mock up users
* Added `Eddie Lake.png` as illustration for additional mock up users
* Added `John Dukes.png` as illustration for additional mock up users
* Added `Joshua Jones.png` as illustration for additional mock up users
* Added `Katie Sims.png` as illustration for additional mock up users
* Added `Patricia Sanders.png` as illustration for additional mock up users
* Removed functionality to assign a `task` to a team on `CMSAdminHeader` Component
* Removed the filtered out inactive team in team selection in `ClientStore` Store
* Sorted the items in team selection in `ClientStore` Store

## v.0.7.0

* Updated `backend` handler function to handle web-socket connections for notifications
* Fixed import path of atoms on `AddTaskModal` Component in admin side
* Fixed import path of atoms on `CMSAdmin` Component
* Fixed import path of atoms on `CMSAdminHeader` Component
* Added `selectedClientToViewAtom` in `CMSAdminStore` Store
* Added `selectedClientFilterKeysAtom` in `CMSAdminStore` Store
* Added `showClientDetailsAtom` in `CMSAdminStore` Store
* Fixed import path of atoms on `ClientItemCard` Component
* Fixed props passed into `ClientItemCard` Component
* Fixed props passed into `ClientList` Component
* Removed `selectionMode` prop from `Select` Component on `Searchbar` Component
* Added refresh functionality to re-fetch task data in `TaskBoardView` Component
* Added functionality to update the `task` list whenever there are changes in the `task` list in `TaskBoardView` Component
* Fixed import path of atoms on `TaskBoardView` Component
* Fixed props passed into `TaskBoardView` Component
* Fixed import path of atoms on `TaskTableView` Component
* Fixed props passed into `TaskTableView` Component
* Added data-attribute for visibility to handle hiding and showing in `TaskTableView` Component
* Adjusted visibility for `TaskTableView` Component
* Added optional chaining when rendering the `fallback` of the user picture in `UserDropdown` Component
* Added web-socket connection into `NotificationsDropdown` Component
* Adjusted props for rendering data in `NotificationsDropdown` Component due to the changes from web-socket integration
* Fixed import path of atoms on `NotificationsDropdown` Component
* Removed marking all as read functionality from `NotificationsFooter` Component due to the changes from web-socket integration
* Removed marking each `notification` as read functionality from `NotificationsList` Component due to the changes from web-socket integration
* Added notification web-socket functions into `NotificationsList` Component
* Fixed import path of atoms on `NotificationsList` Component
* Fixed props passed into `NotificationsList` Component
* Added `Spinner` Component when `notification` list is empty or loading into `NotificationsList` Component
* Fixed import path of atoms on `NotificationsOptions` Component
* Fixed props passed into `NotificationsOptions` Component
* Added notification web-socket functions into `NotificationsOptions` Component
* Updated functionality to show a `toast` notification when adding new shortcut `data` is successfully saved on `ShortcutsHeader` Component
* Fixed import path of atoms on `ShortcutsHeader` Component
* Updated functionality to show a `toast` notification when editing shortcut `data` is successfully updated on `ShortcutsHeader` Component
* Updated notifications functions to include web-socket integration in `NotificationStore` Store
* Moved shared atoms to their respective components to prevent atoms being changed unintentionally in `ClientStore` Store
* Updated atoms to use the passed `data` due to the moving of shared atoms to their respective components in `TaskStore` Store
* Fixed import path of atoms on `AddTaskModal` Component in TL side
* Fixed import path of atoms on `CMSTL` Component
* Fixed import path of atoms on `CMSTLHeader` Component
* Added atoms from `ClientStore` Store into `CMSTLStore` Store to prevent atoms being changed unintentionally
* Fixed import path of atoms on `CMSUser` Component
* Fixed import path of atoms on `CMSUserHeader` Component
* Added atoms from `ClientStore` Store into `CMSUserStore` Store to prevent atoms being changed unintentionally
* Fixed a bug when redirecting to the `home` page if already authenticated it causes an infinite redirecting loop due to the pathname not correctly read in `middleware`

## v.0.7.1

* Added atoms to handle notifications functions in `CMSAdminHeader` Component
* Remove unused atoms in `NotificationsDropdown` Component
* Updated atoms declared in `NotificationsDropdown` Component to be shared atoms so it can be globally accessible
* Fixed import path of atoms on `NotificationsFooter` Component
* Fixed props passed into `NotificationsFooter` Component
* Added functionality for notification options in `NotificationsHeader` Component
* Added `NotificationsHistory` Component to browse all notifications this includes `unread`, `read`, `hidden`, or `shown` regardless of type
* Fixed import path of atoms on `NotificationsList` Component
* Fixed props passed into `NotificationsList` Component
* Revert adding notification web-socket functions into `NotificationsList` Component
* Added sorting functionality when rendering notifications in `NotificationsList` Component
* Fixed import path of atoms on `NotificationsOptions` Component
* Fixed props passed into `NotificationsOptions` Component
* Revert adding notification web-socket functions into `NotificationsOptions` Component
* Added temporary notification function to create dummy `notification` in order to test the notification's latency

## v.0.7.1.1 - hotfix

* Adjusted z-index for `NotificationsDropdown` Component
* Removed handler for closing `NotificationsDropdown` Component
* Fixed a bug where opening the modal window for `NotificationsHistory` Component closes itself and `NotificationsDropdown` Component
* Adjusted z-index for `NotificationsHistory` Component

## v.0.7.2

* Adjusted margin for `NavigationBar` Component
* Added functionality to render `datetime` correctly in `NotificationsHistory` Component
* Added functionality to filter notifications based from its `datetime`(today, yesterday, this week) in `NotificationsHistory` Component
* Updated illustration for rendering when `notification` list is empty in `NotificationsList` Component
* Updated text-label for rendering when `notification` list is empty in `NotificationsList` Component:
* Updated import path for illustration for rendering when `shortcuts` list is empty in `Shortcuts` Component
* Adjusted font size for `Shortcuts` Component
* Updated illustration for rendering when `hr bulletin board` list is empty in `HRBulletinBoardList` Component
* Adjusted overflow-y for `HRBulletinBoardList` Component
* Adjusted width and overflow-y for `ManagePostMainContent` Component
* Adjusted width for `ManagePostModal` Component
* Updated illustration for rendering when `recognition` list is empty in `RecognitionList` Component
* Updated text-label for rendering when `recognition` list is empty in `RecognitionList` Component:
* Adjusted alignment, margin, width, overflow-y for `RecognitionList` Component
* Updated illustration for rendering when `training` list is empty in `TrainingList` Component
* Updated text-label for rendering when `training` list is empty in `TrainingList` Component:
* Adjusted alignment, padding, width, overflow-y for `TrainingList` Component
* Temporary disabled showing `onboarding` status alert
* Removed `No-Shortcuts.png`
* Removed `NoNotifications.jpg`

## v.0.7.3

* Added `drawer` component from @shadcn/ui

* Added dependencies for @shadcn/ui:
  * "@radix-ui/react-dialog": "^1.0.5"
  * "@vaul": "^0.9.0"

* Responsiveness Layout Update for mobile and tablet view
* Added breakpoints for components to become responsive when changing views (desktop, tablet, mobile)

* Supported Breakpoints:
  * Mobile S  - `min-w-[320px]`
  * Mobile M  - `min-w-[375px]`
  * Mobile L  - `min-w-[425px]`
  * Tablet    - `min-w-[768px]`
  * Laptop    - `min-w-[1024px]`
  * Laptop L  - `min-w-[1440px]`
  * 4K onwards- `min-w-[2560px]`

* Added custom breakpoint for `SideBar` Component
* Moved option details from `UserDropdown` Component to its own atom in `NavSideBarStore` Store
* Adjusted padding and margin for `ShortcutsHeader` Component
* Changed icon size in `ShortcutsOptionsModal` Component
* Changed icon size in `ExternalLinks` Component
* Adjusted image sizes in `SideBarHeader` Component
* Fixed import path of atoms on `NavigationBar` Component
* Fixed props passed into `NavigationBar` Component
* Adjusted margin and gap for `NavigationBar` Component
* Added functionality for navigating `routes` in mobile and tablet view
* Refactored elements in `NavigationBar` Component due to layout change in mobile and tablet view
* Refactored elements in `SideBar` Component due to layout change in mobile and tablet view
* Added toggle button for toggling display of `SideBar` Component in mobile and tablet view
* Adjusted padding for `SideBar` Component

## v.0.7.4

* Responsiveness Layout Update for mobile and tablet view
* Adjusted alignment, margin, and height for `MainContent` Component
* Adjusted custom breakpoint for `SideBar` Component
* Adjusted font size for `CreatePostButton` Component
* Adjusted border radius for `CreatePostCard` Component
* Adjusted font size for `CreatePostTemplateButton` Component
* Adjusted font size for `ManagePostMediaButton` Component
* Adjusted padding and height for `FiveMedia` Component
* Adjusted padding and height for `FiveMedia` Component
* Adjusted padding and height for `FiveMedia` Component
* Adjusted padding and height for `FiveMedia` Component
* Adjusted padding and height for `FiveMedia` Component
* Adjusted height for `MediaLayoutPost` Component
* Removed tailwind css class for `**-unit-**` due to update from `@nextui-org/react`
* Adjusted font size for `CommentButton` Component
* Adjusted alignment, margin, padding, font size, border radius, width, and height for for `PostCard` Component
* Removed border radius for `PostFeed` Component
* Adjusted padding for `PostFooter` Component
* Adjusted font size and width for `PostHeader` Component
* Adjusted font size for `ReactionButton` Component

## v.0.7.5

* Responsiveness Layout Update for mobile and tablet view
* Updated `LabelTagChip` Component to accept `className` as its prop to override its base style
* Adjusted margin, padding, and width for `MainContent` Component
* Adjusted margin, padding, and width for `RightBar` Component
* Adjusted margin, padding, border radius, font size, and height for `RightBarCard` Component
* Adjusted margin and padding for `NavigationBar` Component
* Added `NavigationTab` Component to render components in mobile and table view
* Adjusted border radius for `BirthdayCard` Component
* Adjusted margin, padding, gap, height, and width border radius for `CreatePostCard` Component
* Updated aria-label for `HRBulletinBoardList` Component
* Adjusted alignment, visibility, line clamp, font size and width for `HRBulletinBoardList` Component
* Adjusted height for `MediaLayout` Component
* Adjusted padding, border radius, and font size for `PostCard` Component
* Added `className` prop for `PostFeed` Component to handle visibility in mobile and tablet view
* Adjusted margin, padding, font size and width for `RecognitionList` Component
* Adjusted border radius for `RexWinnerCard` Component
* Adjusted alignment, visibility, line clamp, font size and width for `TrainingList` Component
* Added shortened version of its datetime in `TrainingList` Component
* Updated layout in home page due to changes in mobile and tablet view

## v.0.7.6

* Responsiveness Layout Update for mobile and tablet view
* Refactored `NavigationTab` Component to render passed props as its children
* Adjusted padding and font size for `BenefitsContent` Component
* Adjusted font size for `BenefitsContent` Component
* Adjusted font size for `EmergencyContactContent` Component
* Adjusted font size for `LeaveBalanceContent` Component
* Adjusted border radius for `ProfileCard` Component
* Adjusted font size for `UserOnboardingContent` Component
* Adjusted font size for `UserOnboardingModal` Component
* Updated layout in profile page due to changes in mobile and tablet view

## v.0.7.7

* Responsiveness Layout Update for mobile and tablet view
* Adjusted padding for `RightBarCard` Component
* Adjusted padding for `BenefitsContent` Component
* Adjusted padding for `EmergencyContactContent` Component
* Adjusted padding and font-size for `LeaveBalanceContent` Component
* Adjusted padding for `UserOnboardingContent` Component
* Adjusted font size for `UserOnboardingModal` Component
* Updated displayed item count on `CMSAdminFooter` Component
* Adjusted gap and font size for `UnderConstruction` Component
* Adjusted z-index for `NavigationTab` Component
* Added functionality to show push `notification` when new notifications is received
* Updated functionality when opening the modal window for all notifications to close the dropdown for `NotificationsDropdown` Component on `NotificationsFooter` Component
* Added functionality to filter notifications based from its `datetime`(older than a week) in `NotificationsHistory` Component
* Adjusted height for toggle button in `SideBar` Component
* Added optional chaining when fetching client `data` in `ClientStore` Store
* Added optional chaining when fetching task `data` in `TaskStore` Store
* Updated displayed item count on `CMSTLFooter` Component
* Updated displayed item count on `CMSUserFooter` Component
* Adjusted width for `BenefitsContent` Component
* Adjusted width for `EmergencyContactContent` Component
* Adjusted width for `LeaveBalanceContent` Component
* Adjusted margin, gap, and width for `AboutInfo` Component
* Adjusted height for `ProfileCard` Component
* Adjusted z-index, padding and background-color for `ProfileDetails` Component
* Removed svg icon for changing profile picture in `ProfileHeader` Component
* Adjusted alignment, margin, padding, height and width for `ProfileHeader` Component
* Adjusted image sizes in `ProfileHeader` Component
* Adjusted alignment, padding, gap, visibility, font size and width for `HRBulletinBoardList` Component
* Added functionality to `request` the user for `notification` permission
* Added @react-push-notification latest `^1.5.4` for push notifications

## v.0.8.0

* Push Notification Integration
* Updated illustration for Aretex logo
* Removed @react-push-notification latest `^1.5.4` for push notifications
* Reverted changes from @react-push-notification
* Temporary disabled `interval` fetching of task and client data in `CMSUser` Component
* Added functionality to filter notifications by the user's unique `id` in `NotificationsList` Component
* Added event `listener` for page visibility on `NotificationsDropdown` Component
* Added functionality to show `push` notifications when the page is not visible to the user, otherwise show `toast` notifications when the page is visible

## v.0.8.0.1 - hotfix

* Fixed import path for illustration for rendering when `shortcuts` list is empty in `Shortcuts` Component

## v.0.8.1

* Updated import path for shared atoms and props for `CMSAdmin` Component
* Removed `CMSAdminFooter` Component
* Added `CMSFooter` Component for shared `CMS` components
* Adjusted alignment, margin, visibility, font size, height, and width for `CLientDetails` Component
* Adjusted margin, visibility, gap, font size, and height for `ClientItemCard` Component
* Adjusted padding, font size, and width for `ClientList` Component
* Adjusted padding for `TaskTableView` Component
* Removed `sizeVariants` from base `Chip` component for `LabelTagChip` Component
* Added responsive font size on `LabelTagChip` Component
* Added width to base `Input` Component for `SearchBar` Component
* Added width to base `Select` Component for `SearchBar` Component
* Updated layout in `SearchBar` Component due to changes in mobile and tablet view
* Removed `CMSTLFooter` Component
* Updated import path for shared atoms and props for `CMSUser` Component
* Adjusted margin and padding for `CMSUser` Component
* Adjusted alignment, visibility, margin, padding, gap, and width for `CMSUserHeader` Component
* Adjusted padding for `CMS` page
* Updated colors for `button` Component from @shadcn/ui
* Added supported image formats in `next.config.js` file to configure what image format will be used

## v.0.8.1.1 - hotfix

* Refactored import path of `SideBar` Component to disable `SSR` in `user` layout
* Refactored import path of `SideBar` Component to disable `SSR` in `admin` layout
* Refactored import path of `SideBar` Component to disable `SSR` in `hr` layout
* Refactored import path of `SideBar` Component to disable `SSR` in `tl` layout

## v.0.8.2

* Adjusted width for `ClientList` Component
* Updated `LabelTagChip` Component to accept `classNameContent` as its prop to override its base style
* Adjusted padding for `TaskTableView` Component
* Fixed a bug where opening the modal window for `NotificationsHistory` Component closes itself only when clicking outside of `NotificationsDropdown` Component
* Adjusted padding for `CMSUser` Component
* Adjusted alignment, gap, and width for `CMSUserHeader` Component
* Added width, overscroll behavior, and scrollbar visibility on an element in `CMSUserHeader` Component
* Added font size on `LabelTagChip` Component in `HRBulletinBoardList` Component
* Adjusted visibility for `HRBulletinBoardList` Component

## v.0.8.3

* Added `notify-user.js` to share notification functions to other components
* Removed `CMSAdminHeader` Component
* Removed `CMSTLHeader` Component
* Added `CMSHeader` Component for shared `CMS` components
* Added functionality to onboard new `client` and add new `task` in `CMSAdmin` Component
* Adjusted padding for `ClientItemCard` Component
* Added border ring on `Avatar` Component in `ClientItemCard` Component
* Removed duplicate `task` option for `TaskBoardCard` Component
* Added `ConfirmationWindow` Component
* Added functionality to handle task actions for `TaskOptionsDropdown` Component
* Added confirmation before and after task actions for `TaskOptionsDropdown` Component
* Adjusted background color for `Dropdown` Component in `TaskTableView` Component
* Adjusted width for `SearchBar` Component
* Added functionality to open modal window to browse all notifications this includes `unread`, `read`, `hidden`, or `shown` regardless of type in `NotificationsDropdown` Component
* Moved `NotificationsHistory` Component to `NotificationsDropdown` Component
* Fixed a bug where opening the modal window for `NotificationsHistory` Component uses multiple `useDisclosure()` hook which results in unintentionally closing of window of itself and `NotificationsDropdown` Component
* Added functionality to filter notifications by type and visibility in `NotificationsHistory` Component
* Added functionality to re-fetch notification `data` in `NotificationsHistory` Component
* Adjusted width for `SideBar` Component
* Adjusted padding for `SideBarHeader` Component
* Adjusted image size for Aretex logo in `SideBarHeader` Component
* Added functionality to add new `task` in `CMSTL` Component
* Fixed props passed to `CMSHeader` Component from `CMSAdmin` Component
* Fixed props passed to `CMSHeader` Component from `CMSTL` Component
* Fixed props passed to `CMSHeader` Component from `CMSUser` Component
* Renamed file `notify-users.js` to `notificationUtils.js`
* Updated notification function used in `providers.jsx`

## v.0.8.4

* Temporary disabled `interval` fetching of task and client data in `CMSAdmin` Component
* Fixed the overlapping styles of `LabelTagChip` Component and `Button` Component in `ClientItemCard` Component
* Adjusted margin, gap, line clamp, font size and height for `TaskBoardCard` Component
* Removed radius prop from base component in `LabelTagChip` Component to allow radius style to be override
* Adjusted padding for `MainContent` Component
* Adjusted filter icon size for `SearchBar` Component
* Added atom `state` for the page visibility in `NotificationsStore` Store
* Updated `notification` content to display the latest `notification` received in `NotificationsDropdown` Component
* Removed `notificationCount` prop from `NotificationsFooter` Component
* Added functionality to browse hidden notifications from an option in `NotificationsHeader` Component
* Refactored filtering functionality of notifications in `NotificationsHistory` Component
* Removed notification tabs for filtering notifications to browse in `NotificationsHistory` Component
* Added `SearchBar` Component for sorting, filtering, and searching for notifications in `NotificationsHistory` Component
* Added toast notification when hiding notifications in `NotificationOptions` Component
* Adjusted alignment for `CMSTL` Component
* Updated functionality of `showNotification` to display rejected `notification` permission message to user
* Refactored functionality to ask for `notification` permission from the user

## v.0.8.5

* `SideBar` Component UI Revision
* Adjusted layout of `admin` page due to changes from `SideBar` Component
* Adjusted layout of `hr` page due to changes from `SideBar` Component
* Adjusted layout of `tl` page due to changes from `SideBar` Component
* Adjusted layout of `user` page due to changes from `SideBar` Component
* Fixed a bug where dragging a `task` in the same column particularly in the `Done` column it still triggers the `toast` notification to show in `TaskBoardView` Component
* Added functionality to check the route if it is a cms `route` in `SideBar` Component
* Refactored `SideBar` Component to be toggled when the user is in a cms `route` otherwise, it stays non-toggled
* Added functionality to be able to collapse the `SideBar` Component, same functionality in mobile and tablet view

## v.0.9.0

* Tailwind `color` classes migration, in favor of a centralized file to change `color` values
* Configured tailwind to use css variables for `color` classes
* Updated default `color` classes in all components to match the project's custom `color` classes
* Updated hard-coded `color` values in components that do not support tailwind classes directly in the component to use css variables for tailwind `color` classes
* Added custom `color` classes for hard-coded `color` values that do not match any available tailwind `color` classes
* Updated functionality to fetch complete list of signed-in users in `TagPersonSelect` Component

## v.0.9.1

* Tailwind `color` classes migration, in favor of a centralized file to change `color` values
* Moved functionality to fetch complete list of signed-in users from `TagPersonSelect` Component to `ManagePostStore` Store
* Adjusted alignment for `CMSAdmin` Component
* Adjusted alignment for `CMSHeader` Component
* Adjusted background color for `FormFieldInput` Component
* Adjusted background color for `FormFieldRadio` Component
* Adjusted background color for `FormFieldTextArea` Component
* Adjusted font color for `LabelTagChip` Component
* Adjusted padding for `RightBarCard` Component
* Converted color values from `hex` format to `rgba` format in `globals.css`
* Updated `rgba` format to accept opacity value
* Fixed unable to parsed css variables for `color` values in `OnboardingHeader` Component
* Fixed unable to parsed css variables for `color` values in `ShortcutItem` Component
* Fixed unable to parsed css variables for `color` values in `SideBar` Component
* Refactored functionality to fetch complete list of signed-in users for selecting processors in adding new `task` in `TaskStore` Store
* Added shared atom to fetch complete list of signed-in users in `UserStore` Store
* Added border radius to base component in `LabelTagChip` Component to allow border radius style to be override
* Added null check for text-label in `LabelTagChip` Component
* Adjusted width for `TaskBoardCard` Component
* Adjusted background color for `ExternalLinks` Component
* Removed background color for `ShortcutItem` Component
* Added transition animation for `SubMenu` items in `Sidebar` Component
* Fixed an issue where right border of `Sidebar` Component is still visible in mobile and tablet view
* Fixed unable to parsed css variables for `color` values in `OnboardingHeader` Component
* Added title for task actions atom in `TaskStore` Store
* Added border radius on `LabelTagChip` Component in `AboutInfo` Component
* Adjusted width for `BenefitsContent` Component
* Added padding, border radius and font size on `LabelTagChip` Component in `BenefitsContent` Component
* Adjusted font size for `HRBulletinBoardList` Component
* Refactored from svg icon to `IconButton` Component for changing profile picture in `ProfileHeader` Component

## v.0.9.2

* Google Calendar Integration
* Implemented Google Calendar Configuration
* Added @axios latest `^1.6.8` to fetch data from Google API
* Added @next-auth latest `^4.24.7` for authentication with Google as social provider
* Added @uuid latest `^9.0.1` for creating short non-sequential url-friendly unique ids
* Fixed a bug where selected `client` id is returned as `undefined`, as a result `tasks` are created without any client `data`
* Reverted changes to `client` selection when creating `task` so user can have an indicator which `client` is currently selected
* Adjusted padding for `TaskTableView` Component
* Adjusted font color for `UserDropdown` Component
* Refactored `reviewer` and `manager` selection atom to use shared atom to fetch complete list of signed-in users in `UserStore` Store
* Refactored `TrainingList` Component to fetch from Google Calendar
* Configured Google Calendar for production build in `authOptions.js`
* Updated @next to latest `^14.2.3`

## v.0.9.2.1 - hotfix

* Reverted changes from configuring env variable for Google Calendar

## v.0.9.3

* Added @next/bundle-analyzer latest `^14.2.3` to assess bundle size for optimization purposes
* Configured `next.config.js` for @next/bundle-analyzer
* Moved shared atoms for creating `task` and storing its `data` from `TaskStore` to each respective store of each role
* Refactored `TaskFormSections` to use the passed prop for storing task `data`
* Fixed a bug when selecting a `client` in the list does not match the correct `data` type as a result the `client` id is returned as `undefined`
* Adjusted padding, font weight, and font color for `FormFieldInput` Component
* Adjusted padding for `FormFieldTextArea` Component
* Updated minimum rows for typing from base `TextArea` component for `FormFieldTextArea` Component
* Removed unused css variables from `globals.css`
* Updated color classes for @shadcn/ui components to use custom tailwind color classes

## v.0.9.3.1 - hotfix

* Fixed `reviewerSelectionAtom` due to failed merging of previous `commit`
* Adjusted alignment for `CMSTL` Component
* Fixed a bug where tailwind dependencies are not working properly when installed as `devDependencies` and causes failed build in deployment

## v.0.9.4

* Updated @eslint to latest `^8.57.0`
* Updated automatic fetching of `task` and `client` data from `2.5secs` to `5secs` on `CMSAdmin` Component
* Updated automatic fetching of `task` and `client` data from `2.5secs` to `5secs` on `CMSTL` Component
* Updated automatic fetching of `task` and `client` data from `2.5secs` to `5secs` on `CMSUser` Component
* Fixed a bug where CMSFooter appears when navigating to client details or switching to task board view
* Adjusted width for `SearchBar` Component

## v.0.9.5

* Adjusted margin, padding, and width for `CMSAdmin` Component
* Adjusted padding for CMS `admin` page
* Refactored from svg icon to `IconButton` Component for changing `client` picture in `ClientDetails` Component
* Adjusted alignment, visibility, margin, padding, gap, font size, and width for `ClientDetails` Component
* Adjusted alignment, gap, and width for `ClientInfo` Component
* Adjusted padding, overflow-x, and height for `ClientItemCard` Component
* Adjusted alignment, visibility, margin, padding, gap, and width for `ClientDetails` Component
* Adjusted alignment for `TaskBoardView` Component
* Adjusted margin for `TaskOptionsDropdown` Component
* Adjusted padding, border radius, font size, font color, height, and width for `TaskTableView` Component
* Adjusted width for `SearchBar` Component
* Added a validation to check if the passed children is a valid element in `CTAButtons` Component
* Renamed prop from `classNameContent` to `classNameLabel` in `LabelTagChip` Component
* Updated affected components due to the renamed prop from `LabelTagChip` Component

## v.0.9.6

* Google Calendar Integration Update

## v.0.9.7

* Added `--turbo` flag to `npm run dev` option to enable faster local development

* Added @zod latest `^3.23.8` for form validation of all components
* Added @hookform/resolvers latest `^3.6.0` for form validation of all components
* Added @react-hook-form latest `^7.51.5` for form validation of all components
* Fixed parity issues with both views for tasks
