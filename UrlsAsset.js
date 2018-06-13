const Asset = require('parcel-bundler/src/Asset');
const Bundler = require('parcel-bundler');
const crypto = require('crypto');
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
        // Calculate a hash if necessary.
        if (this.options.contentHash && !(this.options.entryFiles.length === 1 && this.options.entryFiles[0] === this.name)) {
            // Run a build of the referenced assets and then look at the hashes of the build results.
            // Kind of a nasty hack but there's no better & reliable way to determine the actual hashes of the files
            // we depend on, and we need to put some hash of that into our output so that parcel will recognize that
            // our file hash will be different when the final filenames are substituted into our output.
            const options = Object.assign({}, this.options, {
                watch: false,
                killWorkers: false,
                detailedReport: false,
            });
            const bundler = new Bundler([this.name], options);
            await bundler.bundle();
            if(bundler.bundleHashes) {
                const md5 = crypto.createHash('md5');
                bundler.bundleHashes.forEach(hash => {
                    md5.update(hash);
                });
                this.ast[`#${this.relativeName}#`] = md5.digest('hex');
            }
        }

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
