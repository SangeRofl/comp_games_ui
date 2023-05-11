module.exports = function (grunt) {
    const computer_gameDirPath = './computer_game/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            computer_game: {
                src: [computer_gameDirPath + 'src/*.js'],
                dest: computer_gameDirPath + 'static/js/computer_game.js'
            },
        },
        copy: {
            computer_gameJs: {
                cwd: computer_gameDirPath + 'static/js/',
                src: 'computer_game.js',
                dest: clientJsDirPath + 'computer_game/',
                expand: true,
                flatten: true
            },
            computer_gameCss: {
                cwd: computer_gameDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            computer_gameHtml: {
                cwd: computer_gameDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            computer_gameImg: {
                cwd: computer_gameDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'computer_game/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            computer_gameJs: {
                files: computer_gameDirPath + 'src/**',
                tasks: ['concat:computer_game', 'copy:computer_gameJs'],
            },
            computer_gameCss: {
                files: computer_gameDirPath + 'static/css/**',
                tasks: ['copy:computer_gameCss'],
            },
            computer_gameHtml: {
                files: [computer_gameDirPath + 'static/html/**'],
                tasks: ['copy:computer_gameHtml'],
            },
            computer_gameImg: {
                files: [computer_gameDirPath + 'static/images/**'],
                tasks: ['copy:computer_gameImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
