// 当HTML文档完全加载并解析完成后执行以下代码
document.addEventListener('DOMContentLoaded', function() {
    // 使用 localStorage 检查用户是否已登录（'isLoggedIn'为true表示已登录）
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // --- 分类标签切换功能 ---
    // 获取所有分类标签按钮（带有.tab-btn类的元素）
    const tabBtns = document.querySelectorAll('.tab-btn');
    // 获取下载表格中的所有行（tr元素）
    const downloadRows = document.querySelectorAll('.download-table tbody tr');

    // 遍历每个分类标签按钮
    tabBtns.forEach(btn => {
        // 为按钮添加点击事件监听器
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类（取消激活状态）
            tabBtns.forEach(b => b.classList.remove('active'));
            // 为当前点击的按钮添加active类（激活状态）
            this.classList.add('active');
            // 获取当前按钮的data-category属性值（分类标识）
            const category = this.dataset.category;

            // 遍历所有下载行
            downloadRows.forEach(row => {
                // 如果分类为'all'或行的分类与当前选择一致，则显示行，否则隐藏
                row.style.display = (category === 'all' || row.dataset.category === category) ? '' : 'none';
            });
        });
    });

    // --- 登录/退出功能 ---
    // 获取登录、注册、用户资料、退出按钮的DOM元素
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const userProfile = document.getElementById('user-profile');
    const logoutBtn = document.getElementById('logout-btn');

    // 页面加载时初始化登录状态UI
    if (isLoggedIn) {
        // 已登录：隐藏登录/注册按钮，显示用户资料和退出按钮
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userProfile.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
    }

    // 模拟登录按钮点击事件
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认行为（如跳转）
        isLoggedIn = true; // 设置登录状态为true
        localStorage.setItem('isLoggedIn', 'true'); // 持久化登录状态到本地存储
        // 更新UI
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userProfile.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
    });

    // 模拟退出按钮点击事件
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认行为
        isLoggedIn = false; // 设置登录状态为false
        localStorage.removeItem('isLoggedIn'); // 移除本地存储的登录状态
        // 更新UI
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userProfile.style.display = 'none';
        logoutBtn.style.display = 'none';
    });

    // --- 下载按钮功能 ---
    // 获取所有下载按钮（带有.download-btn类的元素）
    const downloadBtns = document.querySelectorAll('.download-btn');

    // 遍历每个下载按钮
    downloadBtns.forEach(btn => {
        // 为按钮添加点击事件监听器
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转行为
            if (isLoggedIn) {
                // 已登录：获取资源名称并模拟下载
                const resourceName = this.closest('tr').querySelector('h3').textContent;
                alert(`开始下载: ${resourceName}`);
                // 实际项目中此处应为下载链接跳转或API调用：
                // window.location.href = '真实下载链接';
            } else {
                // 未登录：提示用户登录
                alert('您需要登录后才能下载资源！');
                // 可选：自动跳转到登录页
                // window.location.href = 'login.html';
            }
        });
    });
});