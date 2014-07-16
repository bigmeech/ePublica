var gulp                    = require("gulp"),
    gulpStylus              = require("gulp-stylus"),
    gulpComponent           = require("gulp-component"),
    componentStylus         = require("component-stylus");
    gulpKarma               = require("gulp-karma");
    liveReload              = require("gulp-livereload");
    karmaFiles              = [ "/lib/angular-1.2.9.js",
                                "/lib/angular-mock-1.2.9.js",
                                "/public/build/build.js",
                                "/lib/editor/test/*"]


//builds application styles from various stylus templates into a final build.css
gulp.task("build:component-styles", function(){
    gulp.src('component.json')
        .pipe(gulpComponent.styles({
            configure:function(builder){
                builder.use(componentStylus);
            },
            out:'public/build'
        }))
        .pipe(gulp.dest('public/build'))
        .pipe(liveReload())
});

//builds application components together from various angularjs components into a final build.js file
gulp.task("build:component-scripts", function(){
    gulp.src('component.json')
        .pipe(gulpComponent.scripts({
            standalone:true
        }))
        .pipe(gulp.dest('public/build'))
        .pipe(liveReload())
});

//runs karma using phantomjs as browser . See karma.conf file
gulp.task("run:karma", function(){
    return gulp.src(karmaFiles)
        .pipe(gulpKarma({
            configFile:'karma.conf.js',
            action:'run'
        }))
        .on('error',function(err){
            throw err;
        })
});

//sets up styls, scripts and testpects for watch
gulp.task('watch', function(){
    gulp.watch(['component.json','lib/**/*.js'],['build:component-scripts']);
    gulp.watch(['component.json','lib/**/*.styl'],['build:component-styles']);
});

//report error if any
gulp.task('errors',function(){
    gulp.src('.css/errors.styl')
        .pipe(gulpStylus({errors:true}))
        .pipe(gulp.dest('./css'));
})

gulp.task("default", ['build:component-styles','build:component-scripts','run:karma','watch']);