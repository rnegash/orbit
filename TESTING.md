## Testing in this project

### Jest unit/integration tests

- **Run all tests once**:

  ```bash
  npm test
  ```

- **Run in watch mode for TDD**:

  ```bash
  npm run test:watch
  ```

- **What is covered**:
  - `app/logList.tsx` – merges and renders pain/workout events from SQLite.
  - `app/log/state.tsx` – validation flow for pain logs.
  - `app/log/workout.tsx` – validation flow for workout logs.
  - `lib/db.ts` – `migrateDbIfNeeded` behavior for different schema versions.
  - `components/logView.tsx` – basic rendering.

Tests live under `__tests__` folders next to the code they cover.

### CI

- GitHub Actions workflow `tests.yml` runs Jest on each push and PR.

