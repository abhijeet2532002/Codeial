{
    console.log('welcome to the coding line');

    let createPost = function () {
        console.log('Abhijeet');
        let createPost = $('#create-posts-buttom');
        createPost.submit(function (e) {
            e.preventDefault();
            // console.log(createPost.serialize());
            $.ajax({
                type: 'post',
                url: "/post/create",
                data: createPost.serialize(),
                success: function (data) {
                    console.log(data.data.post);
                    let letPostCreate = letCreatePost(data.data.post);
                    $('#post-container >ul').prepend(letPostCreate);
                }, error: function (err) {
                    console.log.bind(err);
                }
            })
        })
    }

    let letCreatePost = function (posts) {
        return $(`
        <li id="${posts.id}" class="text-start border border-2 border-dark px-2 mb-1 rounded-3">

            <blockquote class="blockquote m-0 px-2 fw-bolder">
                <p class="d-inline">
                    ${posts.msg}
                </p>
            </blockquote>

            <figcaption class="blockquote-footer text-end fw-bolder mb-2 px-2">
                <a class="btn btn-outline-danger me-2" href="/post/delete/${posts.id}">Delete</a>
                ${posts.user.name}
            </figcaption>

            <div class="card border border-0 my-2">
                <div class="card-body p-0">
                    <form action="/comment/create/${posts.id}" method="post">
                        <div class="input-group mb-2">
                            <span class="input-group-text fw-bold fs-5">Comment : </span>
                            <textarea class="form-control fw-bold" name="content" aria-label="With textarea"
                                placeholder="Enter comment here ....."></textarea>
                        </div>
                        <button type="submit" class="me-1 btn btn-success fw-bold">Submit</button>
                        <button type="reset" class="me-1 btn btn-warning fw-bold">Reset</button>
                    </form>
                </div>
            </div>
        </li>`);
    }

    createPost();
}