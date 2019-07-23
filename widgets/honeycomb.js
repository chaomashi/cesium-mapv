/**
 *  蜂窝图
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/19:52
 */
define(['../core/MapVLayerProvider', 'mapv'], function (MapVLayerProvider, mapV) {
    // 生成随机点
    var layer;

    return {
        randomPoint: function () {

            function _random(t, e) {
                return Math.floor(Math.random() * (e - t + 1) + t) / 1e3;
            }

            return [_random(113e3, 119e3), _random(28e3, 35e3)]
        },

        destroy: function () {
            if(layer){
                layer.destroy();
            }
        },

        activate: function (viewer) {
            var _rectangle = [], data = [];
            for (var t = 300; t--;) {
                var randomPoint = this.randomPoint();
                _rectangle.push(Cesium.Cartesian3.fromDegrees(randomPoint[0], randomPoint[1]));
                data.push({
                    geometry: {type: "Point", coordinates: randomPoint}, count: 30 * Math.random()
                })
            }
            viewer.camera.flyTo({destination: Cesium.Rectangle.fromCartesianArray(_rectangle)});

            var options =  {
                fillStyle: "rgba(55, 50, 250, 0.8)",
                shadowColor: "rgba(255, 250, 50, 1)",
                shadowBlur: 20,
                max: 100,
                size: 50,
                label: {show: !0, fillStyle: "white"},
                globalAlpha: .5,
                gradient: {.25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", 1: "rgb(255,0,0)"},
                draw: "honeycomb"
            };

            layer = new MapVLayerProvider(viewer, new mapV.DataSet(data), options);

        }
    }
});