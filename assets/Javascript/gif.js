$(document).ready(function() {
    /*Global Variables
    ==============================================================*/
    var topics = ["clouds", "summer", "rain ", "waterfall"];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
    /*Functions
    ==============================================================*/
    var createBtn = function() {
        //removes all elements within the btn-section
        $('#btn-section').empty();
        //Create buttons based on elements in array
        for (var i = 0; i < topics.length; i++) {
            //Creates new buttons
            var newBtn = $('<button>');
            //Give button an attribute 
            newBtn.attr('data-name', topics[i]);
            //Add class to button
            newBtn.attr('class', 'gif');
            //Give button name that reflext array
            newBtn.text(topics[i]);
            //Add button to DOM
            $('#btn-section').append(newBtn);
        }
    }

//When submit button is clicked .............
$('#submit-btn').on('click', function(event) {
    submit();
});

$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});


    var submit = function() {
            event.preventDefault();
           
            var inputVal = $('#userInput').val();
            
            topics.push(inputVal);
            //Create new buttons
            createBtn();
            // log test
            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key 
        var apiKey = 'O9hkQPMv6GXthnv9pNQAvN9PQgyfaRAs';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            //removes images when new btn is clicked
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
                //Still & Animated Images
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];
                
                var newDiv = $('<div>'); 
                var newP = $('<p>'); 
                var newImg = $('<img>');
                //Give img element stillImgUrl, animated  & src attribute
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv);
            }
        });
    }
    var gifAnimate = function() {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
            // log test 
            console.log(gifCondition);
        } else if (gifCondition === 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');
            // log test
            console.log(gifCondition);
        }
    }


    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});
