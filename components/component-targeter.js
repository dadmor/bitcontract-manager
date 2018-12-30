var componentTargeter = Vue.extend({
	template: 
	`
		<div>
			<div id="target-top"></div>
			<div id="target-bottom"></div>
			<div id="target-left"></div>
			<div id="target-right"></div>
			<div id="target-description"></div>
		</div>
	`,
	props: ['me'],
	data: function(){
		return {
			
		}
	},
	mounted: function () {
		document.addEventListener('mouseover', this.moveHandler, false);
		document.addEventListener('mousedown', this.clickHandler, false);
	},
	beforeDestroy: function(){
		document.removeEventListener("mouseover",this.moveHandler, false);
		document.removeEventListener("mousedown",this.clickHandler, false);
  	},
	methods: {
		clickHandler(event){
			// console.log(this.getXPath(event.target));
			console.log(this.cssPath(event.target));
		},
		moveHandler(event){
			this.setTargeter(event.target);
		},
		setTargeter(el){
			let rect = this.getAbsoluteBoundingRect(el);

			const target_top = this.$el.querySelector("#target-top");
			const target_bottom = this.$el.querySelector("#target-bottom");
			const target_left = this.$el.querySelector("#target-left");
			const target_right = this.$el.querySelector("#target-right");

			var d_height = document.body.clientHeight;
			var d_width = document.body.clientWidth;

			target_top.style.height = rect.top+'px';
			target_left.style.width = rect.left+'px';
			target_left.style.height = d_height+'px';
			target_right.style.left = rect.right+'px';
			target_right.style.width = (d_width - rect.right)+'px';
			target_right.style.height = d_height+'px';
			target_bottom.style.top = rect.bottom+'px';
			target_bottom.style.height = (d_height - rect.bottom)+'px';

		},
		getAbsoluteBoundingRect: function (el) {
			var doc  = document,
			win  = window,
			body = doc.body,
			offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
			(doc.documentElement || body.parentNode || body).scrollLeft,
			offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
			(doc.documentElement || body.parentNode || body).scrollTop,
			rect = el.getBoundingClientRect();
			if (el !== body) {
				var parent = el.parentNode;
				while (parent !== body) {
					offsetX += parent.scrollLeft;
					offsetY += parent.scrollTop;
					parent   = parent.parentNode;
				}
			}
			return {
				bottom: rect.bottom + offsetY,
				height: rect.height,
				left  : rect.left + offsetX,
				right : rect.right + offsetX,
				top   : rect.top + offsetY,
				width : rect.width
			};
		},
		getXPath: function (el) {
			if (typeof el == "string") return document.evaluate(el, document, null, 0, null)
			if (!el || el.nodeType != 1) return ''
			if (el.id) return "//*[@id='" + el.id + "']"
			var sames = [].filter.call(el.parentNode.children, function (x) { return x.tagName == el.tagName })
			return this.getXPath(el.parentNode) + '/' + el.tagName.toLowerCase() + (sames.length > 1 ? '['+([].indexOf.call(sames, el)+1)+']' : '')
		},
		cssPath: function (el) {
			if (!(el instanceof Element)) return;
			var path = [];
			while (el.nodeType === Node.ELEMENT_NODE) {
				var selector = el.nodeName.toLowerCase();
				if (el.id) {
					selector += '#' + el.id;
				} else {
					var sib = el, nth = 1;
					while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
					selector += ":nth-child("+nth+")";
				}
				path.unshift(selector);
				el = el.parentNode;
			}
			return path.join(" > ");
		},
	},
})
Vue.component('component-targeter', componentTargeter);