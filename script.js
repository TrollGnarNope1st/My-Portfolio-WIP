document.addEventListener("DOMContentLoaded", function() {
    // --- Reveal Animations logic ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact Form logic ---
    var form = document.getElementById("contactForm");
    var status = document.getElementById("status");

    // This function handles the form submission
    async function handleSubmit(event) {
        // Stop the form from reloading the page
        event.preventDefault();
        var data = new FormData(event.target);
        
        // Show a loading state if desired (optional)
        if (status) {
            status.innerHTML = "Sending...";
            status.style.color = "var(--text-main)";
        }

        // Send the form data to Formspree
        fetch(event.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // If the submission was successful...
            if (response.ok) {
                // Show a success message and clear the form
                status.innerHTML = "Thanks for your submission!";
                status.style.color = "var(--accent-color)";
                form.reset();
            } else {
                // If there was an error...
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                    }
                    status.style.color = "#ff4d4d";
                })
            }
        }).catch(error => {
            // Catch network errors
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.style.color = "#ff4d4d";
        });
    }

    // Add the submit event listener to the form
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});
