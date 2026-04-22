// ==================== 
// 标签云页逻辑
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const tagsCloud = document.getElementById('tagsCloud');
    const tagPosts = document.getElementById('tagPosts');
    const selectedTagName = document.getElementById('selectedTagName');
    const tagPostsList = document.getElementById('tagPostsList');

    // 获取所有标签及文章数量
    const tagCounts = {};
    blogData.posts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    const tags = Object.keys(tagCounts).sort();

    // 渲染标签云
    tags.forEach(tag => {
        const link = document.createElement('a');
        link.className = 'tag-cloud-item';
        link.textContent = `${tag} (${tagCounts[tag]})`;
        link.href = '#';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showTagPosts(tag);
        });
        tagsCloud.appendChild(link);
    });

    // 显示选中标签的文章
    function showTagPosts(tag) {
        selectedTagName.textContent = tag;
        tagPosts.style.display = 'block';
        
        const posts = getPostsByTag(tag);
        tagPostsList.innerHTML = posts.map(post => `
            <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'">
                <div class="post-card-image" style="background: linear-gradient(135deg, #e8d5c4 0%, #d4c4b0 100%);"></div>
                <div class="post-card-content">
                    <div class="post-card-meta">
                        <span class="post-card-date">${post.date}</span>
                        <div class="post-card-tags">
                            ${post.tags.map(t => `<span class="post-card-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="post-card-excerpt">${post.excerpt}</p>
                </div>
            </article>
        `).join('');

        // 滚动到文章列表
        tagPosts.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 检查 URL 参数，如果有标签则直接显示
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');
    if (selectedTag && tags.includes(selectedTag)) {
        showTagPosts(selectedTag);
    }
});
