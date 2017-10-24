'use strict';

describe('ng-geoip', function () {
    /**
     * @type {GeoIpService}
     */
    var GeoIpService;
    var $httpBackend;

    beforeEach(module('ngGeoIp'));

    beforeEach(inject(function (_GeoIpService_,
                                _$httpBackend_) {
        GeoIpService = _GeoIpService_;
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
                expect(data.ip).toEqual('1.2.3.4');
                expect(data.country_code).toEqual('RU');
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
                expect(data.ip).toEqual('1.2.3.4');
                expect(data.country_code).toEqual('RU');
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
});
