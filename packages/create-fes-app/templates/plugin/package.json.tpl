{
  "name": "fes-plugin-{{{name}}}",
  "version": "1.0.0",
  "description": "一个fes.js插件",
  "main": "dist/index.mjs",
  "module": "dist/index.mjs",
  "files": [
    "dist",
    "README.md",
    "types.d.ts"
  ],
  "scripts": {
      "dev": "tsup --watch --sourcemap",
      "build": "tsup"
  },
  "license": "MIT",
  "keywords": [
  ],
  "dependencies": {
  },
  "devDependencies": {
    "@antfu/eslint-config": "^5.2.2",
    "tsup": "^8.5.0",
    "fs-extra": "^11.3.1",
    "eslint": "^9.34.0",
    "typescript": "^5.9.2"
  },
  "peerDependencies": {
    "@fesjs/fes": "^4.0.0",
    "vue": "^3.5.20",
  }
}