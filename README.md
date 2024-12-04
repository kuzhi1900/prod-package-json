# prod-package-json
This library can help minify the package.json file when building the production version.

### Usage
```js
import prodJson from 'prod-package-json'


prodJson.save({
  sourcePath = './package.json',
  targetDir = './dist',
  fields: ['devDependencies'],
  scripts: {
    'start': 'node ./dist/index.js'
  }
});
```

