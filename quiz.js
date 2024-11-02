
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Collect form data
    const formData = new FormData(event.target);

    // You can use formData to send the data to the server for storage or further processing
    // For now, we'll just display a thank you message.
    document.getElementById("surveyForm").style.display = "none";
    document.getElementById("thankyouMessage").style.display = "block";

    console.log("Form submitted. Here's the data:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
    }
});
