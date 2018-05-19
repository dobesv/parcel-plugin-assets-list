# Parcel Plugin for Assets Manifest

This plugin adds a new asset file type handler `*.assets` which
reads a file of newline-separated file paths and adds them to the
parcel outputs.  Each file referenced in the list will be hashed
by parcel and copied to the output folder (e.g. `dist/`)

To use this plugin, install it into your parcel project:

    yarn add parcel-plugin-assets-list
    # or
    npm install parcel-plugin-assets-list

Then create an assets file, for example a file `app.assets`:

    # HTML templates
    templates/a.html
    templates/b.html

    # Stylesheets
    scss/styles.scss

    # Javascript
    js/whatever.js

Now when you build with parcel it will copy those files into `dist`
with a hashed name.  In addition it will store the mapping of those
files from the original name to the new name in a few ways:

* `app.js`: A javascript module you can import from your js files to
  get a javascript object mapping the name in the file to the resulting
  hashed filename
* `app.json`: A JSON file with the same mapping as above but in raw JSON,
  for consumption on the server side if you don't use JavaScript on the
  server.
* `app.assets`: A simple text-based file format with the original file
  path, a colon, a space (`:`) and the output path.  Could be used
  instead of JSON if you like.

The actual files written depends on the input file name.  If the assets
file was referenced from another file rather than passed on the command
line it'll have a hashed name like any other asset.

Note that if you pass `--public-url` that URL will be added to the
resolved asset URLs.


