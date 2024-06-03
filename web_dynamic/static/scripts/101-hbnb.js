$(document).ready(function () {
  const reviewsH2 = $(".reviews h2");
  const reviewsSpan = $(".reviews h2 + span");
  const reviewsList = $(".reviews ul");

  reviewsSpan.on("click", function () {
    if (reviewsSpan.text() === "Reviews") {
      getAndDisplayReviews();
    } else if (reviewsSpan.text() === "Hide") {
      reviewsList.empty();
      reviewsSpan.text("Reviews");
    }
  });
});

function getAndDisplayReviews() {
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/places/1/reviews',
    contentType: 'application/json',
    success: function (reviews_data) {
      const reviewsList = $(".reviews ul");
      reviewsList.empty();
      reviews_data.forEach((review) => {
        const $review = $(`<li>
          <h3>From ${review.user.first_name} ${review.user.last_name}</h3>
          <p>${review.text}</p>
        </li>`);
        reviewsList.append($review);
      });
      reviewsSpan.text("Hide");
    },
    error: function () {
      alert("Failed to retrieve data");
    }
  });
}
