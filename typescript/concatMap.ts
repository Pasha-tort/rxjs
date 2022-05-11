import {of, range, reduce, scan, withLatestFrom, 
	merge, startWith, timer, combineLatest, interval, 
	map, takeUntil, Observable, take, from, fromEvent, 
	every, concat, debounceTime, zip, forkJoin, 
	combineLatestAll, mapTo, switchMap, exhaustMap, flatMap, mergeMap, concatMap, Subject, delay, BehaviorSubject, concatAll,
} from 'rxjs'
import axios from 'axios';

const createSubscribe = <T>(name: string) => ({
	next: (v: T) => console.log('next: ', v),
	error: () => console.log('error: ', name),
	complete: () => console.log('complete', name),
});

const fetchData = async (number: number) => {
	return await (await axios.get(`https://jsonplaceholder.typicode.com/comments/${number}`)).data;
}

const sub = new Subject<number>();
let counter = 1;

const return$ = sub.pipe(
	//concatMap для forEach
	// concatMap(async (i) => await fetchData(i)),
	// concatMap(async(i) => i.toString()),
	// concatMap(i => i.toString()),
	concatMap(async req => {
		const ret = await fetchData(req);
		// console.log(ret, 'fetch finish');
		// console.log(counter, 'counter start')
		counter++;
		if (counter < 5) {
			sub.next(counter);
		} else sub.complete();
		return ret;
	}),
	// concatAll()
);

return$.subscribe(val => console.log(val));

// [1,2,3,4].forEach((item) => {
// 	sub.next(item)
// })

sub.next(counter);