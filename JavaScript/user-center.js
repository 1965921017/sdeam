// 用户中心页面特定的JavaScript
// 监听文档内容加载完成事件
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    // 从本地存储中获取当前用户信息，并将其解析为JavaScript对象。如果本地存储中没有相关信息，则将当前用户设为null
    const currentUser = JSON.parse(localStorage.getItem('sdeam_currentUser')) || null;

    // 如果当前用户为空，即未登录
    if (!currentUser) {
        // 弹出提示框，提示用户先登录
        alert('请先登录！');
        // 重定向到登录页面（index.html）
        window.location.href = 'index.html';
        // 终止当前函数的执行
        return;
    }

    // 加载用户数据
    // 调用loadUserData函数，将当前用户信息作为参数传入，用于加载用户数据到页面上
    loadUserData(currentUser);

    // 初始化标签页
    // 调用initTabs函数，用于初始化页面上的标签页功能
    initTabs();

    // 头像上传
    // 调用initAvatarUpload函数，用于初始化头像上传功能
    initAvatarUpload();

    // 初始化设置表单
    // 调用initSettingsForm函数，用于初始化设置表单功能
    initSettingsForm();

    // 退出登录
    // 获取退出登录按钮元素
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        // 阻止按钮的默认点击行为
        e.preventDefault();
        // 从本地存储中移除当前用户信息
        localStorage.removeItem('sdeam_currentUser');
        // 重定向到登录页面（index.html）
        window.location.href = 'index.html';
    });
});

// 加载用户数据
// 定义loadUserData函数，用于将用户信息显示在页面上
function loadUserData(user) {
    // 将用户的用户名显示在id为user-name的元素中
    document.getElementById('user-name').textContent = user.username;
    // 将用户的邮箱显示在id为user-email的元素中
    document.getElementById('user-email').textContent = user.email;
    // 将用户的头像显示在id为user-avatar的元素中。如果用户没有头像，则显示默认的占位图片
    document.getElementById('user-avatar').src = user.avatar || 'https://via.placeholder.com/150';
    // 将用户的加入日期转换为本地日期格式，并显示在id为join-date的元素中
    document.getElementById('join-date').textContent = new Date(user.joinDate).toLocaleDateString();
    // 将用户的等级显示在id为user-level的元素中。如果用户没有等级信息，则显示默认的“初级玩家”
    document.getElementById('user-level').textContent = user.level || '初级玩家';
    // 将用户的帖子数量显示在id为post-count的元素中。如果用户没有帖子数量信息，则显示0
    document.getElementById('post-count').textContent = user.posts || 0;
    // 将用户的评论数量显示在id为comment-count的元素中。如果用户没有评论数量信息，则显示0
    document.getElementById('comment-count').textContent = user.comments || 0;
}

// 初始化标签页
// 定义initTabs函数，用于初始化页面上的标签页切换功能
function initTabs() {
    // 获取所有的标签按钮元素
    const tabBtns = document.querySelectorAll('.tab-btn');
    // 获取所有的标签内容元素
    const tabContents = document.querySelectorAll('.tab-content');

    // 遍历所有的标签按钮
    tabBtns.forEach(btn => {
        // 为每个标签按钮添加点击事件监听器
        btn.addEventListener('click', function() {
            // 移除所有标签按钮和标签内容的active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 为当前点击的标签按钮添加active类
            this.classList.add('active');
            // 获取当前标签按钮对应的标签内容的id
            const tabId = this.getAttribute('data-tab');
            // 为对应的标签内容添加active类，使其显示
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 头像上传
// 定义initAvatarUpload函数，用于初始化头像上传功能
function initAvatarUpload() {
    // 获取修改头像按钮元素
    const changeAvatarBtn = document.getElementById('change-avatar');
    // 获取头像上传输入框元素
    const avatarUpload = document.getElementById('avatar-upload');
    // 获取用户头像显示元素
    const userAvatar = document.getElementById('user-avatar');

    // 为修改头像按钮添加点击事件监听器
    changeAvatarBtn.addEventListener('click', function() {
        // 模拟点击头像上传输入框，触发文件选择对话框
        avatarUpload.click();
    });

    // 为头像上传输入框添加change事件监听器，当选择文件时触发
    avatarUpload.addEventListener('change', function(e) {
        // 获取用户选择的文件
        const file = e.target.files[0];
        // 如果用户选择了文件
        if (file) {
            // 创建一个FileReader对象，用于读取文件内容
            const reader = new FileReader();

            // 定义FileReader对象的onload事件处理函数，当文件读取完成时触发
            reader.onload = function(event) {
                // 将读取到的文件内容作为用户头像的src属性值，更新头像显示
                userAvatar.src = event.target.result;

                // 更新本地存储中的用户数据
                // 从本地存储中获取当前用户信息，并将其解析为JavaScript对象
                const currentUser = JSON.parse(localStorage.getItem('sdeam_currentUser'));
                // 如果当前用户信息存在
                if (currentUser) {
                    // 更新当前用户的头像信息
                    currentUser.avatar = event.target.result;
                    // 将更新后的用户信息保存到本地存储中
                    localStorage.setItem('sdeam_currentUser', JSON.stringify(currentUser));

                    // 更新用户列表中的头像
                    // 从本地存储中获取所有用户信息，并将其解析为JavaScript对象。如果本地存储中没有相关信息，则将用户列表设为空数组
                    let users = JSON.parse(localStorage.getItem('sdeam_users')) || [];
                    // 查找当前用户在用户列表中的索引
                    const userIndex = users.findIndex(u => u.username === currentUser.username);
                    // 如果找到了当前用户
                    if (userIndex !== -1) {
                        // 更新用户列表中当前用户的头像信息
                        users[userIndex].avatar = event.target.result;
                        // 将更新后的用户列表保存到本地存储中
                        localStorage.setItem('sdeam_users', JSON.stringify(users));
                    }
                }
            };

            // 以DataURL的形式读取用户选择的文件
            reader.readAsDataURL(file);
        }
    });
}

// 初始化设置表单
// 定义initSettingsForm函数，用于初始化设置表单功能
function initSettingsForm() {
    // 获取设置表单元素
    const settingsForm = document.getElementById('settings-form');
    // 从本地存储中获取当前用户信息，并将其解析为JavaScript对象
    const currentUser = JSON.parse(localStorage.getItem('sdeam_currentUser'));

    // 如果设置表单元素存在且当前用户信息存在
    if (settingsForm && currentUser) {
        // 填充现有数据
        // 将当前用户的用户名填充到显示名称输入框中
        document.getElementById('display-name').value = currentUser.username;
        // 将当前用户的签名填充到签名输入框中。如果用户没有签名信息，则填充空字符串
        document.getElementById('signature').value = currentUser.signature || '';

        // 为设置表单添加提交事件监听器
        settingsForm.addEventListener('submit', function(e) {
            // 阻止表单的默认提交行为
            e.preventDefault();

            // 获取用户输入的显示名称，并去除首尾空格
            const displayName = document.getElementById('display-name').value.trim();
            // 获取用户输入的当前密码，并去除首尾空格
            const currentPassword = document.getElementById('current-password').value.trim();
            // 获取用户输入的新密码，并去除首尾空格
            const newPassword = document.getElementById('new-password').value.trim();
            // 获取用户输入的确认新密码，并去除首尾空格
            const confirmNewPassword = document.getElementById('confirm-new-password').value.trim();
            // 获取用户输入的签名，并去除首尾空格
            const signature = document.getElementById('signature').value.trim();

            // 验证当前密码
            // 如果用户输入的当前密码与本地存储中的当前用户密码不一致
            if (currentPassword !== currentUser.password) {
                // 弹出提示框，提示用户当前密码不正确
                alert('当前密码不正确！');
                // 终止当前函数的执行
                return;
            }

            // 验证新密码
            // 如果用户输入了新密码，且新密码与确认新密码不一致
            if (newPassword && newPassword !== confirmNewPassword) {
                // 弹出提示框，提示用户两次输入的新密码不一致
                alert('两次输入的新密码不一致！');
                // 终止当前函数的执行
                return;
            }

            // 更新用户数据
            // 从本地存储中获取所有用户信息，并将其解析为JavaScript对象。如果本地存储中没有相关信息，则将用户列表设为空数组
            let users = JSON.parse(localStorage.getItem('sdeam_users')) || [];
            // 查找当前用户在用户列表中的索引
            const userIndex = users.findIndex(u => u.username === currentUser.username);

            // 如果找到了当前用户
            if (userIndex !== -1) {
                // 更新用户名
                // 如果用户输入了显示名称，且显示名称与当前用户的用户名不一致
                if (displayName && displayName !== currentUser.username) {
                    // 检查用户名是否已存在
                    // 如果用户列表中存在其他用户使用了该显示名称
                    if (users.some(u => u.username === displayName && u.username !== currentUser.username)) {
                        // 弹出提示框，提示用户该用户名已存在
                        alert('用户名已存在！');
                        // 终止当前函数的执行
                        return;
                    }

                    // 更新用户列表中当前用户的用户名
                    users[userIndex].username = displayName;
                }

                // 更新密码
                // 如果用户输入了新密码
                if (newPassword) {
                    // 更新用户列表中当前用户的密码
                    users[userIndex].password = newPassword;
                }

                // 更新签名
                // 更新用户列表中当前用户的签名
                users[userIndex].signature = signature;

                // 保存更新
                // 将更新后的用户列表保存到本地存储中
                localStorage.setItem('sdeam_users', JSON.stringify(users));

                // 更新当前用户
                // 获取更新后的当前用户信息
                const updatedUser = users[userIndex];
                // 将更新后的当前用户信息保存到本地存储中
                localStorage.setItem('sdeam_currentUser', JSON.stringify(updatedUser));

                // 更新页面显示
                // 调用loadUserData函数，将更新后的当前用户信息作为参数传入，用于更新页面上的用户数据显示
                loadUserData(updatedUser);

                // 弹出提示框，提示用户设置已保存
                alert('设置已保存！');
            }
        });
    }
}