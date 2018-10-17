# gulp-jsmart-copernica
> Parse smarty templates with copernica data

## Usage

First, install `gulp-jsmart-copernica` as a development dependency:

```shell
npm install --save-dev gulp-jsmart-copernica
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
