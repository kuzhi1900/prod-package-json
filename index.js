export class ProdPackageJson {
    constructor({ 
        sourcePath = './package.json',
        targetDir = './dist',
    } = {}) {
        this.sourcePath = sourcePath;
        this.targetDir = targetDir;
        this.packageJson = null;
    }

    // 读取并解析 package.json
    read() {
        this.packageJson = JSON.parse(fs.readFileSync(this.sourcePath, 'utf-8'));
        return this;
    }

    // 删除指定字段
    cleanFields(fields = ['devDependencies']) {
        fields.forEach(field => {
            delete this.packageJson[field];
        });
        return this;
    }

    // 更新 scripts 配置
    updateScripts(scripts = {}) {
        this.packageJson.scripts = scripts;
        return this;
    }

    // 确保目标目录存在
    ensureTargetDir() {
        if (!fs.existsSync(this.targetDir)) {
            fs.mkdirSync(this.targetDir, { recursive: true });
        }
        return this;
    }

    // 写入处理后的 package.json
    write() {
        fs.writeFileSync(
            `${this.targetDir}/package.json`,
            JSON.stringify(this.packageJson, null, 2),
            'utf-8'
        );
        console.log('✓ Generated production package.json in dist directory');
        return this;
    }

    // 执行整个处理流程
    convert({ fields = ['devDependencies'], scripts = {} } = {}) {
        return this
            .read()
            .cleanFields(fields)
            .updateScripts(scripts)
            .ensureTargetDir()
            .write();
    }
}

// usage
const prodPackage = new ProdPackageJson();
prodPackage.convert({
  fields: ['devDependencies', 'lint-staged', 'config'],
  scripts: {
    'start': 'node index.js'
  }
});