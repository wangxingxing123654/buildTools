// 加载gulp
var gulp = require('gulp');
// 加载htmlmin的插件
var htmlmin = require('gulp-htmlmin');
// 加载压缩js的文件
var uglify = require('gulp-uglify');
// 加载压缩css的文件
var cleanCss = require('gulp-clean-css');
// 合并文件的插件
var concat = require('gulp-concat');
// 加载修改文件名的插件
var rename = require('gulp-rename');
// 加载编译less的插件
var less = require('gulp-less');


// 编译less,压缩编译后的结果
gulp.task('less', function() {
        gulp.src('src/less/*.less')
            .pipe(less())
            .pipe(cleanCss())
            .pipe(rename({
                suffix: '.min.css'
            }))
            .pipe(gulp.dest('dist/css'));
    })
    // 压缩html
gulp.task('html', function() {
        gulp.src('src/**/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
            }))
            .pipe(gulp.dest('dist/html'));
    })
    // 压缩js
gulp.task('js', function() {
        gulp.src('src/js/*.js')
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('dist/js'));
    })
    // 默认任务
gulp.task('default', function() {
    gulp.run(['html', 'less', 'js']);
    // 监听文件变化。
    gulp.watch('src/less/*.less', function() {
        gulp.run('less');
    });
    gulp.watch('src/js/*.js', function() {
        gulp.run('js');
    });
    gulp.watch('src/**/*.html', function() {
        gulp.run('html');
    })
})