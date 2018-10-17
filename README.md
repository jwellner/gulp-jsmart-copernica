# gulp-jsmart-copernica
> Parse smarty templates with copernica data

## Usage

First, install `gulp-jsmart-copernica` as a development dependency:

```shell
npm install --save git@github.com:jwellner/gulp-jsmart-copernica.git
```

Then, add it to your `gulpfile.js`:

### Simple string replace
```javascript
var copernica = require('gulp-jsmart-copernica');

gulp.task('templates', function(){
  gulp.src(['file.smarty.html'])
    .pipe(copernica())
    .pipe(gulp.dest('build/'));
});
```
