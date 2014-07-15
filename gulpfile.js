var gulp                    = require("gulp"),
    gulpStylus              = require("gulp-stylus"),
    gulpComponent           = require("gulp-component"),
    gulpComponentStylus     = require("component-stylus-plugin");
    gulpKarma               = require("gulp-karma")
    karmaFiles              = [ "/lib/angular-1.2.9.js",
                                "/lib/angular-mock-1.2.9.js",
                                "/public/build/build.js",
                                "/lib/editor/test/*"]


gulp.task("build:component-styles", function(){
    gulp.src('component.json')
        .pipe(gulpComponent.styles({
            configure:function(builder){
                builder.use(gulpComponentStylus);
            }
        }))
        .pipe(gulp.dest('public/build'));
});

gulp.task("build:component-scripts", function(){
    gulp.src('component.json')
        .pipe(gulpComponent.scripts({
            standalone:true
        }))
        .pipe(gulp.dest('public/build'));
});

gulp.task("run:karma", function(){
    return gulp.src(karmaFiles)
        .pipe(gulpKarma({
            configFile:'karma.conf.js',
            action:'run'
        }))
        .on('error',function(err){
            throw error;
        })
});

gulp.task('watch',function(){

})

gulp.task("default", ['build:component-styles','build:component-scripts','run:karma']);