// MOD专区倒计时功能
// 监听文档内容加载完成事件，当HTML文档完全加载并解析完成后，执行回调函数
document.addEventListener('DOMContentLoaded', function() {
    // 设置目标日期 - 2025年8月15日
    // 使用Date对象创建一个表示2025年8月15日00:00:00的日期对象，并获取其时间戳（从1970年1月1日开始的毫秒数）
    const targetDate = new Date('August 15, 2025 00:00:00').getTime();
    
    // 更新倒计时
    // 定义一个名为updateCountdown的函数，用于更新倒计时显示
    function updateCountdown() {
        // 获取当前时间的时间戳
        const now = new Date().getTime();
        // 计算目标日期与当前日期之间的时间差（毫秒数）
        const distance = targetDate - now;
        
        // 计算天、时、分、秒
        // 计算距离目标日期还剩多少天，通过将总毫秒数除以一天的毫秒数（1000 * 60 * 60 * 24）并向下取整得到
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // 计算除去整天数后剩余的毫秒数对应的小时数，先取模得到剩余毫秒数，再除以一小时的毫秒数（1000 * 60 * 60）并向下取整
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // 计算除去整小时数后剩余的毫秒数对应的分钟数，先取模得到剩余毫秒数，再除以一分钟的毫秒数（1000 * 60）并向下取整
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // 计算除去整分钟数后剩余的毫秒数对应的秒数，先取模得到剩余毫秒数，再除以一秒的毫秒数（1000）并向下取整
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 显示结果
        // 在HTML文档中找到id为'days'的元素，并将计算得到的天数以两位数格式（不足两位前面补0）显示
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        // 在HTML文档中找到id为'hours'的元素，并将计算得到的小时数以两位数格式（不足两位前面补0）显示
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        // 在HTML文档中找到id为'minutes'的元素，并将计算得到的分钟数以两位数格式（不足两位前面补0）显示
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        // 在HTML文档中找到id为'seconds'的元素，并将计算得到的秒数以两位数格式（不足两位前面补0）显示
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // 如果倒计时结束
        // 当时间差小于0时，说明已经过了目标日期
        if (distance < 0) {
            // 清除之前设置的定时器，停止更新倒计时
            clearInterval(countdownTimer);
            // 在HTML文档中找到类名为'countdown'的元素，并将其内容替换为提示信息，表示MOD专区已上线
            document.querySelector('.countdown').innerHTML = '<div class="countdown-complete">MOD专区已上线！</div>';
        }
    }
    
    // 立即执行一次，然后每秒钟更新一次
    // 首次调用updateCountdown函数，确保页面加载时就显示正确的倒计时
    updateCountdown();
    // 设置一个定时器，每隔1000毫秒（即1秒）调用一次updateCountdown函数，实现倒计时的实时更新
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // 订阅表单处理
    // 在HTML文档中找到类名为'subscribe-form'下的form元素
    const subscribeForm = document.querySelector('.subscribe-form form');
    // 检查是否找到了订阅表单元素
    if (subscribeForm) {
        // 为表单的提交事件添加监听器，当表单提交时执行回调函数
        subscribeForm.addEventListener('submit', function(e) {
            // 阻止表单的默认提交行为，避免页面刷新
            e.preventDefault();
            // 获取表单中type为'email'的输入框的值，即用户输入的邮箱地址
            const email = this.querySelector('input[type="email"]').value;
            
            // 这里可以添加表单验证和AJAX提交逻辑
            // 弹出一个提示框，显示感谢订阅的信息，并包含用户输入的邮箱地址
            alert(`感谢订阅！我们将在MOD专区上线时通知 ${email}`);
            // 清空表单中type为'email'的输入框的值，方便用户再次输入
            this.querySelector('input[type="email"]').value = '';
        });
    }
});