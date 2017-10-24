# ng-geoip

[![Build Status](https://travis-ci.org/skamenetskiy/ng-geoip.svg?branch=master)](https://travis-ci.org/skamenetskiy/ng-geoip)

A small library to fetch GeoIp data for angular from external resource.

## Usage
1. Include the GeoIp module:
```javascript
angular
    .module('yourApp', [
        'ngGeoIp',
    ]);
```
2. Use it whereever you want:
```javascript
(function () {
    'use strict';
    
    angular
        .module('yourApp')
        .controller('SomeController', SomeController);
        
    SomeController.$inject = ['GeoIpService'];
    
    /**
     * @desc Some controller
     * @param {GeoIpService} GeoIpService
     */
    function SomeController(GeoIpService) {
        
        GeoIpService
            .lookup()
            .then(console.log)
            .catch(console.error);
        
    }
})();
```

## GeoIpService
### lookup(host:string) : Promise<GeoIpModel>
Lookup host geo location data. If host is undefined, will search for client ip.

### setHost(host:string) : GeoIpService
Set GeoIp service host.

### setModel(model:constructor) : GeoIpService
Set GeoIp model that will be returned in the lookup method.

## License
Copyright (c) 2017 Semen Kamenetskii

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.