document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".view-profile-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var profileSection = document.getElementById("profile_" + btn.getAttribute("data-target"));
            if (profileSection) {
                profileSection.classList.remove("hidden");
                profileSection.classList.add("visible");
                profileSection.setAttribute("aria-hidden", "false");
                profileSection.focus();
            }
        });
    });
    document.querySelectorAll(".close-profile-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var profileSection = btn.closest(".profile-details");
            if (profileSection) {
                profileSection.classList.remove("visible");
                profileSection.classList.add("hidden");
                profileSection.setAttribute("aria-hidden", "true");
            }
        });
    });
});
