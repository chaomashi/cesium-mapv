/**
 * 事件监听
 * @author by <a href="mailto:chaomashi@gmail.com">Du</a>
 * @version v1.0 2019/5/17/14:56
 */

define(['jquery'], function ($) {

    'use strict';

    /**
     * @export EventBus
     * @constructor
     *
     */
    function EventBus() {

        this._contentInitialize = 'contentInitialize';
        this._widgetsInitialize = 'widgetsInitialize';
    }


    Object.defineProperties(EventBus.prototype, {

        CONTENT_INITIALIZE: {
            get: function () {
                return this._contentInitialize;
            }
        },

        WIDGETS_INITIALIZE: {
            get: function () {
                return this._widgetsInitialize;
            }
        },

    });

    /**
     * app init
     */
    EventBus.prototype.appInit = function () {
        $(document).triggerHandler(this._contentInitialize);
    };

    /**
     * trigger
     * @param evt
     * @param data
     */
    EventBus.prototype.trigger = function (evt, data) {
        $(document).triggerHandler(evt, [data]);
    };

    /**
     * listener
     * @param evt
     * @param callback
     */
    EventBus.prototype.listener = function (evt, callback) {
        $(document).on(evt, callback);
    };

    return new EventBus

});