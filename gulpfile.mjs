import gulp from 'gulp';
import gulpZip from 'gulp-zip';
import { mkdirp } from 'mkdirp';
import { rimraf } from 'rimraf';  // Correct named import for rimraf

// Paths to the common files and destination folders
const paths = {
  common: 'common/**/*',                  // All files in the common directory
  icons: 'common/icons/*',                // Icons only
  chrome: 'dist/chrome/',                 // Chrome dist folder
  firefox: 'dist/firefox/',               // Firefox dist folder
  chromeFiles: ['chrome/manifest.json'],   // Chrome-specific manifest
  firefoxFiles: ['firefox/manifest.json']  // Firefox-specific manifest
};

// Clean task to remove dist directory before build
export const clean = () => {
  return rimraf('dist');  // Return a promise to remove the dist folder
};

// Create directories if they don't exist, using a promise to ensure directories are created before moving on
export const createDirs = () => {
  return Promise.all([mkdirp(paths.chrome), mkdirp(paths.firefox)]);
};

// Copy common files (e.g., JS, HTML, icons) into Chrome dist
export const copyChrome = () => {
  return gulp.src([...paths.chromeFiles, paths.common])  // Copy Chrome manifest + common files
    .pipe(gulp.dest(paths.chrome));
};

// Copy common files (e.g., JS, HTML, icons) into Firefox dist
export const copyFirefox = () => {
  return gulp.src([...paths.firefoxFiles, paths.common])  // Copy Firefox manifest + common files
    .pipe(gulp.dest(paths.firefox));
};

// Zip the Chrome extension
export const zipChrome = () => {
  return gulp.src(paths.chrome + '**/*')
    .pipe(gulpZip('chrome-extension.zip'))
    .pipe(gulp.dest('dist'));
};

// Zip the Firefox extension
export const zipFirefox = () => {
  return gulp.src(paths.firefox + '**/*')
    .pipe(gulpZip('firefox-extension.zip'))
    .pipe(gulp.dest('dist'));
};

// Build task to clean, create directories, copy files, and zip the files
export const build = gulp.series(
  clean,              // Clean the dist directory first
  createDirs,         // Ensure directories are created
  copyChrome,         // Copy Chrome files
  copyFirefox,        // Copy Firefox files
  gulp.parallel(zipChrome, zipFirefox)  // Zip the files for both browsers
);

export default build;
