```js

compose(ctx, middlewares){
	let dispatch = (index) => {
		// 直接返回成功
		if(index >= middlewares.length){
			return Promise.resolve()
		}
		// 获取use方法传入的参数
		let middle = middlewares[index]
		// 等待下一个执行完成
		return middle(ctx, ()=>dispatch(index+1))
	}
	// 保证链式调用
	return dispatch(0)
}

```