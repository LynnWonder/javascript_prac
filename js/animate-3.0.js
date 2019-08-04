/*
V3.0
1) 模拟函数的重载

V2.2
1) 帧编号修改
2) 添加缓冲
3) 添加函数节流
*/


function animate(elem,targetJson,time,tweenString,callback){

    if(arguments.length < 3 || typeof arguments[0] != 'object' || typeof arguments[1] != 'object' || typeof arguments[2] != 'number'){
        throw new Error('老哥,参数类型不对或者参数太少了,请重新检查参数');
        return;
    }else if(arguments.length == 3){
        tweenString = 'Linear';
        callback = null;
    }else if(arguments.length == 4){
        switch(typeof arguments[3]){
            // 如果是第4个参数 是字符串,默认回调函数为null
            case 'string':
                callback = null;
                break;

            // 如果第四个参数为function, 把function赋值给callback,缓冲默认为Linear
            case 'function':
                callback = arguments[3];
                arguments[3] = 'Linear';
                break;

            default :
                throw new Error('老哥,第四个参数类型不对,请重新检查参数');
                return;
        }
    }else if(arguments.length == 5){

        if(typeof arguments[3] != 'string' || typeof arguments[4] != 'function'){
            throw new Error('老哥,第四个和第五个参数类型不对,请重新检查参数');
            return;
        }
    }else{
        throw new Error('老哥,参数太多了,请重新检查参数');
        return;
    }

	// 给元素绑定自定义属性,用来实现函数节流
	elem.isanimated = true;

	// 假定运动间隔为50ms
	var interval = 50;

	// 根据用户传入的时间 / interval 就是总次数
	var maxFrame = time / interval;

	// 声明信号量(最初状态)json
	var semaphoreJson = {};

	// 声明变化量json
	var deltaJson = {};

	// 根据targetJson求出最初的semaphoreJson
	for(var k in targetJson){
		// console.log(k);
		// 根据targetJson中k取出元素最初状态的数值
		semaphoreJson[k] = parseFloat(fetchComputedStyle(elem,k));

		// 顺带脚的就把targetJson中的px干掉
		targetJson[k] = parseFloat(targetJson[k]);

		deltaJson[k] = targetJson[k] - semaphoreJson[k];
	}

	// console.log(semaphoreJson,targetJson,deltaJson);

	// 声明count记录运动次数
	var frameNumber = 0;
	// 到此三个json都有了,可以动起来了
	var timer = setInterval(function(){

		frameNumber++;
		// semaphoreJson每次加上一个stepJson
		for(var k in targetJson){
			if(k == 'opacity'){
				var n = Tween[tweenString](frameNumber,semaphoreJson[k],deltaJson[k],maxFrame);
				elem.style[k] = n;
				elem.style.filter = 'alpha(opacity=' + n*100 +')'; 

				// console.log(frameNumber + ':' + n);
			}else{
				var n = Tween[tweenString](frameNumber,semaphoreJson[k],deltaJson[k],maxFrame);
				elem.style[k] = n + 'px';

				// console.log(frameNumber + ':' + n);
			}
		}

		// 当步数够了,拉终停表,(直接把targetJson的值赋值给元素)
		if(frameNumber == maxFrame){
			for(var k in targetJson){
				// 直接把targetJson的值赋值给元素
				if(k == 'opacity'){
					elem.style[k] = targetJson[k];
					elem.style.filter = 'alpha(opacity=' + semaphoreJson[k]*100 +')';
				}else{
					elem.style[k] = targetJson[k] + 'px';
				}
			}
			clearInterval(timer);

			// 停表之后把用来函数节流的自定义属性变为false
			elem.isanimated = false;

			// 执行回调函数
            // 使用短路语法,callback有值时 ,再执行
			callback&&callback.call(elem);
		}

	}, interval);

}

function fetchComputedStyle(obj , property){

	//能力检测
	if(window.getComputedStyle){
		
		//现在要把用户输入的property中检测一下是不是驼峰，转为连字符写法
		//强制把用户输入的词儿里面的大写字母，变为小写字母加-
		//paddingLeft  →  padding-left
		property = property.replace(/([A-Z])/g , function(match,$1){
			
			return "-" + $1.toLowerCase();
		});

		return window.getComputedStyle(obj)[property];
	}else{
		//IE只认识驼峰，我们要防止用户输入短横，要把短横改为大写字母
		//padding-left  → paddingLeft 
		property = property.replace(/\-([a-z])/g , function(match,$1){
			return $1.toUpperCase();
		});

		return obj.currentStyle[property];
	}
}



//缓冲的各种公式
var Tween = { 
	Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    QuadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QuadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QuadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    CubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    CubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    CubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    SineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    SineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    SineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    ExpoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    ExpoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    ExpoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CircEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    CircEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    CircEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    ElasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    ElasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    BackEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function(t, b, c, d, s ) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    BounceEaseIn: function(t, b, c, d) {
        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    BounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};