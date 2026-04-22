// ==================== 
// 文章详情页逻辑
// ====================

document.addEventListener('DOMContentLoaded', function() {
    // 获取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    if (!postId) {
        window.location.href = 'index.html';
        return;
    }

    const post = getPostById(postId);
    if (!post) {
        window.location.href = 'index.html';
        return;
    }

    // 渲染文章内容
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postDate').textContent = '📅 ' + post.date;
    document.getElementById('postTags').innerHTML = post.tags
        .map(tag => `<span class="post-tag">${tag}</span>`)
        .join('');
    document.getElementById('postContent').innerHTML = post.content;

    // 设置页面标题
    document.title = post.title + ' | 我的随笔';

    // 渲染评论
    renderComments();

    // 上一篇/下一篇
    setupPostNavigation(postId);

    // 评论表单提交
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('commentName').value.trim();
        const email = document.getElementById('commentEmail').value.trim();
        const content = document.getElementById('commentContent').value.trim();

        if (!name || !email || !content) {
            alert('请填写完整信息');
            return;
        }

        const comment = {
            author: name,
            email: email,
            content: content
        };

        addComment(postId, comment);
        
        // 清空表单
        document.getElementById('commentName').value = '';
        document.getElementById('commentEmail').value = '';
        document.getElementById('commentContent').value = '';

        // 重新渲染评论
        renderComments();
        
        alert('评论发表成功！');
    });

    // 渲染评论列表
    function renderComments() {
        const commentsList = document.getElementById('commentsList');
        const comments = getComments(postId);

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: #999; text-align: center; padding: 32px;">暂无评论，来发表第一条评论吧！</p>';
            return;
        }

        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author)}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-content">${escapeHtml(comment.content)}</div>
            </div>
        `).join('');
    }

    // 设置上一篇/下一篇导航
    function setupPostNavigation(currentId) {
        const posts = blogData.posts;
        const currentIndex = posts.findIndex(p => p.id === currentId);
        
        const prevPost = document.getElementById('prevPost');
        const nextPost = document.getElementById('nextPost');

        // 上一篇
        if (currentIndex > 0) {
            const prev = posts[currentIndex - 1];
            prevPost.href = `post.html?id=${prev.id}`;
            prevPost.querySelector('.nav-title').textContent = prev.title;
        } else {
            prevPost.style.visibility = 'hidden';
        }

        // 下一篇
        if (currentIndex < posts.length - 1) {
            const next = posts[currentIndex + 1];
            nextPost.href = `post.html?id=${next.id}`;
            nextPost.querySelector('.nav-title').textContent = next.title;
        } else {
            nextPost.style.visibility = 'hidden';
        }
    }

    // HTML 转义，防止 XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
