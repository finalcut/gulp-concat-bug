# Installation
1. pull this repo
2. go to the gulp-concat-bug/project directory
3. run `npm install`

# Execution
1. go to the gulp-concat-bug/project directory
2. execute: `gulp run`

This will create five text files in the ./project directory:

test 1, 2, and 3 files are from the gulp-concat-bug/outerdata directory and it's sub
directories.

test 4 files are from the gulp-concat-bug/innerdata directory.  I include both inner and outer
to show that the bug doesn't care where the files are relative to the gulpfile.  Finally,
I have test 5 which uses UTF 8 files (the rest all use some variation of UTF 16)

# Whats the Problem?
If, after running the tests you look in the five test result files

  * gulp-concat-bug/project/test1.text ... text5.txt

  **NOTE** if you dont want to run the test look in gulp-concat-bug/project/samples
  for example test result files

You will should see some unusual characters (if your a native English speaker).
These characters are not in any of the source files.


test1.txt and test4.txt are the closest to what you might expect but the newLine
character between data from the 2nd file and the 3rd file has been munged.

test2.txt and test3.txt are the ones I thought would work properly since all
four input files are encoded the same way (test2 all are UTF 16 LE, test 3 all
  are UTF 16 BE).  However, they are the most munged with the inputs from files
  2 and 4 both being completely messed up.

test5.txt does work properly. In this case all four files are encoded as UTF-8.

# Applicable to:
I've only tried this on 64bit Windows 7 professional. Using the following:

* gulp-concat versions: 2.4.3, 2.5.2, and 2.6.0  this demo is hard-coded to 2.6.0
* gulp 3.9.0

Initially all of my test files were created using windows explorer which seems to create
them in UTF 16 LE by defaut.


# Notes
You'll notice I'm also dumping the chunks being read in out to the console. In all
four tests everything seems to be fine.  I do not know if the problem being
exhibited is in gulp-concat or in gulp.dest but concat seems the more likely candidate
because of the way the bogus characters are interleaved with the valid ones.

I suspect that the concat is overlaying the end of one string on the beginning of
another thus corrupting one of them.


# Interesting Tidbits

* problem is only visible when viewing file in editors such as "notepad", "editplus"
and SublimeText3 (stable channel, build 3083)
* problem is not as visible in Atom (1.0.2) which seems to open the test files in UTF-8.
however if I tell any other editor listed to use UTF-8 encoding when opening
the file the file is even more munged.
* atom does show some excess newlines in the resultant files; but it also loads the source
files as "UTF-8" even though they are saved as UTF-16 for the most part.
* in editplus the file doesn't have the chinese character, instead there is a character
between every space
* if you look at the result files on github via a browser they look **perfect**.
* in atom, the text is valid, but there are additional new lines in the resultant file.
* I discovered this behavior after creating a bunch of .sql files from SQL Server Management Studio 2014
by having it script creation of various user defined functions.  When I tried to concat them in a specific
order the resultant file was not usable.  The files were created, by default, as UTF 16 LE.


# Other thoughts
A friend tried this on Mac OSX and he had a similar experience when opening the result files in VIM; they were
pretty beat up.  Atom on the Mac looked the same as well - mostly correct but some extra blank lines.