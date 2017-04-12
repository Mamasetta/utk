var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	minifyCss = require('gulp-minify-css'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	spritesmith = require('gulp.spritesmith'),
	svgSprite = require('gulp-svg-sprite'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

//+-----------------------------------------------------------------+//

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        sprite: 'build/images/sprites/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/styles/styles.less',
        img: 'src/images/**/*.*',
        spriteSvg: 'src/images/svg/*.*',
        styleSvg: 'src/styles/spritesvg.less',
        sprite: 'src/images/sprites/*.*',
        styleSprite: 'src/styles/',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.less',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};


//+-----------------------------------------------------------------+//

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 8088
};

//+-----------------------------------------------------------------+//


gulp.task('serve', ['watch'], function (){
	browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less({
            includePaths: ['src/styles/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('spritesvg', function () {
    return gulp.src('src/images/svg/*.svg')
        .pipe(svgSprite({
        	svg: {
        	    sprite: "../images/sprite.svg"
        	},
            layout: 'diagonal',
        	selector: "i_%f",
        	preview: true,
            shape: {
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    dest: '.',
                    layout: "horizontal",
                    sprite: '../images/sprites/spritesvg.svg',
                    bust: false,
                    render: {
                        less: {
                            dest: '../../src/styles/spritesvg.less'
                        },
                    }
                },
                view: {
                    layout: "horizontal"
                }
            }
        }))
        .pipe(gulp.dest("build/images/"));
});

gulp.task('spritepng', function() {
    var spriteData =
        gulp.src(path.src.sprite) // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: '../sprites/sprite.png',
                cssName: 'spritepng.less',
                imgPath: '../images/sprites/sprite.png',
                algorithm: 'alt-diagonal'
            }));

    spriteData.img.pipe(gulp.dest(path.build.sprite)); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(path.src.styleSprite)); // путь, куда сохраняем стили
});


//+----------------------------------------------------------------+//

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'spritesvg',
    'spritepng'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('spritepng');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('spritesvg');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'serve', 'watch']);


//+----------------------------------------------------------------+//

//gulp.task('build', ['html', 'style', 'less', 'img', 'fonts', 'js', 'css']);
