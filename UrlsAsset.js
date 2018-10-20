const Asset = require('parcel-bundler/src/Asset');
const isURL = require('parcel-bundler/src/utils/is-url');
const urlJoin = require('parcel-bundler/src/utils/urlJoin');

class UrlsAsset extends Asset {
    constructor(...args) {
        super(...args);
        this.type = 'json';
    }

    async collectDependencies() {
        for (let key of Object.keys(this.ast)) {
            const originalPath = this.ast[key];
            const assetPath = this.addURLDependency(originalPath);
            if (!assetPath) throw new Error(`Cannot resolve dependency '${originalPath}'`);
            if (!isURL(assetPath)) {
                this.ast[key] = urlJoin(this.options.publicURL, assetPath);
            } else {
                this.ast[key] = assetPath;
            }
        }
    }

    parse(code) {
        const mapping = {};
        code.split('\n').map(p => p.replace(/#.*/, '')).map(s => s.trim()).forEach(
            line => {
                const parts = line.split(/\s*:\s*/);
                const key = parts[0].trim();
                const path = (parts[1] || parts[0]).trim();
                if (key && path)
                    mapping[key] = path
            }
        );
        return mapping;
    }

    async generate() {
        return [
            {
                type: 'json',
                value: JSON.stringify(this.ast, null, 1),
                final: true,
            },
            {
                type: 'js',
                value: `module.exports = ${JSON.stringify(this.ast, null, 1)};`,
            },
            {
                type: 'urls',
                value: Object.keys(this.ast).map(path => `${path}: ${this.ast[path]}\n`).join(''),
                final: true,
            }
        ];
    }
}

module.exports = UrlsAsset;
