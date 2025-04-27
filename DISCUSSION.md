## Author's Note

Across both PRs ([1](https://github.com/aliramazon/solace/pull/1/files) and [2](https://github.com/aliramazon/solace/pull/2/files)), my goal was to clean up the codebase, make the data easier to scale, and structure things in a way that will be easier to maintain over time.

In the first part, I focused on removing older patterns that were no longer useful—like hardcoded data and unused styling tools (Tailwind and PostCSS). I replaced the static data with Faker-generated entries and broke the UI into reusable components. Switching to a card layout helped make the content more readable, especially on smaller screens where table layouts become messy.

The second PR continued those improvements by adding cursor-based pagination, which is better for performance than loading everything at once. I also moved pagination and filtering logic into a custom hook and replaced multiple useState calls with a single useReducer, making the code cleaner and easier to manage. I added basic caching so the app doesn’t repeat network requests when switching between pages.

Overall, these changes were meant to make the app faster, easier to work with, and more organized. They also set things up for future upgrades, like adding backend search and loading placeholders. The goal was to improve the current experience while preparing for features we’ll likely need as the app grows.
