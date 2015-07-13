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
      outpath: './results1/'
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
      outpath: './results2/'
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
      outpath: './results3/'
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
      outpath: './results4/'
    }
  },

  test5: {
    concat: {
      sources: [ // order of these files is important as some functions depend on others.
        './innerdata/test5/test1_UTF8.txt',
        './innerdata/test5/test2_UTF8.txt',
        './innerdata/test5/test3_UTF8.txt',
        './innerdata/test5/test4_UTF8.txt',
      ],
      outfile: 'test5.txt',
      outpath: './results5/'
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


function runConcatTest(d){
  var testResults =  gulp.src(d.sources)
    .pipe(concat(d.outfile, { newLine: ';' }))
    .pipe(gulp.dest(d.outpath));
    testResults.on('data', printToConsole);
}
function runNonConcatTest(d){
  for(var i=0; i<d.sources.length; i++){
    gulp.src(d.sources[i])
      .pipe(gulp.dest(d.outpath));
  }
}


gulp.task('test1', function(cb) {
  runConcatTest(paths.test1.concat);
  runNonConcatTest(paths.test1.concat);
  cb();
});

gulp.task('test2', function(cb) {
  runConcatTest(paths.test2.concat);
  runNonConcatTest(paths.test2.concat);
  cb();
});

gulp.task('test3', function(cb) {
  runConcatTest(paths.test3.concat);
  runNonConcatTest(paths.test3.concat);
  cb();
});

gulp.task('test4', function(cb) {
  runConcatTest(paths.test4.concat);
  runNonConcatTest(paths.test4.concat);
  cb();
});

gulp.task('test5', function(cb) {
  runConcatTest(paths.test5.concat);
  runNonConcatTest(paths.test5.concat);
  cb();
});

gulp.task('run', ['test1','test2','test3','test4','test5']);
