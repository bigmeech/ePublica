var gulp = require("gulp");
var paths = {
    scripts:["lib/*.css"]
}

gulp.task("watch", function(){
    gulp.watch(paths.scripts)
});

gulp.task("default",['watch']);