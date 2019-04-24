## 1.7.1 (2019-04-24)

Change the way classes are imported from `parcel-bundler` to hopefully
work better if `parcel-bundler` is installed globally instead of locally
in `mode_modules`.


## 1.7.0 (2018-10-20)

Remove the workaround to try to ensure the hash in the filename updates
based on changes to referenced files.  It was buggy.

This means that if you using urls files that have a hash in their name,
the filename might not update even if a filename inside the file changes.

This could be considered a bug/issue in parcel itself, 
see https://github.com/parcel-bundler/parcel/issues/1481

## 1.6.0 (2018-10-19)

- Update to `parcel-bundler@1.10.3`
- Fix an issue where workers created for hash calculation were not stopped 

## 1.5.0 (2018-06-05)

Calculate and insert a hash of referenced assets into the output to
ensure parcel uses a new file has for the generated bundle if assets
have changed.

## 1.4.0 (2018-05-28)

Add urls and json packagers to merge urls lists into a bundle if
indicated.

## 1.3.0 (2018-05-19)

Add support for custom keys per path.

## 1.2.0 (2018-05-18)

Change file extension to .urls instead of .assets

## 1.1.0 (2018-05-19)

Apply --public-url option to asset URLs in the output.



