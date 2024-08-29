document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    // Create review item
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <p><strong>${name}</strong> - ${rating} Stars</p>
        <p>${text}</p>
        <button onclick="editReview(this)">Edit</button>
        <button onclick="deleteReview(this)">Delete</button>
    `;

    // Add review to container
    document.getElementById('reviewsContainer').appendChild(reviewItem);

    // Clear form
    document.getElementById('reviewForm').reset();
});

function deleteReview(button) {
    const reviewItem = button.parentElement;
    reviewItem.remove(); // Remove the review item
}

function editReview(button) {
    const reviewItem = button.parentElement;
    const name = prompt("Edit name:", reviewItem.children[0].textContent.split(" - ")[0]);
    const rating = prompt("Edit rating (1-5):", reviewItem.children[0].textContent.split(" - ")[1].split(" ")[0]);
    const text = prompt("Edit review text:", reviewItem.children[1].textContent);

    if (name && rating && text) {
        reviewItem.children[0].innerHTML = `<strong>${name}</strong> - ${rating} Stars`;
        reviewItem.children[1].textContent = text;
    }
}