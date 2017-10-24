/**
 * @desc NgGeoip
 */
(function () {

    'use strict';

    angular
        .module('ngGeoIp', [])
        .constant('GeoIpModel', GeoIpModel)
        .service('GeoIpService', service);

    service.$inject = [
        '$q',
        '$http',
        '$sce'
    ];

    /**
     * @desc Angular service wrapper
     * @param $q
     * @param $http
     * @param $sce
     * @return {GeoIpService}
     */
    function service($q,
                     $http,
                     $sce) {

        GeoIpService.prototype.$$model       = GeoIpModel;
        GeoIpService.prototype.$$serviceHost = '//freegeoip.net/json/%host%';
        GeoIpService.prototype.lookup        = lookup;
        GeoIpService.prototype.setHost       = setHost;
        GeoIpService.prototype.setModel      = setModel;

        return new GeoIpService();

        /**
         * @desc GeoIpService service class
         * @constructor
         */
        function GeoIpService() {
        }

        /**
         * @desc Lookup host geo location data. If host is undefined, will search for client ip.
         * @param {string} [host]
         * @return {Promise<GeoIpModel>}
         * @this {GeoIpService}
         */
        function lookup(host) {
            var model = this.$$model,
                url   = (location.protocol + this.$$serviceHost)
                    .replace('%host%', host || '');

            return $q(function (resolve, reject) {
                $http
                    .jsonp($sce.trustAsResourceUrl(url))
                    .then(function (response) {
                        if (response.status === 200) {
                            resolve(new (model)(response.data));
                        } else {
                            reject(new Error('http responded with status ' + response.status));
                        }
                    })
                    .catch(reject);
            });
        }

        /**
         * @desc Set GeoIp service host
         * @param host
         * @returns {GeoIpService}
         * @this {GeoIpService}
         */
        function setHost(host) {
            this.$$serviceHost = host;
            return this;
        }

        /**
         * @desc Set GeoIp model that will be returned in the lookup method
         * @param model
         * @return {GeoIpService}
         * @this {GeoIpService}
         */
        function setModel(model) {
            this.$$model = model;
            return this;
        }
    }

    /**
     * @desc GeoIpModel model
     * @param data
     * @constructor
     */
    function GeoIpModel(data) {
        this.ip          = data.ip || null;
        this.countryCode = data.country_code || null;
        this.countryName = data.country_name || null;
        this.regionCode  = data.region_code || null;
        this.regionName  = data.region_name || null;
        this.city        = data.city || null;
        this.zipCode     = data.zip_code || null;
        this.timeZone    = data.time_zone || null;
        this.latitude    = data.latitude || null;
        this.longitude   = data.longitude || null;
        this.metroCode   = data.metro_code || null;
    }

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getIp = function () {
        return this.ip;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getCountryCode = function () {
        return this.countryCode;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getCountryName = function () {
        return this.countryName;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getRegionCode = function () {
        return this.regionCode;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getRegionName = function () {
        return this.regionName;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getCity = function () {
        return this.city;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getZipCode = function () {
        return this.zipCode;
    };

    /**
     * @desc Returns
     * @return {string|null}
     */
    GeoIpModel.prototype.getTimeZone = function () {
        return this.timeZone;
    };

    /**
     * @desc Returns
     * @return {number|null}
     */
    GeoIpModel.prototype.getLatitude = function () {
        return this.latitude;
    };

    /**
     * @desc Returns
     * @return {number|null}
     */
    GeoIpModel.prototype.getLongitude = function () {
        return this.longitude;
    };

    /**
     * @desc Returns
     * @return {number|null}
     */
    GeoIpModel.prototype.getMetroCode = function () {
        return this.metroCode;
    };

})();
