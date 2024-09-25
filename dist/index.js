"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const API_KEY = process.env.API_KEY;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
function CheckFor(str) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield googleapis_1.google.discoverAPI(DISCOVERY_URL);
            const analyzeRequest = {
                comment: {
                    text: str,
                },
                requestedAttributes: {
                    TOXICITY: {},
                },
            };
            return new Promise((resolve, reject) => {
                client.comments.analyze({
                    key: API_KEY,
                    resource: analyzeRequest,
                }, (err, response) => {
                    var _a, _b, _c;
                    if (err) {
                        console.error('Error:', err);
                        reject(err);
                    }
                    else {
                        const toxicityScore = (_c = (_b = (_a = response.data.attributeScores) === null || _a === void 0 ? void 0 : _a.TOXICITY) === null || _b === void 0 ? void 0 : _b.summaryScore) === null || _c === void 0 ? void 0 : _c.value;
                        resolve(toxicityScore);
                    }
                });
            });
        }
        catch (err) {
            console.error('Error:', err);
            return undefined;
        }
    });
}
// Test the function
CheckFor("like you").then(data => console.log('Toxicity Score1:', data));
