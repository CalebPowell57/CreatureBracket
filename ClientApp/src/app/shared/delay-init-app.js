"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
function initApp() {
    return function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log('In initApp');
                resolve();
            }, 1000);
        });
    };
}
exports.initApp = initApp;
//# sourceMappingURL=delay-init-app.js.map