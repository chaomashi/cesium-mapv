/**
 *
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/19:54
 */
define(['../core/MapVLayerProvider', 'mapv'], function (MapVLayerProvider, mapV) {
    var layer;

    return {
        citys: ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"],

        destroy: function () {
            if (layer) {
                layer.destroy();
            }
        },

        activate: function (viewer) {
            var randomCount = 1000, data = [];
            while (randomCount--) {
                var cityCenter = mapV.utilCityCenter.getCenterByCityName(this.citys[parseInt(Math.random() * this.citys.length)]);
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                    },
                    count: 30 * Math.random(),
                    time: 100 * Math.random()
                });
            }

            var options = {
                size: 13,
                gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
                max: 60,
                animation: {
                    type: 'time',
                    stepsRange: {
                        start: 0,
                        end: 100
                    },
                    trails: 10,
                    duration: 4,
                },
                draw: 'heatmap'
            };

            layer = new MapVLayerProvider(viewer, new mapV.DataSet(data), options)

        }
    }
});