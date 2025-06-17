// 当整个 HTML 文档加载完成并解析完毕后，执行以下代码
document.addEventListener('DOMContentLoaded', function() {
    // 视图切换功能
    // 选择所有带有 'view-btn' 类的按钮元素
    const viewBtns = document.querySelectorAll('.view-btn');
    // 选择类名为 'games-grid' 的元素，用于展示游戏列表
    const gamesGrid = document.querySelector('.games-grid');
    
    // 遍历所有视图切换按钮
    viewBtns.forEach(btn => {
        // 为每个按钮添加点击事件监听器
        btn.addEventListener('click', function() {
            // 移除所有按钮的 'active' 类，确保只有一个按钮处于激活状态
            viewBtns.forEach(b => b.classList.remove('active'));
            // 给当前点击的按钮添加 'active' 类，表示该按钮被选中
            this.classList.add('active');
            
            // 根据按钮的 'data-view' 属性值来切换游戏列表的视图
            if (this.dataset.view === 'list') {
                // 如果 'data-view' 属性值为 'list'，则为 'gamesGrid' 元素添加 'list-view' 类
                gamesGrid.classList.add('list-view');
            } else {
                // 否则，移除 'gamesGrid' 元素的 'list-view' 类
                gamesGrid.classList.remove('list-view');
            }
        });
    });
    
    // 模拟登录状态切换
    // 获取登录按钮元素
    const loginBtn = document.getElementById('login-btn');
    // 获取注册按钮元素
    const registerBtn = document.getElementById('register-btn');
    // 获取用户资料显示元素
    const userProfile = document.getElementById('user-profile');
    // 获取退出登录按钮元素
    const logoutBtn = document.getElementById('logout-btn');
    // 获取侧边栏登录区域元素
    const sidebarLogin = document.getElementById('sidebar-login');
    // 获取侧边栏用户信息区域元素
    const sidebarUserInfo = document.getElementById('sidebar-user-info');
    
    // 为登录按钮添加点击事件监听器
    loginBtn.addEventListener('click', function(e) {
        // 阻止按钮的默认点击行为（例如表单提交等）
        e.preventDefault();
        // 隐藏登录按钮
        loginBtn.style.display = 'none';
        // 隐藏注册按钮
        registerBtn.style.display = 'none';
        // 显示用户资料区域
        userProfile.style.display = 'inline-block';
        // 显示退出登录按钮
        logoutBtn.style.display = 'inline-block';
        // 隐藏侧边栏登录区域
        sidebarLogin.style.display = 'none';
        // 显示侧边栏用户信息区域
        sidebarUserInfo.style.display = 'block';
    });
    
    // 为退出登录按钮添加点击事件监听器
    logoutBtn.addEventListener('click', function(e) {
        // 阻止按钮的默认点击行为
        e.preventDefault();
        // 显示登录按钮
        loginBtn.style.display = 'inline-block';
        // 显示注册按钮
        registerBtn.style.display = 'inline-block';
        // 隐藏用户资料区域
        userProfile.style.display = 'none';
        // 隐藏退出登录按钮
        logoutBtn.style.display = 'none';
        // 显示侧边栏登录区域
        sidebarLogin.style.display = 'block';
        // 隐藏侧边栏用户信息区域
        sidebarUserInfo.style.display = 'none';
    });
});