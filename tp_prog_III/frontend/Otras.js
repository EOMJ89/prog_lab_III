"use strict";
var Otras;
(function (Otras) {
    var ManejadoraOtros = /** @class */ (function () {
        function ManejadoraOtros() {
        }
        ManejadoraOtros.GetToken = function () {
            var token = '';
            if (localStorage.getItem('token') != null) {
                token = localStorage.getItem('token');
            }
            return token;
        };
        return ManejadoraOtros;
    }());
    Otras.ManejadoraOtros = ManejadoraOtros;
})(Otras || (Otras = {}));
//# sourceMappingURL=Otras.js.map