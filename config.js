/**
 *
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/15:48
 */

var root = "/" + window.location.pathname.split("/")[1];

require.config({
    baseUrl: "/global_mapv",
    waitSeconds: 200,
    optimizeCss: 'standard',
    paths: {
        knockout: './tp/knockout/knockout',
        Cesium: './tp/Cesium/Build/Cesium/Cesium',
        Config: './core/Config',
        EventBus: './core/EventBus',
        jquery: './tp/jquery/jquery-3.4.1.min',
        mapv: './tp/mapV/mapv',
        MapVLayerProvider: './core/MapVLayerProvider',
    },
    shim: {
        Cesium: {
            exports: 'Cesium'
        }
    },
    map: {
        '*': {
            text: '/tp/require-plugins/text.js',
            css: '/tp/require-plugins/css.min.js',
        }
    }
});