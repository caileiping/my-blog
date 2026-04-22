// ==================== 
// 主页逻辑
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const tagList = document.getElementById('tagList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let currentTag = 'all';
    let currentSearch = '';
    let displayedCount = 0;
    const postsPerPage = 6;

    // 初始化标签列表
    function initTags() {
        const tags = getAllTags();
        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag';
            btn.textContent = tag;
            btn.dataset.tag = tag;
            btn.addEventListener('click', () => filterByTag(tag));
            tagList.appendChild(btn);
        });
    }

    // 渲染文章卡片
    function renderPostCard(post) {
        return `
            <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'">
                <div class="post-card-image" style="background: linear-gradient(135deg, #e8d5c4 0%, #d4c4b0 100%);"></div>
                <div class="post-card-content">
                    <div class="post-card-meta">
                        <span class="post-card-date">${post.date}</span>
                        <div class="post-card-tags">
                            ${post.tags.map(tag => `<span class="post-card-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="post-card-excerpt">${post.excerpt}</p>
                </div>
            </article>
        `;
    }

    // 加载文章
    function loadPosts(reset = false) {
        if (reset) {
            displayedCount = 0;
            postsContainer.innerHTML = '';
        }

        let posts = currentSearch ? searchPosts(currentSearch) : getPostsByTag(currentTag);
        
        if (posts.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1;">
                    <div class="no-results-icon">🔍</div>
                    <p>没有找到相关文章</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }

        const postsToShow = posts.slice(displayedCount, displayedCount + postsPerPage);
        
        postsToShow.forEach(post => {
            postsContainer.innerHTML += renderPostCard(post);
        });

        displayedCount += postsToShow.length;

        // 显示/隐藏加载更多按钮
        if (displayedCount >= posts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // 按标签筛选
    function filterByTag(tag) {
        currentTag = tag;
        currentSearch = '';
        searchInput.value = '';

        // 更新标签按钮状态
        document.querySelectorAll('.tag').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tag === tag) {
                btn.classList.add('active');
            }
        });

        loadPosts(true);
    }

    // 搜索功能
    function performSearch() {
        const keyword = searchInput.value.trim();
        if (!keyword) {
            currentSearch = '';
            currentTag = 'all';
            document.querySelectorAll('.tag').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tag === 'all') {
                    btn.classList.add('active');
                }
            });
        } else {
            currentSearch = keyword;
            currentTag = '';
            document.querySelectorAll('.tag').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        loadPosts(true);
    }

    // 事件监听
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    loadMoreBtn.addEventListener('click', () => loadPosts(false));

    // 初始化
    initTags();
    loadPosts();
});
