const Asset = require('parcel-bundler/src/Asset');
const urlJoin = require('parcel-bundler/src/utils/urlJoin');
const isURL = require('parcel-bundler/src/utils/is-url');
const logger = require('parcel-bundler/src/Logger');

class AssetListAsset extends Asset {
    constructor(name, pkg, options) {
        super(name, pkg, options);
        this.type = 'json';
    }

    collectDependencies() {
        const resolveAsset = path => {
            const assetPath = this.addURLDependency(this.ast[path]);
            if (!isURL(assetPath)) {
              return urlJoin(this.options.publicURL, assetPath);
            }
            return assetPath;
        };
        Object.keys(this.ast).forEach(path => this.ast[path] = resolveAsset(this.ast[path]));
    }

    parse(code) {
        const mapping = {};
        code.split('\n').map(p => p.replace(/#.*/, '')).map(s => s.trim()).filter(Boolean).forEach(path => mapping[path] = path);
        return mapping;
    }

    generate() {
        return [
            {
                type: 'json',
                value: JSON.stringify(this.ast, null, 1),
                final: true,
            },
            {
                type: 'js',
                value: `module.exports = ${JSON.stringify(this.ast, null, 1)}`,
            },
            {
                type: 'assets',
                value: Object.keys(this.ast).map(path => `${path}: ${this.ast[path]}\n`).join(''),
                final: true,
            }
        ];
    }
}

module.exports = AssetListAsset;