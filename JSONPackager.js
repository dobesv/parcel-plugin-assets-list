const Packager = require('parcel-bundler/src/packagers/Packager');

class JSONPackager extends Packager {
    constructor(...args) {
        super(...args);
        this.combinedAst = {};
    }

    addAsset(asset) {
        if(!asset.generated.json)
            throw new Error(`JSON missing in parsed asset: ${asset.relativeName}; got ${Object.keys(asset.generated).join(',')}`);
        try {
            Object.assign(this.combinedAst, JSON.parse(asset.generated.json));
        } catch (e) {
            e.message = `In ${asset.name}: ${e.message}:\n${asset.generated.json}`;
            throw e;
        }
    }

    async end() {
        await this.write(JSON.stringify(this.combinedAst, null, 2));
        return super.end();
    }
}

module.exports = JSONPackager;
