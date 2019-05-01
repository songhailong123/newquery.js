/**
 * creator:songhailong
 * time:2019-05-01 21:38
 * email:1370123868@qq.com
 * github:https://github.com/songhailong123/newquery.js
 */
;
(function(win, doc) {
	function Newquery(attr) {
		return new Newquery.prototype.init(attr);
	}
	Newquery.fn = Newquery.prototype = {
		init: function(attr) { //根据len长度判断返回值，$()[0]则返回dom对象
			let target = attr.trim(),
				result = doc.querySelectorAll(target),
				len = result.length;
			if (len == 1) {
				this[0] = result[0];
			} else if (len > 0) {
				this[0] = result;
			} else {
				throw new Error("undefined");
			}
			return this;
		},
		//css方法直接传入css字符串
		css: function(str) { //将类型转化为array类型
			let item = [].slice.call(this[0]),
				len = item.length;
			if (len == 0) {
				this[0].style.cssText += str;
			} else {
				item = item.map(function(current) {
					current.style.cssText += str;
				});
			}
			return this;
		},
		extend: function(name, obj) {
			Object.assign(Newquery.prototype, {
				[name]: obj
			});
		},
		getStyle: function(element, attr) {
			return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
		},
		//运动函数
		/**
		 * json{"key":"value"},time(可选)，fn=function(){}//可选
		 */
		animate: function(json = {}, time = 1000, fn) {
			let element = this[0];
			clearInterval(element.timer);
			element.timer = setInterval(() => {
				let flag = true; //判断是否全不执行完的标志
				//遍历传入的属性参数
				for (let attr in json) {
					//如果传入的是透明度
					if (attr == "opacity") {
						var current = this.getStyle(element, attr) * 100; //将当前透明度放大100倍
						var target = json[attr] * 100; //将目标透明度放大100倍
						//设置步数
						var step = (target - current) / 10;
						step = step > 0 ? Math.ceil(step) : Math.floor(step); //step大于0向上取整反之向下,实现变速效果
						current += step; //移动后的值
						element.style[attr] = current / 100;
					} else if (attr == "zIndex" || attr == "color" || attr == "background") {
						element.style[attr] = json[attr];
					} else { //其他普通属性
						var current = parseInt(this.getStyle(element, attr));
						var target = json[attr];
						var step = (target - current) / 10;
						step = step > 0 ? Math.ceil(step) : Math.floor(step);
						current += step; //移动后的值
						element.style[attr] = current + "px";
					}
					if (current != target) {
						flag = false;
					}
					if (flag) {
						clearInterval(element.timer)
						//完成目标后清理定时器
						if (fn) {
							fn.bind(this)();
						}
					}
				}
			}, time);
			return this;
		},
		/**
		 * 这个方法可以再次优化，减少代码复用
		 * 传入一个引用对象{type:"",attr={key1:"value"},data}data为字符串可选
		 */
		appendDom: function(obj) {
			let {
				type,
				attr
			} = obj,
			fragment = document.createDocumentFragment(),
				ele = document.createElement(type),
				typenode = [].slice.call(this[0]),
				len = typenode.length;
			Object.keys(attr).map(function(item) {
				ele.setAttribute(item, attr[item]);
			})
			//如果存在data
			if (obj.hasOwnProperty("data")) {
				ele.innerHTML = obj.data
			}
			fragment.appendChild(ele);
			//如果选中值只有一个
			if (len == 0) {
				this[0].appendChild(fragment);
			} else {
				let array = [];
				for (let i = 0; i < len; i++) {
					array.push(fragment.cloneNode(true));
					typenode[i].appendChild(array[i]);
				}
			}
			return this;
		},
		/**
		 * 参数值num,obj={type,attr:{key:"value"},data可选
		 */
		appendSameList: function(num, obj) {
			for (let i = 0; i < num; i++) {
				this.appendDom(obj);
			}
			return this;
		},
		/**
		 * {type:[],attr:[{key:"value"}],data:[]}
		 * 
		 */
		appendDiffList: function(obj) {
			let {
				type,
				attr
			} = obj,
			fragment = document.createDocumentFragment(),
				nodetype = [].slice.call(this[0]),
				nodelen = nodetype.length,
				typelen = type.length,
				attrlen = attr.length,
				nodearray = [];
			type.forEach(function(item) {
				nodearray.push(document.createElement(item));
			});
			for(let i=0;i<typelen;i++){
				Object.keys(attr[i]).map(function(item){
					nodearray[i].setAttribute(item,attr[i][item]);
					if (obj.hasOwnProperty("data")) {
						nodearray[i].innerHTML = obj.data[i];
					}
				})
				fragment.appendChild(nodearray[i]);
			}
			//如果选中值只有一个
			if (nodelen == 0) {
				this[0].appendChild(fragment);
			} else {
				let array = [];
				for (let i = 0; i <nodelen; i++) {
					array.push(fragment.cloneNode(true));
					nodetype[i].appendChild(array[i]);
				}
			}
		}
	}
	// Object.assign(Newquery.prototype.init.prototype,Newquery.prototype);
	Newquery.prototype.init.prototype = Newquery.prototype;
	win.Newquery = win.$ = Newquery;

})(window, document);
