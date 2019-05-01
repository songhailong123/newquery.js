#无new引用

- $(selector),支持css3属性以及各种选择器，例如$("div")
#css方法

- $(obj).css(str);str="width:100px;height:100px;background:red"
#extend

- 为newquery原型添加对象/方法，$.fn.extend(name,obj);
#animate

- 动画函数，animate(json,time,fn);例如	```
$("div").css("width:100px;height:100px;background:red;position:absolute").animate({"left":500},20,function(){
	this.animate({"color":"yellow"})
})
```
注意：写入回调函数时，需要传入this.animate才可以，json为目标值，time为执行时间，默认为1s，fn为回调函数
#appendDom

- 添加一个节点
示例：		
```
$("p").appendDom({
	type:"a",
	attr:{
		href:"2.html",
		target:"_blank"
	},
	data:"helloworld"
});
```
#appendSameList

- 添加一个相同节点的列表
示例：
```
		$("p").appendSameList(5,{
			type:"a",
			attr:{
				href:"2.html",
				target:"_blank"
			},
			data:"helloworld"
		})
```
#appendDiffList

- 添加不同节点类型的列表（但也可以相同）
示例:
```
$("p").appendDiffList({
	type:["div","a"],
	attr:[{class:"hello",nihao:"hy"},{href:"index.html"}],
	data:["hello","world"]
})
```
