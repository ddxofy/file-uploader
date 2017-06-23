$('.upload-btn').on('click', function () {
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function () {

    var files = $(this).get(0).files;

    if (files.length > 0) {
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if(file.size > 3146000){
                alert('File too large!');
                $('.firstPage').show();
                return;
            }
            if(file.type != 'image/jpeg' && file.type != 'image/png'){
                alert('Invalid file format!');
                $('.firstPage').show();
                return;
            }
            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('upload successful!\n' + data.Data);
                var reader = new FileReader();
                reader.onload = function () {
                    var output = document.getElementById('output');
                    $("#outputTxt").text("যাহাই দাও আমি এখন বিরিয়ানী!!!");
                    output.src = reader.result;
                };
                reader.readAsDataURL(files[0]);
                $('.firstPage').hide();
                $('.secondPage').show();
            },
            xhr: function () {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function (evt) {

                    if (evt.lengthComputable) {
                        // calculate the percentage of upload completed
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);

                        // update the Bootstrap progress bar with the new percentage
                        $('.progress-bar').text(percentComplete + '%');
                        $('.progress-bar').width(percentComplete + '%');

                        // once the upload reaches 100%, set the progress bar text to done
                        if (percentComplete === 100) {
                            $('.progress-bar').html('Done');
                        }

                    }

                }, false);

                return xhr;
            }
        });

    }
});
