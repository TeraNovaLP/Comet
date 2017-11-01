'use strict'

const gulp = require('gulp');
const ts = require("gulp-typescript");
const childProcess = require("child_process");
const electron = require("electron");
const builder = require("electron-builder");

const tsProject = ts.createProject("tsconfig.json");

gulp.task('start', ['compile', 'copy'], function() {
    childProcess.spawn(electron, ['app/main.js'], {
        stdio: 'inherit'
    })
    .on('close', function () {
        process.exit();
    });
})

gulp.task('build', ['compile', 'copy'], function() {
    builder.build();
})

gulp.task('compile', function() {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("app"));
})

gulp.task('copy', function() {
    return gulp.src(['src/**/*', '!src/**/*.ts']).pipe(gulp.dest('app'));
})
