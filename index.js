module.exports = function (bundler) {
    bundler.addAssetType('urls', require.resolve('./UrlsAsset'));
    bundler.addPackager('urls', require.resolve('./UrlsPackager'));
    bundler.addPackager('json', require.resolve('./JSONPackager'));
};
