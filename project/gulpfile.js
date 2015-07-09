'use strict';
/*eslint-env node */
/*eslint-disable */

// Based on
// https://github.com/martinmicunda/employee-scheduling-ui/blob/master/gulpfile.js

//=============================================
//            PLUGIN REFERENCES
//=============================================
var gulp = require('gulp');
var concat = require('gulp-concat');


//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
  /**
   * The 'gulpfile' file is where our run tasks are hold.
   */
  gulpfile: 'gulpfile.js',

  test1: {
    concat: {
      sources: [ // order of these files is important as some functions depend on others.
        '../outerdata/test1/test1_UTF16LE.txt',
        '../outerdata/test1/test2_UTF16BE.txt',
        '../outerdata/test1/test3_UTF16LE.txt',
        '../outerdata/test1/test4_UTF16BE.txt',
      ],
      outfile: 'test1.txt',
      outpath: './'
    }
  },

  test2: {
    concat: {
      sources: [ // order of these files is important as some functions depend on others.
        '../outerdata/test2/test1_UTF16LE.txt',
        '../outerdata/test2/test2_UTF16LE.txt',
        '../outerdata/test2/test3_UTF16LE.txt',
        '../outerdata/test2/test4_UTF16LE.txt',
      ],
      outfile: 'test2.txt',
      outpath: './'
    }
  },
  test3: {
    concat: {
      sources: [ // order of these files is important as some functions depend on others.
        '../outerdata/test3/test1_UTF16BE.txt',
        '../outerdata/test3/test2_UTF16BE.txt',
        '../outerdata/test3/test3_UTF16BE.txt',
        '../outerdata/test3/test4_UTF16BE.txt',
      ],
      outfile: 'test3.txt',
      outpath: './'
    }
  },

  test4: {
    concat: {
      sources: [ // order of these files is important as some functions depend on others.
        './innerdata/test4/test1_UTF16LE.txt',
        './innerdata/test4/test2_UTF16BE.txt',
        './innerdata/test4/test3_UTF16LE.txt',
        './innerdata/test4/test4_UTF16BE.txt',
      ],
      outfile: 'test4.txt',
      outpath: './'
    }
  },

};


function printToConsole(chunk){
  var contents = chunk.contents.toString().trim();
  var bufLength = process.stdout.columns;
  var hr = '\n' + Array(bufLength).join("_") + '\n'
  if (contents.length > 1) {
      process.stdout.write(chunk.path + '\n' + contents + '\n');
      process.stdout.write(chunk.path + hr);
  }
}


gulp.task('test1', function(cb) {
  var test1 =  gulp.src(paths.test1.concat.sources)
    .pipe(concat(paths.test1.concat.outfile, {
      newLine: ';'
    }))
    .pipe(gulp.dest(paths.test1.concat.outpath));


    test1.on('data', printToConsole);

    cb();

});

gulp.task('test2', function(cb) {
  var test2 = gulp.src(paths.test2.concat.sources)
    .pipe(concat(paths.test2.concat.outfile, {
      newLine: ';'
    }))
    .pipe(gulp.dest(paths.test2.concat.outpath))
    test2.on('data', printToConsole);

    cb();

});

gulp.task('test3', function(cb) {
  var test3 = gulp.src(paths.test3.concat.sources)
    .pipe(concat(paths.test3.concat.outfile, {
      newLine: ';'
    }))
    .pipe(gulp.dest(paths.test3.concat.outpath))
    test3.on('data', printToConsole);
    cb();
});

gulp.task('test4', function(cb) {
  var test4 = gulp.src(paths.test4.concat.sources)
    .pipe(concat(paths.test4.concat.outfile, {
      newLine: ';'
    }))
    .pipe(gulp.dest(paths.test4.concat.outpath))
    test4.on('data', printToConsole);
    cb();
});


gulp.task('run', ['test1','test2','test3','test4']);
