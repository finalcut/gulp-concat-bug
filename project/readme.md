# installation
1. pull this repo
2. go to the gulp-concat-bug/project directory
3. run `npm install`

# execution
1. go to the gulp-concat-bug/project directory
2. execute: `gulp run`

This will create four text files in the ./project directory:

test 1, 2, and 3 files are from the gulp-concat-bug/outerdata directory and it's sub
directories.

test 4 files are from the gulp-concat-bug/innerdata directory.  I include both
to show that the bug doesn't care where the files are relative to the gulpfile.

# Whats the Problem?
If, after running the tests you look in the four test result files

  * gulp-concat-bug/project/test1.text ... text4.txt

You will should see some unusual characters (if your a native English speaker).
These characters are not in any of the source files.


test1.txt and test4.txt are the closest to what you might expect but the newLine
character between data from the 2nd file and the 3rd file has been munged.

test2.txt and test3.txt are the ones I thought would work properly since all
four input files are encoded the same way (test2 all are UTF 16 LE, test 3 all
  are UTF 16 BE).  However, they are the most munged with the inputs from files
  2 and 4 both being completely messed up.


# Applicable to:
I've only tried this on 64bit Windows 7 professional. Using the following:

* gulp-concat versions: 2.4.3, 2.5.2, and 2.6.0  this demo is hard-coded to 2.6.0
* gulp 3.9.0


# Notes
You'll notice I'm also dumping the chunks being read in out to the console. In all
four tests everything seems to be fine.  I do not know if the problem being
exhibited is in gulp-concat or in gulp.dest but concat seems the more likely candidate
because of the way the bogus characters are interleaved with the valid ones.

I suspect that the concat is overlaying the end of one string on the beginning of
another thus corrupting one of them.
