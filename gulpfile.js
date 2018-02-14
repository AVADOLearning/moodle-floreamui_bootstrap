// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Bootstrap UI
 *
 * @author Luke Carrier <luke.carrier@avadolearning.com>
 * @copyright 2018 AVADO Learning
 */

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap-amd');

var BOOTSTRAP_MODULES = {
    alert: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'Alert'
    },

    button: {
        deps: ['jquery'],
        params: ['$'],
        exports: 'Button'
    },

    carousel: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'Carousel'
    },

    collapse: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'Collapse'
    },

    // Requires Popper
    dropdown: {
        deps: [],
        params: [],
        exports: ''
    },

    modal: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'Modal'
    },

    popover: {
        deps: [
            'jquery',
            'floreamui_bootstrap/tooltip'
        ],
        params: [
            '$',
            'Tooltip'
        ],
        exports: 'Popover'
    },

    scrollspy: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'ScrollSpy'
    },

    tab: {
        deps: [
            'jquery',
            'floreamui_bootstrap/util'
        ],
        params: [
            '$',
            'Util'
        ],
        exports: 'Tab'
    },

    // Requires Popper
    tooltip: {
        deps: [],
        params: [],
        exports: ''
    },

    util: {
        deps: ['jquery'],
        params: ['$'],
        exports: 'Util'
    }
};

(function() {
    Object.keys(BOOTSTRAP_MODULES).forEach(function(name) {
        var module = BOOTSTRAP_MODULES[name];
        gulp.task('bootstrap:' + name, function() {
            return gulp.src('./node_modules/bootstrap/js/dist/' + name + '.js')
                .pipe(wrap(module))
                .pipe(gulp.dest('./amd/src'));
        });
    });

    gulp.task('bootstrap', Object.keys(BOOTSTRAP_MODULES).map(function(name) {
        return 'bootstrap:' + name;
    }));
})();

gulp.task('js', ['bootstrap'], function() {
    return gulp.src('./amd/src/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('./amd/build'));
});

gulp.task('default', ['js']);
