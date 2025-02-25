document.getElementById("logoUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("mainLogo").src = e.target.result;
            document.getElementById("mainLogo").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("bottomLogoUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("bottomLogo").src = e.target.result;
            document.getElementById("bottomLogo").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
