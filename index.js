"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const createSubscribe = (name) => ({
    next: (v) => console.log('next: ', v),
    error: () => console.log('error: ', name),
    complete: () => console.log('complete', name),
});
// of(1,2,3)
// 	.subscribe({
// 		next: (v) => console.log('next: ', v),
// 		error: (err) => console.log('error: ', err),
// 		complete: () => console.log('complete'),
// 	});
// range(5, 5)
// 	.subscribe({
// 		next: v => console.log(v),
// 		complete: () => console.log('complete'),
// 	})
// interval(1000)
// 	.pipe(take(4))
// 	.subscribe(v => console.log('next: ', v));
//===============arrays
// const arr = [
// 	{
// 		id: 1,
// 		name: 'PAsha'
// 	},
// 	{
// 		id: 2,
// 		name: 'ana',
// 	}
// ];
// const set = new Set([1,2,3, '4', '5', {id: 5}])
// from(set)
// 	.subscribe(createSubscribe<number | string | {id: number}>('from'));
// const map = new Map([[1,2], [5,6]])
// from(map)
// 	.subscribe(createSubscribe<number[]>('from'));
//=================promises
// const delay = (ms = 1000) => {
// 	return new Promise((res, rej) => {
// 		setTimeout(() => {
// 			res(null);
// 		});
// 	});
// }
//=======================метод map
// interval(1000)
// 	.pipe(map((x: number) => x*2), take(4))
// 	.subscribe(createSubscribe('map'))
// of('hello', 'world', 'wfm')
// 	.pipe(map((x: string) => x.toUpperCase()))
// 	.subscribe(createSubscribe('of'))
// fromEvent(document.querySelector('input')!, 'keyup')
// 	.subscribe(createSubscribe('map'))
// from([2,4])
// 	.pipe(every(x => x % 2 === 0))
// 	.subscribe(createSubscribe('every'));
// const s1$ = range(1,4);
// const s2$ = range(3,1);
// concat(s1$, s2$)
// 	.subscribe(createSubscribe('concat'))
// const o = range(0, 1000)
// .pipe(
// 	takeUntil(timer(1))
// )
// .subscribe(createSubscribe('takeUntil: '));
//===========combine
// const timerOne = timer(1000, 4000).pipe(
//     take(3)
// )
// .subscribe(createSubscribe('combineLatest'));
// const timerTwo = timer(2000, 4000).pipe(
//     take(3)
// )
// .subscribe(createSubscribe('combineLatest'));
// const timerThree = timer(3000, 4000).pipe(
//     take(3)
// )
// .subscribe(createSubscribe('combineLatest'));
// const o = combineLatest([timerOne, timerTwo, timerThree]);
// const o = zip([timerOne, timerTwo, timerThree]);
//==========concat выдает значения сначала первого observable и так далее
// const o1 = timer(0, 1000).pipe(take(3)); // быстро
// const o2 = timer(0, 100).pipe(take(3));  // медленно
// const o = concat(o1, o2).subscribe(createSubscribe('concat'));
//===========merge выдает значения любого кол-ва observable по мере их создания
// const o1 = timer(0, 1000).pipe(take(3)); // медленно
// const o2 = timer(0, 100).pipe(take(3));  // быстро
// const o = merge(o1, o2).subscribe(createSubscribe('merge'));
//=================startWith
// const o1 = timer(0, 1000).pipe(take(3));
// const o = o1.pipe(startWith(5)).subscribe(createSubscribe('startWith'));
//=============withLatestFrom
// const o1 = timer(0, 1000).pipe(take(3));
// const o2 = timer(0, 100).pipe(take(3));
// const o = o1.pipe(withLatestFrom(o2)).subscribe(createSubscribe('withLatestFrom'));
//===================reduce
// const o = of(1, 2, 3, 4, 5, 6, 7)
//     .pipe(
//         reduce((accumulator, current) => {
//             return accumulator + current;
//         })
//     )
// 	.subscribe(createSubscribe('reduce'));
//=======scan
// const oh = of(1, 2, 3, 4, 5, 6, 7)
//     .pipe(
//         scan((accumulator, current) => {
//             return accumulator + current;
//         })
//     )
// 	.subscribe(createSubscribe('scan'));
//==================mapTo
// const o = range(0, 10)
//     .pipe(mapTo('cool'))
// 	.subscribe(createSubscribe('mapTo'));
//================mergeMap
// const clicks = of(1,4);
// const o = clicks.pipe(mergeMap(() => {
//     return interval(2000);
// }),
// take(10)
// )
// .subscribe(createSubscribe('mergeMap'));
//=================switchMap
//Здесь кароче он работает так. switchMap меняeт предыдущую подписку если она еще
// не обработана и приминяет новую если она конечно же готова, в этом случае
// новые подписки успевают догнать старые из-за задержки delay(1000)
const filters = ['brand=porsche', 'model=911', 'horsepower=389', 'color=red'];
const activeFilters = new rxjs_1.BehaviorSubject('');
const getData = (params) => {
    return (0, rxjs_1.of)(`retrieved new data with params ${params}`).pipe((0, rxjs_1.delay)(1000));
};
const applyFilters = () => {
    filters.forEach((filter, index) => {
        let newFilters = activeFilters.value;
        if (index === 0) {
            newFilters = `?${filter}`;
        }
        else {
            newFilters = `${newFilters}&${filter}`;
        }
        activeFilters.next(newFilters);
    });
};
activeFilters.pipe((0, rxjs_1.switchMap)(param => getData(param))).subscribe(val => console.log(val));
applyFilters();
const switched = (0, rxjs_1.of)(1, 2, 3).pipe((0, rxjs_1.switchMap)(x => (0, rxjs_1.of)(x, Math.pow(x, 2), Math.pow(x, 3))));
switched.subscribe(x => console.log(x));
(0, rxjs_1.from)([1, 2, 3, 4]).pipe((0, rxjs_1.switchMap)(param => getData(param.toString()))).subscribe(val => console.log(val));
const sub = new rxjs_1.Subject();
let c = 0;
const return$ = sub.pipe((0, rxjs_1.switchMap)((str) => {
    const r = str + 'STR';
    c++;
    if (c < 2) {
        sub.next(r);
    }
    else
        sub.complete();
    return r;
}), (0, rxjs_1.concatAll)());
return$.subscribe(val => {
    console.log(val);
});
sub.next('str');
