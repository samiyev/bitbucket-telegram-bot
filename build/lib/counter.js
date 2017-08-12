"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FS = require("fs");
var json = require("jsonfile");
var Counter = (function () {
    function Counter(options) {
        this.options = options;
        this.reviseDatas = new Map();
        this.onInit();
    }
    Counter.prototype.onInit = function () {
        if (!this.options.path) {
            this.options.path = __dirname + '/counts.json';
        }
        if (!FS.existsSync(this.options.path)) {
            json.writeFileSync(this.options.path, []);
        }
    };
    Counter.prototype.revise = function (input, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repo;
            return tslib_1.__generator(this, function (_a) {
                repo = this.reviseDatas.get(input.slug);
                if (!repo)
                    return [2 /*return*/, { skip: 0, limit: count }];
                return [2 /*return*/, { skip: repo.count, limit: count - repo.count }];
            });
        });
    };
    Counter.prototype.update = function (input, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repo;
            return tslib_1.__generator(this, function (_a) {
                repo = this.reviseDatas.get(input.slug);
                if (!repo) {
                    this.reviseDatas.set(input.slug, { slug: input.slug, count: count });
                }
                else {
                    repo.count += count;
                }
                return [2 /*return*/];
            });
        });
    };
    Counter.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repos, _i, repos_1, repo;
            return tslib_1.__generator(this, function (_a) {
                this.reviseDatas = new Map();
                repos = json.readFileSync(this.options.path);
                for (_i = 0, repos_1 = repos; _i < repos_1.length; _i++) {
                    repo = repos_1[_i];
                    this.reviseDatas.set(repo.slug, repo);
                }
                return [2 /*return*/];
            });
        });
    };
    Counter.prototype.close = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repos;
            return tslib_1.__generator(this, function (_a) {
                repos = Array.from(this.reviseDatas.values());
                json.writeFileSync(this.options.path, repos);
                this.reviseDatas = null;
                this.reviseDatas = new Map();
                return [2 /*return*/];
            });
        });
    };
    Counter.prototype.reset = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                json.writeFileSync(this.options.path, []);
                return [2 /*return*/];
            });
        });
    };
    return Counter;
}());
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map