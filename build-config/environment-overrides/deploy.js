const path = require('path');
const projectDirectory = process.env.OLDPWD || path.normalize(process.env.INIT_CWD);
const buildFolder = 'build';

const deployOverrideConfig = {
    source: {
        sw: {
            path: path.resolve(projectDirectory, buildFolder, 'assets'),
            strip: path.resolve(projectDirectory, buildFolder)
        }
    },
    dest: {
        root: {
            path: './' + buildFolder
        },
        html: {
            path: '<%= root %>/html'
        },
        assets: {
            path: '<%= root %>/assets'
        },
        sw: {
            path: '<%= root %>'
        }
    }
}

module.exports = deployOverrideConfig;
