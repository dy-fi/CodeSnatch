function showFile() {
    var picture = document.getElementById('pictureInterface');
    var file = document.getElementById('fileInterface');

    picture.style.display = 'none';
    file.style.display = 'block';
}

function showPicture() {
    var picture = document.getElementById('pictureInterface');
    var file = document.getElementById('fileInterface');

    file.style.display = 'none';
    picture.style.display = 'block';
}

// update status
function setStatus() {
    document.getElementById('status').innerHTML = 'Status: loading...'
}

function formatText() {
    var text = document.getElementById('text-body');
    // regex to convert text to HTML display format
    text = text.innerHTML.replace(/(?:\r\n|\r|\n)/g, '<br>');

}
