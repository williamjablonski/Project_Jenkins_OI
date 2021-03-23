const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])
gulp.task('deps.js', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'assets/js/jquery.bootstrap.js',
        'assets/js/material-bootstrap-wizard.js',
        'assets/js/jquery.validate.min.js',
        'node_modules/moment/moment.js',
        'node_modules/moment/locale/pt-br.js',
        'node_modules/moment-timezone/moment-timezone.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
        'node_modules/bootstrap-toggle/js/bootstrap-toggle.min.js',
        


    ]).pipe(uglify()).pipe(concat('deps.min.js')).pipe(gulp.dest('public/assets/js'))
})
gulp.task('deps.css', () => {
    return gulp.src(
        [
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'assets/css/material-bootstrap-wizard.css',
            'assets/css/custom.css',
            'node_modules/animate.css/animate.css',
            'node_modules/angular-toastr/dist/angular-toastr.min.css',
            'node_modules/bootstrap-toggle/css/bootstrap-toggle.min.css',
     
        

        ]).pipe(uglifycss({
            "uglyComments": true
        })).pipe(concat('deps.min.css')).pipe(gulp.dest('public/assets/css'))
})
gulp.task('deps.fonts', () => {
    return gulp.src(['node_modules/font-awesome/fonts/*.*']).pipe(gulp.dest('public/assets/fonts'))
})

