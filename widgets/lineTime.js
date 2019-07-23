/**
 *
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/19:53
 */
define(['../core/MapVLayerProvider', 'mapv'], function (MapVLayerProvider, mapV) {
    var layer;

    return {
        city: ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"],

        destroy: function () {
            if (layer) {
                layer.destroy();
            }
        },

        activate: function (viewer) {
            var data = [];
            for (var i = 1e3; i--;) {
                var cityCoord1 = mapV.utilCityCenter.getCenterByCityName(this.city[parseInt(Math.random() * this.city.length)]),
                    cityCoord2 = mapV.utilCityCenter.getCenterByCityName(this.city[parseInt(Math.random() * this.city.length)]);
                data.push({
                    geometry: {
                        type: "LineString",
                        coordinates: [[cityCoord1.lng - 1 + 1 * Math.random(), cityCoord1.lat - 1 + 1 * Math.random()],
                            [cityCoord2.lng - 1 + 1 * Math.random(), cityCoord2.lat - 1 + 1 * Math.random()]]
                    },
                    count: 30 * Math.random()
                })
            }
            var options = {
                gradient: {0: "blue", .5: "yellow", 1: "red"},
                lineWidth: .5,
                max: 30,
                draw: "intensity"
            };
            layer = new MapVLayerProvider(viewer, new mapV.DataSet(data), options)

        }
    }
});