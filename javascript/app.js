(function() {
    // This self-executing function serves as a namespace and executes immediately.

    document.addEventListener('DOMContentLoaded', function() {
        // The code here will execute once the DOM is fully loaded
        try {
            initializeApp();
        } catch (error) {
            console.error("Error during the application initialization:", error);
        }
    });

    function initializeApp() {
        // This function can initialize your application
        setupEventListeners();
        // Other initialization functions
    }

    function setupEventListeners() {
        // Set up event listeners here
        // Example: document.getElementById('myButton').addEventListener(...)

        console.log("Welcome on SimpleHTMLTemplate. Javascript is fully loaded !");
    }

    // Other utility functions can be added here
})();