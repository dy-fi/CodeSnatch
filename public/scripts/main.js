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

$('#status').onbeforeunload = function() {
    try {
        tesseract.terminate();
    } catch {
        console.err;
    }
}
