import fs from  'fs';
class ProdPackageJson {
    constructor({} = {}) {
        this.packageJson = null;
    }

    // 读取并解析 package.json
    read(sourcePath) {
        this.packageJson = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
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
    ensureTargetDir(targetDir) {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, {recursive: true});
        }
        return this;
    }

    // 写入处理后的 package.json
    write(targetDir) {
        fs.writeFileSync(
            `${targetDir}/package.json`,
            JSON.stringify(this.packageJson, null, 2),
            'utf-8'
        );
        console.log(`✓ Generated production package.json in ${targetDir} directory`);
        return this;
    }

    // 执行整个处理流程
    save({
             sourcePath = './package.json',
             targetDir = './dist',
             fields = ['devDependencies'],
             scripts = {}
         } = {}) {
        return this
            .read(sourcePath)
            .cleanFields(fields)
            .updateScripts(scripts)
            .ensureTargetDir(targetDir)
            .write(targetDir);
    }
}

export default new ProdPackageJson()