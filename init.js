/**
 *  init widget
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/15:52
 */

$(function () {
    var viewer, previousWidget;
    /**
     * listener
     *
     */
    require(['EventBus', 'Config', 'Cesium', 'knockout', 'jquery'], function (EventBus, Config, Cesium, ko, $) {
        EventBus.listener(EventBus.CONTENT_INITIALIZE, function () {
                // 初始化地图
                initMap(Cesium, Config);

                ko.applyBindings(new ViewModel(), document.getElementById("leftWidget"));

                function ViewModel() {
                    var self = this;

                    self.mapWidgets = ko.observableArray(Config.widgets);

                    self.activeWidget = activeWidget
                }

                // 初始化组件
                // initWidgets(Config);
            }
        );

        EventBus.appInit();
    });


    function activeWidget(widget) {
        var li = $('#' + widget.id + 'Li');
        li.addClass('active-widget');
        if (previousWidget) {
            $('#' + previousWidget.id + 'Li').removeClass('active-widget')
        }
        require(['./widgets/' + widget.id], function (index) {
            if (previousWidget) {
                previousWidget.widget.destroy();
            }

            if (viewer) {
                index.activate(viewer);
                previousWidget = {
                    id: widget.id,
                    widget: index
                };
            }
        }, function (err) {
            console.error("模块 [" + widget.id + "] 加载异常请添加配置！")
        });

    }


    function initMap(Cesium, Config) {
        var layer = new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t1.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&&tk=4a00a1dc5387b8ed8adba3374bd87e5e",
            layer: "tdtVecBasicLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            show: false
        });

        viewer = new Cesium.Viewer(Config.GLOBAL_CONTAINER, {
            imageryProvider: layer,
            timeline: false,
            SceneModePicker: false,
            animation: false,
            shadows: true,
            navigationHelpButton: false,
            creditContainer: "credit",
            homeButton: true,
            fullscreenButton: true, // 全图
            baseLayerPicker: false, // 底图快速切换
            geocoder: false, // 搜索框
            sceneModePicker: false, // 切换3维2维按钮
            sceneMode: Cesium.SceneMode.SCENE3D, // 初始化模式
            scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
        });

        var cartesianPosition = Cesium.Rectangle.fromDegrees(73.5, 4, 135, 53);

        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
            // Fly to custom position
            viewer.camera.setView({
                destination: cartesianPosition,
                orientation: {
                    heading: 0.0, // east, default value is 0.0 (north)
                    pitch: Cesium.Math.toRadians(-90),    // default value (looking down)
                    roll: 0.0                             // default value
                }
            });
            commandInfo.cancel = true;
        });

        viewer.camera.setView({
            destination: cartesianPosition,
            orientation: {
                heading: 0.0, // east, default value is 0.0 (north)
                pitch: Cesium.Math.toRadians(-90),    // default value (looking down)
                roll: 0.0                             // default value
            }
        });
    }

});