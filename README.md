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

> This repo is for **learning and experimentation**. Expect breaking changes, new tools, and evolving structure as I explore best practices for monorepos!
