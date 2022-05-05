import {of, range, timer, interval, map, Observable, take, from, fromEvent} from 'rxjs'

const createSubscribe = <T>(name: string) => ({
	next: (v: T) => console.log('next: ', v),
	error: () => console.log('error: ', name),
	complete: () => console.log('complete', name),
})

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
interval(1000)
	.pipe(map((x: number) => x*2), take(4))
	.subscribe(createSubscribe('map'))

of('hello', 'world', 'wfm')
	.pipe(map((x: string) => x.toUpperCase()))
	.subscribe(createSubscribe('of'))

fromEvent(document.querySelector('input')!, 'keyup')
	.subscribe(createSubscribe('map'))


