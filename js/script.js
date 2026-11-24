$(document).ready(function() {
    let menuTabs = $(".menu-tab-button");

    if (menuTabs.length > 0) {
        menuTabs.click(function() {
            menuTabs.removeClass("active");
            $(this).addClass("active");
        });

        $(window).scroll(function() {
            let scrollPos = $(window).scrollTop() + 200;

            $(".menu-section a[name]").each(function() {
                if ($(this).offset().top <= scrollPos) {
                    let currentName = $(this).attr("name");
                    menuTabs.removeClass("active");
                    $('.menu-tab-button[href="#' + currentName + '"]').addClass("active");
                }
            });
        });
    }

    $("#contact-form").submit(function(e) {
        e.preventDefault();

        let name = $("#contact-name").val().trim();
        let email = $("#contact-email").val().trim();
        let subject = $("#contact-subject option:selected").text();

        $("#contact-feedback").remove();

        let banner =
            '<div id="contact-feedback" class="form-feedback-banner">' +
                "<strong>Thank you, " + name + "!</strong> " +
                "We have received your <em>" + subject + "</em> inquiry " +
                "and will reply to <strong>" + email + "</strong> shortly." +
            "</div>";

        $(this).find("fieldset").prepend(banner);
        this.reset();
    });

    $("#review-form").submit(function(e) {
        e.preventDefault();

        let name = $("#review-name").val().trim();
        let rating = Number($("#review-rating").val());
        let message = $("#review-message").val().trim();

        let stars = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += "&#9733;";
            } else {
                stars += "&#9734;";
            }
        }

        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date();
        let dateLabel = months[today.getMonth()] + " " + today.getFullYear();

        let newCard =
            '<article class="review-card">' +
                '<div class="review-stars">' + stars + "</div>" +
                '<p class="review-quote">&ldquo;' + message + "&rdquo;</p>" +
                '<div class="review-author">' +
                    "<h3>" + name + "</h3>" +
                    "<span>Verified Guest &bull; " + dateLabel + "</span>" +
                "</div>" +
            "</article>";

        $(".reviews-grid").append(newCard);

        $("#review-feedback").remove();

        let banner =
            '<div id="review-feedback" class="form-feedback-banner">' +
                "<strong>Thank you, " + name + "!</strong> Your review has been posted above." +
            "</div>";

        $(this).find("fieldset").prepend(banner);
        this.reset();
    });
});