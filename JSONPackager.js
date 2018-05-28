const Packager = require('parcel-bundler/src/packagers/Packager');

class JSONPackager extends Packager {
    constructor(...args) {
        super(...args);
        this.combinedAst = {};
    }
    addAsset(asset) {
        Object.assign(this.combinedAst, JSON.parse(asset.generated.json));
    }
    async end() {
        await this.write(JSON.stringify(this.combinedAst, null, 2));
        return super.end();
    }
}

module.exports = JSONPackager;
