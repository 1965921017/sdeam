// 用户数据模拟：从本地存储中获取用户数据，如果本地存储中没有，则初始化为空数组
let users = JSON.parse(localStorage.getItem('sdeam_users')) || [];
// 当前登录用户：从本地存储中获取当前登录用户数据，如果本地存储中没有，则初始化为 null
let currentUser = JSON.parse(localStorage.getItem('sdeam_currentUser')) || null;

// DOM加载完成后执行一系列初始化操作
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有已登录用户，更新页面上的登录状态显示
    checkLoginStatus();
    
    // 初始化轮播图功能
    initSlider();
    
    // 初始化模态框（登录和注册模态框）
    initModals();
    
    // 初始化登录表单的处理逻辑
    initLoginForm();
    
    // 初始化注册表单的处理逻辑
    initRegisterForm();
    
    // 初始化退出登录按钮的处理逻辑
    initLogout();
    
    // 初始化页面的响应式调整功能
    initResponsive();
    
    // 初始化游戏卡片的悬停效果
    initGameCards();
});

// 检查登录状态并更新页面上的相关元素显示
function checkLoginStatus() {
    // 获取登录按钮元素
    const loginBtn = document.getElementById('login-btn');
    // 获取注册按钮元素
    const registerBtn = document.getElementById('register-btn');
    // 获取用户个人资料元素
    const userProfile = document.getElementById('user-profile');
    // 获取退出登录按钮元素
    const logoutBtn = document.getElementById('logout-btn');
    // 获取侧边栏登录区域元素
    const sidebarLogin = document.getElementById('sidebar-login');
    // 获取侧边栏用户信息区域元素
    const sidebarUserInfo = document.getElementById('sidebar-user-info');
    
    if (currentUser) {
        // 用户已登录
        // 隐藏登录按钮
        loginBtn.style.display = 'none';
        // 隐藏注册按钮
        registerBtn.style.display = 'none';
        // 显示用户个人资料
        userProfile.style.display = 'inline-block';
        // 显示退出登录按钮
        logoutBtn.style.display = 'inline-block';
        
        // 更新侧边栏用户信息
        // 隐藏侧边栏登录区域
        sidebarLogin.style.display = 'none';
        // 显示侧边栏用户信息区域
        sidebarUserInfo.style.display = 'block';
        // 设置侧边栏用户名文本
        document.getElementById('sidebar-username').textContent = currentUser.username;
        // 设置用户头像图片的源地址，如果没有头像则使用占位图
        document.getElementById('user-avatar-img').src = currentUser.avatar || 'https://via.placeholder.com/80';
    } else {
        // 用户未登录
        // 显示登录按钮
        loginBtn.style.display = 'inline-block';
        // 显示注册按钮
        registerBtn.style.display = 'inline-block';
        // 隐藏用户个人资料
        userProfile.style.display = 'none';
        // 隐藏退出登录按钮
        logoutBtn.style.display = 'none';
        
        // 显示侧边栏登录区域
        sidebarLogin.style.display = 'block';
        // 隐藏侧边栏用户信息区域
        sidebarUserInfo.style.display = 'none';
    }
}

// 轮播图初始化函数
function initSlider() {
    // 获取所有的幻灯片元素
    const slides = document.querySelectorAll('.slide');
    // 获取上一张幻灯片按钮元素
    const prevBtn = document.querySelector('.prev-slide');
    // 获取下一张幻灯片按钮元素
    const nextBtn = document.querySelector('.next-slide');
    // 当前显示的幻灯片索引
    let currentSlide = 0;
    // 幻灯片自动切换的定时器
    let slideInterval;
    
    // 显示指定索引的幻灯片
    function showSlide(n) {
        // 移除所有幻灯片的活动类
        slides.forEach(slide => slide.classList.remove('active'));
        // 计算新的幻灯片索引，确保索引在有效范围内
        currentSlide = (n + slides.length) % slides.length;
        // 为当前幻灯片添加活动类
        slides[currentSlide].classList.add('active');
    }
    
    // 显示下一张幻灯片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // 显示上一张幻灯片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // 为下一张幻灯片按钮添加点击事件监听器
    nextBtn.addEventListener('click', nextSlide);
    // 为上一张幻灯片按钮添加点击事件监听器
    prevBtn.addEventListener('click', prevSlide);
    
    // 开始幻灯片自动切换
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 获取轮播图容器元素
    const slider = document.querySelector('.slider');
    // 当鼠标进入轮播图容器时，停止自动切换
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // 当鼠标离开轮播图容器时，重新开始自动切换
    slider.addEventListener('mouseleave', startSlider);
    
    // 启动幻灯片自动切换
    startSlider();
}

// 模态框初始化函数
function initModals() {
    // 获取登录模态框元素
    const loginModal = document.getElementById('login-modal');
    // 获取注册模态框元素
    const registerModal = document.getElementById('register-modal');
    // 获取登录按钮元素
    const loginBtn = document.getElementById('login-btn');
    // 获取注册按钮元素
    const registerBtn = document.getElementById('register-btn');
    // 获取显示注册表单的按钮元素
    const showRegister = document.getElementById('show-register');
    // 获取显示登录表单的按钮元素
    const showLogin = document.getElementById('show-login');
    // 获取所有关闭模态框的按钮元素
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // 为登录按钮添加点击事件监听器，点击时显示登录模态框
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
    
    // 为注册按钮添加点击事件监听器，点击时显示注册模态框
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
    
    // 为显示注册表单的按钮添加点击事件监听器，点击时隐藏登录模态框并显示注册模态框
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    // 为显示登录表单的按钮添加点击事件监听器，点击时隐藏注册模态框并显示登录模态框
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // 为所有关闭模态框的按钮添加点击事件监听器，点击时隐藏登录和注册模态框
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // 为窗口添加点击事件监听器，当点击模态框外部时，隐藏相应的模态框
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
}

// 登录表单处理函数
function initLoginForm() {
    // 获取主登录表单元素
    const loginForm = document.getElementById('login-form');
    // 获取侧边栏登录表单元素
    const sidebarLoginForm = document.getElementById('sidebar-login-form');
    
    if (loginForm) {
        // 为主登录表单添加提交事件监听器
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 获取输入的用户名并去除首尾空格
            const username = document.getElementById('login-username').value.trim();
            // 获取输入的密码并去除首尾空格
            const password = document.getElementById('login-password').value.trim();
            
            if (!username) {
                // 如果用户名为空，弹出提示框
                alert('请输入用户名');
                return;
            }
            
            if (!password) {
                // 如果密码为空，弹出提示框
                alert('请输入密码');
                return;
            }
            
            // 验证用户，查找匹配的用户
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // 登录成功
                // 设置当前登录用户
                currentUser = user;
                // 将当前登录用户信息存储到本地存储
                localStorage.setItem('sdeam_currentUser', JSON.stringify(currentUser));
                
                // 更新页面上的登录状态显示
                checkLoginStatus();
                
                // 关闭登录模态框
                document.getElementById('login-modal').style.display = 'none';
                
                // 清空登录表单
                loginForm.reset();
                
                // 弹出登录成功提示框
                alert('登录成功！');
            } else {
                // 用户名或密码错误，弹出提示框
                alert('用户名或密码错误！');
            }
        });
    }
    
    // 侧边栏登录表单处理
    if (sidebarLoginForm) {
        // 为侧边栏登录表单添加提交事件监听器
        sidebarLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 获取表单中的所有输入元素
            const inputs = this.querySelectorAll('input');
            // 获取输入的用户名并去除首尾空格
            const username = inputs[0].value.trim();
            // 获取输入的密码并去除首尾空格
            const password = inputs[1].value.trim();
            
            if (!username || !password) {
                // 如果用户名或密码为空，弹出提示框
                alert('请输入用户名和密码');
                return;
            }
            
            // 验证用户，查找匹配的用户
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // 登录成功
                // 设置当前登录用户
                currentUser = user;
                // 将当前登录用户信息存储到本地存储
                localStorage.setItem('sdeam_currentUser', JSON.stringify(currentUser));
                // 更新页面上的登录状态显示
                checkLoginStatus();
                // 清空侧边栏登录表单
                sidebarLoginForm.reset();
                // 弹出登录成功提示框
                alert('登录成功！');
            } else {
                // 用户名或密码错误，弹出提示框
                alert('用户名或密码错误！');
            }
        });
    }
}

// 注册表单处理函数
function initRegisterForm() {
    // 获取注册表单元素
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        // 为注册表单添加提交事件监听器
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单中的各项输入值并去除首尾空格
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const confirmPassword = document.getElementById('reg-confirm-password').value.trim();
            // 获取用户是否同意用户协议的勾选状态
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            // 标记表单是否有效
            let isValid = true;
            
            // 验证用户名
            // 获取用户名错误提示元素
            const usernameError = document.getElementById('username-error');
            if (username.length < 4 || username.length > 16 || !/^[a-zA-Z0-9]+$/.test(username)) {
                // 用户名不符合长度或格式要求，显示错误提示
                usernameError.textContent = '用户名必须是4-16位字母或数字';
                isValid = false;
            } else if (users.some(u => u.username === username)) {
                // 用户名已存在，显示错误提示
                usernameError.textContent = '用户名已存在';
                isValid = false;
            } else {
                // 用户名验证通过，清除错误提示
                usernameError.textContent = '';
            }
            
            // 验证邮箱
            // 获取邮箱错误提示元素
            const emailError = document.getElementById('email-error');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // 邮箱格式不正确，显示错误提示
                emailError.textContent = '请输入有效的邮箱地址';
                isValid = false;
            } else if (users.some(u => u.email === email)) {
                // 邮箱已被注册，显示错误提示
                emailError.textContent = '邮箱已被注册';
                isValid = false;
            } else {
                // 邮箱验证通过，清除错误提示
                emailError.textContent = '';
            }
            
            // 验证密码
            // 获取密码错误提示元素
            const passwordError = document.getElementById('password-error');
            if (password.length < 6 || password.length > 20) {
                // 密码不符合长度要求，显示错误提示
                passwordError.textContent = '密码必须是6-20位字符';
                isValid = false;
            } else {
                // 密码验证通过，清除错误提示
                passwordError.textContent = '';
            }
            
            // 验证确认密码
            // 获取确认密码错误提示元素
            const confirmPasswordError = document.getElementById('confirm-password-error');
            if (password !== confirmPassword) {
                // 两次输入的密码不一致，显示错误提示
                confirmPasswordError.textContent = '两次输入的密码不一致';
                isValid = false;
            } else {
                // 确认密码验证通过，清除错误提示
                confirmPasswordError.textContent = '';
            }
            
            // 验证用户协议
            if (!agreeTerms) {
                // 用户未同意用户协议，弹出提示框
                alert('请同意用户协议和隐私政策');
                return;
            }
            
            if (isValid) {
                // 表单验证通过，创建新用户
                const newUser = {
                    username,
                    email,
                    password,
                    // 默认头像
                    avatar: 'https://via.placeholder.com/80',
                    // 用户加入日期
                    joinDate: new Date().toISOString(),
                    // 用户等级
                    level: '初级玩家',
                    // 用户发布的帖子数量
                    posts: 0,
                    // 用户发表的评论数量
                    comments: 0
                };
                
                // 将新用户添加到用户数组中
                users.push(newUser);
                // 将更新后的用户数组存储到本地存储
                localStorage.setItem('sdeam_users', JSON.stringify(users));
                
                // 自动登录新用户
                currentUser = newUser;
                // 将当前登录用户信息存储到本地存储
                localStorage.setItem('sdeam_currentUser', JSON.stringify(currentUser));
                // 更新页面上的登录状态显示
                checkLoginStatus();
                
                // 关闭注册模态框并重置表单
                document.getElementById('register-modal').style.display = 'none';
                registerForm.reset();
                
                // 弹出注册成功并已自动登录的提示框
                alert('注册成功！已自动登录');
            }
        });
    }
}

// 退出登录处理函数
function initLogout() {
    // 获取退出登录按钮元素
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        // 为退出登录按钮添加点击事件监听器
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // 将当前登录用户设置为 null
            currentUser = null;
            // 从本地存储中移除当前登录用户信息
            localStorage.removeItem('sdeam_currentUser');
            // 更新页面上的登录状态显示
            checkLoginStatus();
            // 弹出已退出登录的提示框
            alert('已退出登录');
        });
    }
}

// 响应式设计处理函数
function initResponsive() {
    // 处理窗口大小变化的函数
    function handleResize() {
        if (window.innerWidth < 1200) {
            // 当窗口宽度小于 1200px 时，设置容器宽度为 95%
            document.querySelector('.container').style.width = '95%';
        } else {
            // 当窗口宽度大于等于 1200px 时，设置容器宽度为 1200px
            document.querySelector('.container').style.width = '1200px';
        }
    }
    
    // 为窗口添加大小变化事件监听器
    window.addEventListener('resize', handleResize);
    // 首次加载时调用处理函数
    handleResize();
}

// 游戏卡片效果处理函数
function initGameCards() {
    // 获取所有游戏卡片元素
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        // 为每个游戏卡片添加鼠标进入事件监听器，鼠标进入时改变卡片的阴影效果
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        // 为每个游戏卡片添加鼠标离开事件监听器，鼠标离开时恢复卡片的阴影效果
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });
}