// 当HTML文档的初始内容（DOM）加载完成后，执行以下代码
document.addEventListener('DOMContentLoaded', function() {
    // 分类筛选功能

    // 获取id为'news-category'的下拉选择框元素，用于选择新闻分类
    const categorySelect = document.getElementById('news-category');
    // 获取id为'news-sort'的下拉选择框元素，用于选择新闻排序方式
    const sortSelect = document.getElementById('news-sort');
    
    // 为分类选择框添加change事件监听器，当选择项改变时调用filterNews函数
    categorySelect.addEventListener('change', filterNews);
    // 为排序选择框添加change事件监听器，当选择项改变时调用filterNews函数
    sortSelect.addEventListener('change', filterNews);
    
    // 定义筛选新闻的函数
    function filterNews() {
        // 获取当前选择的新闻分类的值
        const category = categorySelect.value;
        // 获取当前选择的新闻排序方式的值
        const sort = sortSelect.value;
        
        // 这里可以添加AJAX请求或实际筛选逻辑
        // 打印当前的筛选条件，包括分类和排序方式
        console.log(`筛选条件: 分类=${category}, 排序=${sort}`);
    }
    
    // 分页点击效果

    // 获取所有带有'pagination'类的元素下的a标签，即分页链接
    const paginationLinks = document.querySelectorAll('.pagination a');
    // 遍历所有分页链接
    paginationLinks.forEach(link => {
        // 为每个分页链接添加click事件监听器
        link.addEventListener('click', function(e) {
            // 阻止链接的默认跳转行为
            e.preventDefault();
            
            // 移除所有分页链接的'active'类，用于取消之前的激活状态
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // 为当前点击的链接添加'active'类，使其处于激活状态
            this.classList.add('active');
            
            // 这里可以添加分页加载逻辑
            // 打印跳转到的页码
            console.log(`跳转到第 ${this.textContent} 页`);
        });
    });
    
    // 热门资讯点击效果

    // 获取所有带有'hot-news-item'类的元素下的a标签，即热门资讯链接
    const hotNewsItems = document.querySelectorAll('.hot-news-item a');
    // 遍历所有热门资讯链接
    hotNewsItems.forEach(item => {
        // 为每个热门资讯链接添加click事件监听器
        item.addEventListener('click', function(e) {
            // 阻止链接的默认跳转行为
            e.preventDefault();
            // 打印查看的热门资讯的标题
            console.log(`查看热门资讯: ${this.querySelector('h4').textContent}`);
        });
    });
    
    // 分享功能

    // 获取所有带有'news-meta'类的元素下的最后一个span标签，即分享按钮
    const shareButtons = document.querySelectorAll('.news-meta span:last-child');
    // 遍历所有分享按钮
    shareButtons.forEach(button => {
        // 为每个分享按钮添加click事件监听器
        button.addEventListener('click', function() {
            // 获取当前新闻项的标题
            const newsTitle = this.closest('.news-item').querySelector('.news-title').textContent;
            // 打印分享的新闻标题
            console.log(`分享资讯: ${newsTitle}`);
            // 弹出提示框，显示已分享的新闻标题
            alert(`已分享资讯: ${newsTitle}`);
        });
    });
});