document.querySelector("#log_file").addEventListener("change", function () {
    document.getElementById('wordcloud_selector').disabled = true;
    let form_data = new FormData();
    let xhr = new XMLHttpRequest();
    let log_file = document.getElementById('log_file');
    form_data.append("log_file", log_file.files[0]);

    xhr.open("POST", "http://localhost:5000/upload", true);
    xhr.onreadystatechange = function () {
        visualize(xhr.responseText.slice(0,-14), xhr.responseText);
    };
    xhr.send(form_data);
});

function visualize(title, file_name) {
    document.getElementById('title').innerHTML = title;
    document.getElementById('from').innerHTML = file_name;
    document.getElementById('visual').style.display = "block";
    document.getElementById('wordcloud_selector').disabled = false;
}

