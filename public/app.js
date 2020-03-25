$(() => {

  const $postContainer = $('#post-container');
  const $form = $('form');

  // <article>
  //   <header>Post Title</header>
  //   <p>The post body</p>
  //   <footer>4</footer>
  // </article>

  const renderPost = (post) => {
    // id, title, body, userId
    const $article = $('<article>');

    const $header = $('<header>').text(`Title: ${post.title}`);
    const $body = $('<p>').text(post.body);

    $.getJSON(`/api/users/${post.userId}`)
      .then((user) => {
        const $footer = $('<footer>').text(`${user.name} (${user.email})`);
        $article.append($header, $body, $footer);
        $postContainer.append($article);
      });
  };

  const renderPosts = (posts) => {
    $postContainer.empty();
    for (const post of posts) {
      renderPost(post);
    }
  };

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/posts',
  //   success: (data) => { console.log(data) },
  //   error: () => { console.error('something bad happened') }
  // });

  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();

    $.post('/api/posts', formData)
      .then((res) => {
        console.log(res);
      });
  });

  const $button = $('#fetch-posts');
  $button.click(() => {
    $.getJSON('/api/posts')
      .then((posts) => {
        console.log(posts);
        renderPosts(posts);
      });
  });

});
