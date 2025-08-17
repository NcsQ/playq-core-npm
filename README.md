# @ncsq/playq-core

Core of the PlayQ Automation Framework (TypeScript). Ships actions, fixtures, env loader and a `playq` CLI that executes the runner.

## Install

Install directly from GitHub (public repo):

```sh
npm install github:ncsq/playq-core#v1.0.0
# or a branch:
npm install github:ncsq/playq-core#main
```

## Usage

- Import API:
```ts
import { loadEnv, actions } from '@ncsq/playq-core';
```
- CLI (after install):
```sh
npx playq -- --grep "@smoke"
```

## Build & Publish (maintainers)

```sh
npm run build
npm publish --access public
```

Note: Dist is committed so git consumers don’t need to build locally.
