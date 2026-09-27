# Vercel deployment

Deploy the complete source project. The selected Root Directory must contain these together:

```text
package.json
package-lock.json
index.html
vite.config.ts
vercel.json
tsconfig.json
tsconfig.app.json
tsconfig.node.json
src/
public/
```

The repository configuration selects Vite, builds with `npm run build`, and serves `dist`. Existing rewrites support direct visits to `/admin` and other React routes.

## TS18003: No inputs were found

The TypeScript config includes `src`, but Vercel found no matching TypeScript source files in that location. Confirm that the deployed branch/commit includes `src/main.tsx`, `src/App.tsx`, and the complete `src` directory, with the exact lowercase folder name.

In Vercel project settings, set Root Directory to the folder containing both `package.json` and `src`. If this project is at the repository root, use the repository root. If it is in a subfolder, select that subfolder. Do not select `src` or `dist` as the Root Directory for a source build.

Commit/upload the source folders, then redeploy. Do not disable TypeScript checking to hide this error: Vite also needs the missing source files. Dependency deprecation and install-script warnings are separate from this missing-input error.
