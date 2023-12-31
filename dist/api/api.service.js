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
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const api_schema_1 = require("./schemas/api.schema");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
let ApiService = class ApiService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpPayload) {
        const { name, email, password } = signUpPayload;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword,
        });
        const token = this.jwtService.sign({
            id: user._id,
        });
        return { token };
    }
    async login(loginPayLoad, response) {
        const { email, password } = loginPayLoad;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid Email');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid Email');
        }
        const token = this.jwtService.sign({
            id: user._id,
        });
        response.cookie('jwt', token, { httpOnly: true });
        return { message: 'Succesfully Login' };
    }
    async getProfile(request) {
        try {
            const cookies = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookies);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.userModel.findOne({ id: data['_id'] });
            return user;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'Logout Successfully',
        };
    }
    async getrandomJoke(request) {
        try {
            const cookies = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookies);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const joke = await axios_1.default.get(process.env.RandomeJoke);
            return joke.data.value;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(api_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], ApiService);
//# sourceMappingURL=api.service.js.map