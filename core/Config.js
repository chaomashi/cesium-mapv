/**
 * 组件配置
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/7/23/17:13
 */
define(function () {
    var widgets = [
            {
                id: 'honeycomb',
                label: '蜂窝图',
                icon: 'icon-f-honeycomb',
            },
            {
                id: 'lineTime',
                label: '流向图',
                icon: 'icon-f-line-time',
            },
            {
                id: 'multiPoint',
                label: '折线图',
                icon: 'icon-f-multi-point',
            },
            {
                id: 'heatmap',
                label: '多点图',
                icon: 'icon-f-heatmap',
            }
        ],

        GLOBAL_CONTAINER = "globalContainer";

    return {
        widgets: widgets,
        GLOBAL_CONTAINER: GLOBAL_CONTAINER
    }
});