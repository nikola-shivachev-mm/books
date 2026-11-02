1. Project overview

- React Native app to search OpenLibrary books and view details
- Tech stack: React Native 0.88 (CLI, no Expo), TypeScript, React Navigation, TanStack Query, AsyncStorage

2. Features

- Search screen (Search API)
- Book details screen (Books API)
- Offline banner + network status detection
- Response caching/persistence across app restarts (search results + book details)

4. Project structure

- The app lives in /src folder. The code is divided by type (screens, components, api, navigation etc).
  The project is small and this doesn't cause confusion. In the future if we want to scale the project better we can think of implementing a more module approach (Home, BookDetails, Profile, Settings etc) where every folder contains its needed code (hooks, components, screens etc.)

5. Testing

- npm run test — unit tests for hooks, helpers; component tests for individual dummy components (Loading, OfflineBanner etc)

6. Architecture notes

- Data fetching via TanStack Query. I chose it because it has caching, retries and works well with AsyncStorage for device persistence.
- Navigation consists of 2 screens using via React Navigation native stack.

7. Time constraints

- If I had more time to work on the task I would do the following improvements:

  - Better UI for Home and Details screens. More intuitive search bar (now is triggered with an event from the phone keyboard). It can run on focus out, auto search after N amount of characters with a debounce time. We can show the last 3-4 searches by the user. There can be a loading skeleton to help the user wait longer for results.
  - Pagination for the list
  - BookDetails can show more details.
  - Light/Dark themes
  - More e2e testing
  - more detailed error handling (based on the type). We can use ErrorBoundary
  - Suspense for loading states
  - CI/CD flow with tests running after each PR is created etc.

8. Alternative AI-centric workflow I would have used

- using the PDF assignment as context I would have used claude to "grill me" for all details concerning the project. Results go in SPEC.md for future references.
- After the planning I would have decided on a project structure, stack and overall details. I would have created top level empty folders/files so that Claude would have little room for error when implementing the features. Every important detail goes in CLAUDE.md. We are careful to not get it filled too much with details so it starts to not follow our guidance.
- After the planning and scaffolding I would have cut the job into several logically structured tasks and start building them 1 by 1. I would advise Claude to self-document the steps for future reference.
- Write and run tests after each step + manual testing
- For more structured and hands on approach we can have custom agents that will handle each step of implementation a task. (Planner, Coder, Tester, Reviewer, Committer)
- Fresh session after each task (no more than 40-50% filled context)
