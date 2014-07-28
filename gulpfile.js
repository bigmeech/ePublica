var gulp                    = require("gulp"),
    gulpStylus              = require("gulp-stylus"),
    gulpComponent           = require("gulp-component"),
    componentStylus         = require("component-stylus");
    gulpKarma               = require("gulp-karma");
    liveReload              = require("gulp-livereload");
    gulpNode                = require("gulp-nodemon");
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
        //.pipe(liveReload())
});

//builds application components together from various angularjs components into a final build.js file
gulp.task("build:component-scripts", function(){
    gulp.src('component.json')
        .pipe(gulpComponent.scripts({
            standalone:true
        }))
        .pipe(gulp.dest('public/build'))
        //.pipe(liveReload())
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

/**
 *
 TODO: Get a social life
 *
 **/
gulp.task("run:node",function(){
    gulpNode({
        script:'backend.js',
        ignore:['./bin','./build','./components','./public/lib','./node_modules'],
        ext:'js',
        env:{
            'NODE_ENV':'development'
        }
    })
    .on('start',['watch'])
    .on('change',['watch'])
    .on('restart',function(){
        process.once('SIGUSR2', function(){
            process.kill(process.id,'SIGUSR2');
        })
    });
})
//sets up styls, scripts and testpects for watch
gulp.task('watch', function(){
    //gulp.watch(['component.json','lib/**/*.js'],{ maxListerners:999 },['build:component-scripts']);
    //gulp.watch(['component.json','lib/**/*.styl'], { maxListerners:999 }, ['build:component-styles']);
    //gulp.watch(['lib/**/*.js'],['run:node'])
});

/*//report error if any
gulp.task('errors',function(){
    gulp.src('.css/errors.styl')
        .pipe(gulpStylus({errors:true}))
        .pipe(gulp.dest('./css'));
})*/

gulp.task("default", ['run:node','run:karma']);