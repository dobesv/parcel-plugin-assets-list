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

## Custom keys

By default the key in the generated mapping is the filename listed
in the file.  However, you can specify a specific key using a
`<key>: <path>` format in the source file, e.g.

    # assets.urls
    templateUrl: templates/a.html

This makes importing the asset paths from JavaScript much more
convenient:

    # component.js
    import { templateUrl } from 'assets.urls';

## Asset Processing

Note that the target assets are compiled by Parcel, so `.scss` files
will reference `.css` afterwards, `.json` files will end up references
a `.js` file, and so on.

## Asset Bundling

Note that if you import a `.urls` file in JavaScript, parcel may
"package" the generated JavaScript module AND the generated urls and
json files into one file.  Instead of a set of files per input `urls`
file you get a single urls and json file output with a hash in the name
with everything merged into one file.

Thus if you want to use the generated `json` or `urls` files you should
reference them as entry points (on the parcel command line) or from a
`urls` file that is an entry point.

## URL Prefix

If you pass `--public-url` that URL will be prefixed to the resolved
asset URLs.

## Example

The `example` folder has a sample project that shows how files
are processed and what the output files look like.

## Known Issues

Due to a limitation or bug in parcel, filename hashes are not reliably
updated when dependencies of that file are changed.

A file will be updated to reference the new filenames, but its own 
filename hash does not change.  So browser clients might have a stale 
version of the file and not see the new changes.

See https://github.com/parcel-bundler/parcel/issues/1481

For this reason importing the outputs of this plugin in js files
isn't safe if you are relying on filename hashes for cache-busting.
