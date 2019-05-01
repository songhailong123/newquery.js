演示html
		
		<div>div</div>
		<p>p1</p>
		<p>p2</p>
	<script src="js/newquery.js" type="text/javascript"></script>
	<script type="text/javascript">
// 		function foo(){}
// 		foo.prototype.extend=function(a){
// 			console.log(a)
// 		}
// 		foo.extend("a")
		$("div").css("width:100px;height:100px;background:red;position:absolute").animate({"left":500},20,function(){
					this.animate({"color":"yellow"})
					console.log(this)
			})
		$("p").appendDom({
			type:"a",
			attr:{
				href:"2.html",
				target:"_blank"
			},
			data:"helloworld"
		});
		$("p").appendSameList(5,{
			type:"a",
			attr:{
				href:"2.html",
				target:"_blank"
			},
			data:"helloworld"
		})
		$("p").appendDiffList({
			type:["div","a"],
			attr:[{class:"hello",nihao:"hy"},{href:"index.html"}],
			data:["hello","world"]
		})
	</script>
