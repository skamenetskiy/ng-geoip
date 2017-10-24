'use strict';

describe('ng-geoip', function () {
    /**
     * @type {GeoIpService}
     */
    var GeoIpService;
    var GeoIpModel;
    var $httpBackend;

    beforeEach(module('ngGeoIp'));

    beforeEach(inject(function (_GeoIpService_,
                                _GeoIpModel_,
                                _$httpBackend_) {
        GeoIpService = _GeoIpService_;
        GeoIpModel   = _GeoIpModel_;
        $httpBackend = _$httpBackend_;
    }));

    describe('GeoIpService', function () {
        it('should exist', function () {
            expect(GeoIpService).toBeDefined();
        });

        describe('GeoIpService.$$serviceHost', function () {
            it('should have `$$serviceHost` param', function () {
                expect(typeof GeoIpService.$$serviceHost).toBe('string');
            });

            it('should have pre-defined `$$serviceHost` param', function () {
                expect(GeoIpService.$$serviceHost).toEqual('//freegeoip.net/json/%host%');
            });
        });

        describe('GeoIpService.lookup()', function () {
            it('should have method `lookup`', function () {
                expect(typeof GeoIpService.lookup).toBe('function');
            });

            it('should fetch data from server with `host`', function () {
                var data = undefined;

                GeoIpService
                    .lookup('1.2.3.4')
                    .then(function (response) {
                        data = response;
                    })
                    .catch(function (err) {
                        throw err;
                    });

                $httpBackend
                    .when('JSONP', 'http://freegeoip.net/json/1.2.3.4?callback=JSON_CALLBACK')
                    .respond(200, {
                        "ip":           "1.2.3.4",
                        "country_code": "RU",
                    });

                $httpBackend.flush();

                expect(data).toBeDefined();
                expect(data.getIp()).toEqual('1.2.3.4');
                expect(data.getCountryCode()).toEqual('RU');
            });

            it('should fetch data from server without `host`', function () {
                var data = undefined;

                GeoIpService
                    .lookup()
                    .then(function (response) {
                        data = response;
                    })
                    .catch(function (err) {
                        throw err;
                    });

                $httpBackend
                    .when('JSONP', 'http://freegeoip.net/json/?callback=JSON_CALLBACK')
                    .respond(200, {
                        "ip":           "1.2.3.4",
                        "country_code": "RU",
                    });

                $httpBackend.flush();

                expect(data).toBeDefined();
                expect(data.getIp()).toEqual('1.2.3.4');
                expect(data.getCountryCode()).toEqual('RU');
            });
        });

        describe('GeoIpService.setHost()', function () {
            it('should have method `setHost`', function () {
                expect(typeof GeoIpService.setHost).toBe('function');
            });

            it('should change `$$serviceHost` value', function () {
                var value = 'SomeRandomValue' + Math.random().toString();
                GeoIpService.setHost(value);
                expect(GeoIpService.$$serviceHost).toEqual(value);
            });

            it('should return `GeoIpService`', function () {
                var result = GeoIpService.setHost('value');
                expect(result).toBe(GeoIpService);
            });
        });

    });

    describe('GeoIpModel', function () {
        var mock = {
            "ip":           "1.2.3.4",
            "country_code": "US",
            "country_name": "United States",
            "region_code":  "WA",
            "region_name":  "Washington",
            "city":         "Mukilteo",
            "zip_code":     "98275",
            "time_zone":    "America/Los_Angeles",
            "latitude":     47.913,
            "longitude":    -122.3042,
            "metro_code":   819
        };


        it('should exist', function () {
            expect(GeoIpModel).toBeDefined();
        });

        it('getIp()', function () {
            expect((new GeoIpModel(mock)).getIp()).toEqual('1.2.3.4');
            expect((new GeoIpModel({})).getIp()).toBeNull();
        });

        it('getCountryCode()', function () {
            expect((new GeoIpModel(mock)).getCountryCode()).toEqual('US');
            expect((new GeoIpModel({})).getCountryCode()).toBeNull();
        });

        it('getCountryName()', function () {
            expect((new GeoIpModel(mock)).getCountryName()).toEqual('United States');
            expect((new GeoIpModel({})).getCountryName()).toBeNull();
        });

        it('getRegionCode()', function () {
            expect((new GeoIpModel(mock)).getRegionCode()).toEqual('WA');
            expect((new GeoIpModel({})).getRegionCode()).toBeNull();
        });

        it('getRegionName()', function () {
            expect((new GeoIpModel(mock)).getRegionName()).toEqual('Washington');
            expect((new GeoIpModel({})).getRegionName()).toBeNull();
        });

        it('getCity()', function () {
            expect((new GeoIpModel(mock)).getCity()).toEqual('Mukilteo');
            expect((new GeoIpModel({})).getCity()).toBeNull();
        });

        it('getZipCode()', function () {
            expect((new GeoIpModel(mock)).getZipCode()).toEqual('98275');
            expect((new GeoIpModel({})).getZipCode()).toBeNull();
        });

        it('getTimeZone()', function () {
            expect((new GeoIpModel(mock)).getTimeZone()).toEqual('America/Los_Angeles');
            expect((new GeoIpModel({})).getTimeZone()).toBeNull();
        });

        it('getLatitude()', function () {
            expect((new GeoIpModel(mock)).getLatitude()).toEqual(47.913);
            expect((new GeoIpModel({})).getLatitude()).toBeNull();
        });

        it('getLongitude()', function () {
            expect((new GeoIpModel(mock)).getLongitude()).toEqual(-122.3042);
            expect((new GeoIpModel({})).getLongitude()).toBeNull();
        });

        it('getMetroCode()', function () {
            expect((new GeoIpModel(mock)).getMetroCode()).toEqual(819);
            expect((new GeoIpModel({})).getMetroCode()).toBeNull();
        });

    });
});
