# prod-package-json
This library can help minify the package.json file when building the production version.

### Usage
```js
import {ProdPackageJson} from 'prod-package-json'

const prodPackage = new ProdPackageJson({
        sourcePath = './package.json',
        targetDir = './dist',
    });
prodPackage.convert({
  fields: ['devDependencies'],
  scripts: {
    'start': 'node ./dist/index.js'
  }
});
```

