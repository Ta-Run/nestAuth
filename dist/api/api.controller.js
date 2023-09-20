"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const signup_payload_1 = require("./payload/signup.payload");
const login_payload_1 = require("./payload/login.payload");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    signup(signupPayload) {
        return this.apiService.signUp(signupPayload);
    }
    login(loginPayload, response) {
        return this.apiService.login(loginPayload, response);
    }
    profile(request) {
        return this.apiService.getProfile(request);
    }
    logout(response) {
        return this.apiService.logout(response);
    }
    randomJoke(request) {
        return this.apiService.getrandomJoke(request);
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Post)('/users/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_payload_1.SignUpPayload]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('/users/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_payload_1.LoginPayload, Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/users/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('/users/logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/random-joke'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "randomJoke", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
//# sourceMappingURL=api.controller.js.map