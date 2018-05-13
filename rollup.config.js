import buble from 'rollup-plugin-buble';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue';
import nodeGlobals from 'rollup-plugin-node-globals';
import bubleConfig from './config/buble.config.js';

export default {
    entry: 'src/index.js',
    dest: 'dist/vue-nested-menu.js',
    format: 'umd',
    moduleName: 'VueNestedMenu',
    sourceMap: false,
    useStrict: false,
    plugins: [
        vue({ css: true, }),
        buble(bubleConfig),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        nodeGlobals(),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
};
