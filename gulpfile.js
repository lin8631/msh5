var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');
var exportui = require('./tools/uitool').exportui;
var packres = require('./tools/uitool').packres;
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var genhtml = require('./tools/genhtml');
var minimist = require('minimist');
var fs = require("fs");
var gulputil = require('gulp-util');
var mergeStream = require('merge-stream');
var run = require('gulp-run-command').default;

var globDevelopmentFiles = [
    'typings/**/*.d.ts',
    'libs/**/*.ts',
    'src/core/ui/*.ts',
    'src/ui/**/*.ts',
    'src/utils/**/*.ts',
    'src/core/**/*.ts',
    'src/gameui/**/*.ts',
    'src/**/*.ts',
    '!src/ToolsEntry.ts'
];

var globReleaseFiles = [
    'typings/**/*.d.ts',
    'libs/**/*.ts',
    'src/core/ui/*.ts',
    'src/ui/**/*.ts',
    'src/utils/**/*.ts',
    'src/core/**/*.ts',
    'src/gameui/**/*.ts',
    'src/**/*.ts',
    '!src/ToolsEntry.ts',
    '!src/tools/**/*.ts',
];

var globToolsFiles = [
    'typings/**/*.d.ts',
    'libs/**/*.ts',
    'src/core/ui/*.ts',
    'src/ui/**/*.ts',
    'src/utils/**/*.ts',
    'src/core/**/*.ts',
    'src/gameui/**/*.ts',
    'src/**/*.ts',
    '!src/MainEntry.ts'
];

var knownOptions = {
  string: 'ver',
};

var options = minimist(process.argv.slice(2), knownOptions);

var tsProject = ts.createProject('tsconfig.json');

function getVerStr(){
	var fileContent = fs.readFileSync("bin/ver.js", "utf8");
	var ver= fileContent.match( /ver:"[\d.]+"/gi)[0].replace(/[^0-9.]/ig,"").replace(/[.]/ig,"");
	return ver;
}

gulp.task('clean', function() {
    return gulp.src('bin', {read: false})
        .pipe(clean());
});


gulp.task('compile', function() {
    return gulp.src(globDevelopmentFiles)
        .pipe(sourcemaps.init({charset: 'utf-8'}))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('bin/js'))
});

gulp.task('compilenomap', function() {

    if(!options.ver){
        return gulp.src(globDevelopmentFiles)
            .pipe(tsProject()).js
            .pipe(gulp.dest('bin/js'))
    }else{
        return gulp.src(globReleaseFiles)
            .pipe(tsProject()).js
            .pipe(gulp.dest('bin/js'))
    }
});

// 开发工具相关
gulp.task('toolscompile', function() {
    return gulp.src(globToolsFiles)
        .pipe(sourcemaps.init({charset: 'utf-8'}))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('bin/js'))
});

gulp.task('watch', function() {
    gulp.watch(globDevelopmentFiles, ['compile']);
    gulp.watch(['laya/pages/**/*.ui'], ['exportui']);
});

// 开发工具相关
gulp.task('toolswatch', function() {
    gulp.watch(globToolsFiles, ['toolscompile']);
    gulp.watch(['laya/pages/**/*.ui'], ['exportui']);
});

gulp.task('exportui', function() {
    exportui();
});

gulp.task('packres', function() {
    var version = getVerStr();
    packres({ver:version});
});

gulp.task('uglify', function() {
    return gulp.src(['bin/js/**/*.js'])
        .pipe(uglify('game.min.js', {
            // outSourceMap: true,
            // mangle: true,
            output: {
                beautify: false
            }
        }))
        .pipe(gulp.dest('bin/js'));
});

gulp.task('uglifylib', function() {
    return gulp.src(['bin/libs/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('bin/libs'));
});

// Deploy external assets,ignore development resources. //
gulp.task('assetsrelcopy', function() {
    return gulp.src('assets/rel/**/*')
        .pipe(gulp.dest('bin/res'+getVerStr()));
});

// Deploy external assets with development resources included. //
gulp.task('assetscopy', function() {
    var _globFiles = [
        'assets/rel/**/*',
    ];
    return gulp.src(_globFiles)
        .pipe(gulp.dest('bin/res'+getVerStr()));
});

gulp.task('ln', run('./ln.sh'));

// Deploy engine runtime library and other infrastructure files.
gulp.task('runtimecopy', function () {
    var _globFiles = [
        'libs/**/*',
        'favicon.ico',
        'app.js',
        'ver.js',
        'index.html',
        'redirect.html',
    ].map(item => { return 'templates/' + item; });

    return gulp.src(_globFiles, {base: 'templates'})
        .pipe(gulp.dest('bin'));
});

// 开发工具相关
gulp.task('toolsruntimecopy', function () {
    var _globFiles = [
            'libs/**/*',
            'favicon.ico',
            'app.js',
            'ver.js',
        ].map(item => { return 'templates/' + item; });

    var toolsFiles = [
            'adf.html',
            'br.html',
            'cfx.html',
            'ptc.html',
        ].map(item => { return 'templates/tools/' + item; });

    mergeStream(gulp.src(_globFiles, {base: 'templates'}), gulp.src(toolsFiles, {base: 'templates/tools'}))
        .pipe(gulp.dest('bin'));
});

gulp.task('changeVersion', function() {
	if(!options.ver){
		console.log("option --ver not found. Use 0.0.1 as default");
        options.ver = "0.0.1"
	}
  	var fileContent = fs.readFileSync("bin/ver.js", "utf8");
 	var newVer = 'ver:"'+options.ver+'"';
 	fileContent = fileContent.replace( /ver:"[\d.]+"/gi,newVer)

	fs.writeFileSync('bin/ver.js', fileContent);
});

gulp.task('changeHTMLVersion', function() {

    var fileContent = fs.readFileSync("bin/index.html", "utf8");
    var newVer = getVerStr()+'.js';
    fileContent = fileContent.replace("game.min.js",'game.'+newVer);
    fileContent = fileContent.replace("ver.js",'ver.'+newVer);
    fs.writeFileSync('bin/index.html', fileContent);

    fs.rename("bin/js/game.min.js",'bin/js/game.'+newVer);
    fs.rename("bin/ver.js",'bin/ver.'+newVer);

});


gulp.task('serve', ['runtimecopy', 'packres', 'exportui', 'compile', 'watch'], function() {
    var listeningPort = 3000;
    browserSync({
        port: listeningPort,
        files: ['bin/index.html', 'bin/js/**/*.js', 'bin/app.js'],
        injectChanges: false,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: '',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './bin',
            middleware: superstatic({ debug: false})
        },
        open: false
    });
    gulputil.log('Open http://localhost:'+String(listeningPort)+" in your browser manually,please.");
});

gulp.task('start', [], function() {
    var listeningPort = 3000;
    browserSync({
        port: listeningPort,
        files: ['bin/index.html', 'bin/js/**/*.js', 'bin/app.js'],
        injectChanges: false,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: '',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './bin',
            middleware: superstatic({ debug: false})
        },
        open: false
    });
    gulputil.log('Open http://localhost:'+String(listeningPort)+" in your browser manually,please.");
});

gulp.task('fabu', function(cb) {
    runSequence('compilenomap', 'uglify', 'uglifylib');
});

// 开发工具相关
gulp.task('toolsserve', ['toolsruntimecopy', 'assetscopy', 'packres', 'exportui', 'toolscompile', 'toolswatch'], function() {
    var listeningPort = 3000;
    browserSync({
        port: listeningPort,
        files: ['bin/index.html', 'bin/js/**/*.js', 'bin/app.js'],
        injectChanges: false,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: '',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './bin',
            middleware: superstatic({ debug: false})
        },
        open: false
    });
    gulputil.log('Open http://localhost:'+String(listeningPort)+" in your browser manually,please.");
});

gulp.task('genapi', function() {
    var protoPath = '../proto/';
    var genapi = require('./tools/genapi/index');
    var path = require('path');
    genapi(path.join(protoPath, "*.proto"), './src/core/net');
});

gulp.task('build', function(cb) {
    runSequence('runtimecopy', 'packres', 'exportui','ln', 'compile');
});
gulp.task('release', function(cb) {
    runSequence('clean', 'runtimecopy','changeVersion', 'assetscopy','packres', 'exportui', 'compilenomap', 'uglify', 'uglifylib', 'changeHTMLVersion');
});
gulp.task('ec', function(cb) {
    runSequence('exportui', 'compile');
});

// 开发工具相关
gulp.task('toolsbuild', function(cb) {
    runSequence('toolsruntimecopy', 'assetscopy', 'packres', 'exportui', 'toolscompile');
});

gulp.task('default', ['build']);
