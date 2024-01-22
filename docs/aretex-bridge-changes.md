# Aretex Bridge Changes

## Phase 1 - Implementation of Initial Prototype

## v.0.1.0

* Initial Commit

## v.0.1.1

* Implemented Cognito Authentication
* Added Authenticator Component from Amplify UI to test Cognito Authentication
* Fixed Reference Error - _window_ being accessed on the server
* Configured framework and Components to match prototype's style in Figma
* Configured tailwind css to match Bridge's color palette

## v.0.2.0

* Added Sidebar and Navigation Bar Component
* Added routes for `user` and `sign-in`
* Added custom font family `Helvetica Now Display` for Bridge
* Updated Routing and Navigation

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
* Added functionality of onboarding form - storing data
  * Note: Only `Background` section not yet done in onboarding form Component

## v.0.4.3

* Removed @jotai/optics due to `ReferenceError` during runtime
* Finished all functionality of onboarding form

## v.0.4.4

* Centralized frontend and backend repo to the `bridge-official` repo
* Added `docs` folder for documentation
* Added `frontend-changes.md` in `docs` folder
* Moved contents for tracking frontend changes from `README.md` to `frontend-changes.md`
* Added `NewsFeed` Component
* Added `HighlightArea` Component
* Added `Trainings` Component
* Added `RexWinner` Component
* Added `Birthday` Component
* Renamed `NewsFeed` to `MainContent`
* Renamed `HighlightArea` to `RightBar`

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
* Added `light grey` and `dark grey` variant for color `grey`

## v.0.4.8

* Cleaned up and refactored source code
* Organized Project Structure
* Updated Paths for All Components
* Disabled for now backend functions due to build configuration error
* Updated @tailwindcss to latest v3.4.1
* Added Media Layout Component

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
* Removed majority of `console.log()` left from deployment
* Added `TODO`s for future updates `prefix:// ### TODO...`
* Fixed post images now properly fill their container regardless of their shape

## v.0.4.10

* Updated Changelog

## v.0.5.0

* Merging of frontend and backend
* Updated frontend to latest changes as of v.0.4.10
* Changed variable name from `export default ExternalLinksHeader;` to `export default SideBarHeader;`to match the Component's filename
* Changed redirect behavior of `ReconnectButton` to refresh the Page and `ReturnButton` to return to the previous page the user visits
* Added fetched user attributes to `UserDropdown` Component (name, picture, etc.)
* Added `signOut` function from @aws-amplify to `UserDropdown` Component
* Moved `options` for `UserDropdown` Component to `NavSideBarStore`
* Moved fetched user attributes from `user page` to `UserStore`

## v.0.5.0 - hotfix

* Added middleware for route protection
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

## v.0.5.2 - hotfix

* Merged Changelog from prod repo `bridgev2` to `bridge-frontend`
* Removed `console.log()` on `PostFooter` Component
* Fixed import error by updating `next/router` to `next/navigation` on `ReconnectButton` and `ReturnButton` Component

## v.0.5.3

* Changed named export from `CreatePost` to `CreatePostCard`to match its filename
* Fetched user attributes are now displayed correctly in `UserDropdown` and `CreatePostCard` Component
