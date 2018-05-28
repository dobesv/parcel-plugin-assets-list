const Packager = require('parcel-bundler/src/packagers/Packager');

class UrlsPackager extends Packager {

    addAsset(asset) {
        return this.write(asset.generated.urls);
    }

}

module.exports = UrlsPackager;
