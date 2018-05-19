# Parcel Plugin for Assets Manifest

This plugin adds a new asset file type handler `*.urls` which
reads a file of newline-separated file paths and adds them to the
parcel outputs.  Each file referenced in the list will be hashed
by parcel and copied to the output folder (e.g. `dist/`)

To use this plugin, install it into your parcel project:

    yarn add parcel-plugin-assets-list
    # or
    npm install parcel-plugin-assets-list

Then create an URLs file, for example a file `assets.urls`:

    # HTML templates
    templates/a.html
    templates/b.html

    # Stylesheets
    scss/styles.scss

    # Javascript
    js/whatever.js

## Server-side usage

To use the assets on the server side, pass the file directly to parcel
build / watch, e.g.

    parcel build assets.urls

Now you will get a file `assets.json` in the `dist` folder that you can
load on the server-side to calculate asset URLs.

## Client-side usage

To get asset URLs in client-side javascript, import the URLs as a
JavaScript module, e.g.

    import urls from './assets.urls'
    const templateUrl = urls['templates/a.html']

## Asset Processing

Note that the target assets are compiled by Parcel, so `.scss` files
will reference `.css` afterwards, `.json` files will end up references
a `.js` file, and so on.

## URL Prefix

If you pass `--public-url` that URL will be prefixed to the resolved
asset URLs.

## Example

The `example` folder has a sample project that shows how files
are processed and what the output files look like.

