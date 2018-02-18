"use strict"

const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const childProcess = require("child_process");
const electron = require("electron");
const builder = require("electron-builder");
const runSeq = require("run-sequence");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("start", function(callback) {
    runSeq("compile", "copy", "run", callback);
})

gulp.task("run", function(callback) {
    childProcess.spawn(electron, ["app/main.js"], {
        stdio: "inherit"
    })
    .on("close", function () {
        callback();
    })
})

gulp.task("runBuild", function(callback) {
    builder.build();
    callback();
})

gulp.task("build", function(callback) {
    runSeq("compile", "copy", "runBuild", callback)
})

gulp.task("cbuild", function(callback) {
    runSeq("clean", "compile", "copy", "runBuild", callback);
})

gulp.task("compile", function(callback) {
    tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("app"));
    callback();
})

gulp.task("copy", function(callback) {
    gulp.src(["src/**/*", "!src/**/*.ts"]).pipe(gulp.dest("app"));
    callback();
})

gulp.task("clean", function(callback) {
    del("app/**/*");
    del("dist/**/*");
    callback();
})
