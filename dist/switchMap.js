"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const axios_1 = __importDefault(require("axios"));
const createSubscribe = (name) => ({
    next: (v) => console.log('next: ', v),
    error: () => console.log('error: ', name),
    complete: () => console.log('complete', name),
});
const fetchData = (number) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/comments/${number}`)).data;
});
const sub = new rxjs_1.Subject();
let counter = 1;
const return$ = sub.pipe(
//switchMap для forEach
// switchMap(async (i) => await fetchData(i)),
// switchMap(async(i) => i.toString()),
// switchMap(i => i.toString()),
(0, rxjs_1.switchMap)((req) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield fetchData(req);
    // console.log(ret, 'fetch finish');
    // console.log(counter, 'counter start')
    counter++;
    if (counter < 5) {
        sub.next(counter);
    }
    else
        sub.complete();
    return ret;
})));
return$.subscribe(val => console.log(val));
// [1,2,3,4].forEach((item) => {
// 	sub.next(item)
// })
sub.next(counter);
