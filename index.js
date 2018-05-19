module.exports = function (bundler) {
    bundler.addAssetType('urls', require.resolve('./UrlsAsset'));
};
