
$.getJSON("/articles", function (data) {

  data.map((dbAllArticles) => {
    dbAllArticles.comment.map((comments => {
      console.log(comments.body);
    }))
    $(".display-articles-here").append(
      ` 
            <div class="jumbotron">
            <div class="card mb-2">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${dbAllArticles.articleImage}" class="card-img" alt="article-img" style="width:30%; margin: 17px 0 0 20px;">
                    </div>
                    <div >
                        <div class="card-body">
                            <a href="${dbAllArticles.articleLink}">
                                <h5 class="card-title">${dbAllArticles.title}</h5>
                            </a>
                            <p class="card-text">${dbAllArticles.articleDescription}</p>
                            <p class="card-text"><small class="text-muted">source:${ dbAllArticles.articleSrc}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="input-group input-group-lg">
                <div class="input-group-prepend">
                    <a class="btn btn-primary btn-lg the-red-button" id="${dbAllArticles._id}" role="button">Add a
                        comment</a>
                </div>
                <input type="text" class="form-control" id="comment-${dbAllArticles._id}" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg">
            </div>
            <div id="display-comment-${dbAllArticles._id}">
            ${ dbAllArticles.comment.map((comments => {
        if (comments.body) {
          return (`
                <hr class="my-2">
                <div class="card">
                    <div class="card-body">
                    ${comments.body}
                    </div>
                </div>`)
        }
      })).join("")}
    
            </div>
        </div>
`)
  });
});

$(".display-articles-here").on("click", ".the-red-button", function () {

  var buttonId = $(this).attr("id");
  var comment = $(`#comment-${buttonId}`).val();

  if (comment != "") {
    $.ajax({
      method: "POST",
      url: "/add",
      data: {
        _id: buttonId,
        body: comment,
      }
    })
      .then(function (data) {
        if (comment) {
          $(`#display-comment-${buttonId}`).append(
            ` <hr class="my-2">
              <div class="card">
              <div class="card-body">
                ${comment}
              </div>
            </div>`
          );
        }
        $(`#comment-${buttonId}`).val("");
      });
  } else {
    alert("You have nothing in comment box")
  }
})


