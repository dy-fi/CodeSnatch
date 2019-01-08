function showFile() {
    var picture = document.getElementById('pictureInterface');
    var file = document.getElementById('fileInterface');

    if (picture.style.display === 'block') {
        picture.style.display = 'none';
    }
    if (file.style.display === 'none') {
        file.style.display = 'block';
    }
}

function showPicture() {
    var picture = document.getElementById('pictureInterface');
    var file = document.getElementById('fileInterface');

    if (file.style.display === 'block') {
        file.style.display = 'none';
    }

    if (picture.style.display === 'none') {
        picture.style.display = 'block';
    }
}
