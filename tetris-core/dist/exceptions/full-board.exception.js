"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FullBoardException = /** @class */ (function (_super) {
    __extends(FullBoardException, _super);
    function FullBoardException() {
        var _this = _super.call(this, 'No space on top for new piece') || this;
        Object.setPrototypeOf(_this, FullBoardException.prototype);
        return _this;
    }
    return FullBoardException;
}(Error));
exports.FullBoardException = FullBoardException;
