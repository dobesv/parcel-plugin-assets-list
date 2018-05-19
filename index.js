const logger = require('parcel-bundler/src/Logger');

module.exports = function (bundler) {
    bundler.addAssetType('assets', require.resolve('./AssetListAsset'));
};
