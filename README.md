# Turborepo Monorepo Study

This repository is a personal study and experimentation ground for modern monorepo development using [Turborepo](https://turbo.build/).

## Purpose

- **Learning and exploring** how to structure, build, and deploy a monorepo with multiple frameworks and tools.
- **Experimenting** with Next.js 15, React apps, a shared design system, Storybook, and custom CI/CD strategies for each app and package.

## Structure

- **Apps**
  - `web`: React (Vite) app
  - `nextjs-app`: (Planned) Next.js 15 app
- **Packages**
  - `@jaeungkim/ui`: Shared UI component library (design system)
  - `@jaeungkim/eslint-config`: Shared ESLint config
  - `@jaeungkim/typescript-config`: Shared TypeScript config
  - `@jaeungkim/prettier-config`: Shared Prettier config

- **Storybook**
  - Integrated for the design system and/or UI packages

## CI/CD

- Each app and package can have its own CI/CD workflow (e.g., GitHub Actions), Dockerfile, and deployment strategy.
- The goal is to understand how to manage independent build, test, and deploy pipelines within a single monorepo.

## Tech Stack

- [Turborepo](https://turbo.build/) for monorepo orchestration
- [Next.js 15](https://nextjs.org/) and [React](https://react.dev/) for apps
- [Storybook](https://storybook.js.org/) for UI development
- [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

---

## Version Control & Safe Upgrades with Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) to safely version and upgrade internal packages. This allows each app to use the version of a shared package it wants, and makes upgrades explicit and traceable.

### How to Use Changesets

1. **Make your changes** to a package (e.g., update a rule in `eslint-config`).
2. **Create a changeset:**
   ```sh
   yarn changeset
   ```

   - Follow the prompts to describe your change and select affected packages.
3. **Commit your changes** (including the new changeset file):
   ```sh
   git add .
   git commit -m "feat(eslint-config): update rule X"
   ```
4. **Version and release:**
   - When ready, run:
     ```sh
     yarn changeset version
     ```
   - This bumps versions and updates changelogs.
   - Commit these changes:
     ```sh
     git add .
     git commit -m "chore(release): version packages"
     git push
     ```
5. **Update app dependencies** as needed:
   - In each app's `package.json`, specify the version of the shared package you want to use.
   - Run `yarn install` to update dependencies.

> This workflow allows you to safely upgrade apps to new versions of shared packages when you're ready, and to track all changes and releases in git.

---

## Using Different Versions of Internal Packages in Apps

With this versioned monorepo setup, each app or package can use a different version of a shared internal package. For example, if you release `@jaeungkim/eslint-config@2.0.0`, but want `web` to use `1.0.0` and `nextjs-app` to use `2.0.0`, you can do so:

- In `apps/web/package.json`:
  ```json
  "devDependencies": {
    "@jaeungkim/eslint-config": "1.0.0"
  }
  ```
- In `apps/nextjs-app/package.json`:
  ```json
  "devDependencies": {
    "@jaeungkim/eslint-config": "2.0.0"
  }
  ```

After updating the versions, run:

```sh
yarn install
```

Each app will use the version you specify. This allows for safe, gradual upgrades and easy rollback if needed.

### How Does This Work?

Modern package managers like **Yarn Berry** and **pnpm** support multiple versions of the same internal package within a monorepo. When you run `yarn install`, the package manager:

- Reads each app's or package's `package.json` to see which version of the internal package it wants.
- Installs and links the correct version for each app, even if that means having multiple versions in the monorepo at once.
- Ensures that when you run scripts or tools in each app, they use the version of the shared package you specified.

This is possible because these package managers use a content-addressable store (not just a flat `node_modules`), so they can keep multiple versions side-by-side and link them as needed. This is a huge advantage for safe, incremental upgrades in large monorepos.

---

> This repo is for **learning and experimentation**. Expect breaking changes, new tools, and evolving structure as I explore best practices for monorepos!
