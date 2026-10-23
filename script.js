$(document).ready(function() {
    $('#water_bg').ripples({
        // 找到 id 叫 water-bg 的元素，给它使用 ripples（水波纹）特效
        resolution: 512,       // 波纹的清晰度。数字越大越细腻，但也越费手机性能
        dropRadius: 20,        // 水滴砸下去那个圈的半径大小
        perturbance: 0.04,     // 水波扭曲的强度
        interactive: true      // 允许交互：鼠标在上面滑动、点击时，也会产生水波
    });

    // 下面是让水滴自动“下雨”的定时器
    setInterval(function() {
        var $el = $('#water_bg'); // 再次拿到水面元素
        var x = Math.random() * $el.outerWidth(); // 在屏幕宽度内随机取一个 X 坐标
        var y = Math.random() * $el.outerHeight(); // 在屏幕高度内随机取一个 Y 坐标
        var dropRadius = 20; // 水滴半径 20
        var strength = 0.04 + Math.random() * 0.04; // 强度在 0.04 到 0.08 之间随机
        // 命令水波纹插件：在(x,y)位置，滴一滴半径20，强度随机的雨滴
        $el.ripples('drop', x, y, dropRadius, strength);
    }, 1500); // 每隔 1500 毫秒（1.5秒）执行一次上面的代码



    // ==========================================
    // 模块 3：点击物品放大/缩小
    // ==========================================
    const items = document.querySelectorAll('.interactive_item'); // 找到所有带 interactive_item 类的元素（伞、人物、鞋子）

    items.forEach(item => { // 给每一个元素写一段逻辑
        item.addEventListener('click', function(e) { // 当用户点击了这个物品时，执行以下操作
            e.stopPropagation(); // 阻止事件冒泡。意思是：点击了我，就不要再去触发背后的点击事件了（防止点图片时，也被当成点了背景导致图片缩小）
            
            if (this.classList.contains('zoomed')) {
                // 检查我身上有没有 'zoomed' 这个类名。
                // 如果有，说明我当前已经放大了，那么用户再次点击的意思就是想恢复原样
                this.classList.remove('zoomed'); // 把类名删掉，我就能通过CSS缩回去了
            } else {
                // 如果没有，说明当前我是原样，用户想让我放大
                items.forEach(i => i.classList.remove('zoomed')); // 先遍历所有物品，把其他物品身上的放大状态删掉（保证画面只有一个物品被放大）
                this.classList.add('zoomed'); // 然后再给当前被点击的我，加上放大类名
            }
        });
    });

    // 这是一个防止尴尬的兜底操作：
    document.body.addEventListener('click', () => {
        // 当用户点击了整个网页身体(body)的空白处时
        items.forEach(i => i.classList.remove('zoomed')); // 把所有人身上的放大状态都去掉，恢复原状
    });

}); // 结束加载完毕后的执行块
