document.addEventListener('DOMContentLoaded', loadReviews);

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    // Create review object
    const review = { name, text, rating };

    // Add review to localStorage
    saveReview(review);

    // Add review to the DOM
    addReviewToDOM(review);

    // Clear form
    document.getElementById('reviewForm').reset();
});

function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => addReviewToDOM(review));
}

function addReviewToDOM(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <p><strong>${review.name}</strong> - ${review.rating} Stars</p>
        <p>${review.text}</p>
        <button onclick="editReview(this)">Edit</button>
        <button onclick="deleteReview(this)">Delete</button>
    `;
    document.getElementById('reviewsContainer').appendChild(reviewItem);
}

function deleteReview(button) {
    const reviewItem = button.parentElement;
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = reviews.filter(review => 
        review.name !== reviewItem.querySelector('strong').textContent || 
        review.text !== reviewItem.children[1].textContent
    );
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    reviewItem.remove(); // Remove the review item from the DOM
}

function editReview(button) {
    const reviewItem = button.parentElement;
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const name = prompt("Edit name:", reviewItem.children[0].textContent.split(" - ")[0]);
    const rating = prompt("Edit rating (1-5):", reviewItem.children[0].textContent.split(" - ")[1].split(" ")[0]);
    const text = prompt("Edit review text:", reviewItem.children[1].textContent);

    if (name && rating && text) {
        // Update the review in localStorage
        reviews.forEach(review => {
            if (review.name === reviewItem.children[0].textContent.split(" - ")[0] && 
                review.text === reviewItem.children[1].textContent) {
                review.name = name;
                review.rating = rating;
                review.text = text;
            }
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Update the review in the DOM
        reviewItem.children[0].innerHTML = `<strong>${name}</strong> - ${rating} Stars`;
        reviewItem.children[1].textContent = text;
    }
}
