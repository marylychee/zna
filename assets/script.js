// JS file

// Clarifar API
  // then from the input image saves it to a image URL
  // on click and submit, loads a new page and presents the image // whilst we submit that image URL to clarafai
// confirm the image food tags
// confirm the image food amount
// then take that and present the food analyse
// left to right presentation
// create a user analyse and PDF to download
// clinical setting
// see different clients and progress
// update and see, send automatic follow up emails with recipe suggestions, meal prep suggestions, eatting out suggestions


$(document).ready(function () {
  // uploadcare widget setup
  let widget = uploadcare.Widget('[role=uploadcare-uploader]');
  let file = widget.value();
  let fileUUID = '';
  let origUrl = '';

  // clarifai initialization
  let conceptsArr = [];
  let confirmedFoodItems = [];

  // clarifai image classification function
  const food = function (origUrl, cardContent) {
    app.models.predict(Clarifai.FOOD_MODEL, origUrl)
    .then(function(response) {
      // This is an array of food classification objects
      // with app_id: null, id: "ai_fZsLlGwm", name: "pizza", value: "0.94452775"
      conceptsArr = response.outputs[0].data.concepts;
      console.log(conceptsArr);

      let hidethis = document.getElementsByClassName('intro');
      hidethis.className = "hidden";
      console.log(hidethis);
      return conceptsArr;
    })
      .then(function (concepts) {
        // This maps the above array of objects to just contain the classification names and accuracy %
        let reformattedConcepts = concepts.map(function (obj) {
          var rObj = {};
          rObj.name = obj.name;
          rObj.accuracy = obj.value;
          return rObj;
        });
        return reformattedConcepts;
      })
      .then(function (fooditems) {
        let mapForTags = fooditems.map(function (obj){
            // tag printer
            console.log(obj);
            let tag = document.createElement('button');
            tag.innerText = obj.name;
            tag.classList.add("tag");
            cardContent.appendChild(tag);
        });
        return tags;
      }),
      function(err) {
        // there was an error
        console.log('there was an err of' + err);
      };
  };


  // When user uploads an image to the Widget
  // info gives us all the image file's info held on Uploadcare's storage
  widget.onUploadComplete(function(info) {
    console.log(info);

    // Here we assign the file's info to key variables
    fileUUID = info.uuid;
    origUrl = info.originalUrl;

    // To show the image on the page
      // create cards and imgs elements
      let showImg = document.createElement('img');
      showImg.src = origUrl;
      showImg.classList.add("responsive-img");

      let card = document.createElement('div');
      card.classList.add("card");

      let cardImage = document.createElement('div');
      cardImage.classList.add("card-image");

      let tagMeSpan = document.createElement('span');
      tagMeSpan.classList.add("card-title");

      let input = document.createElement('input');
      input.type = "text";
      input.placeholder = "Tag me...";
      input.id = "food-parser";

      let cardContent = document.createElement('div');
      cardContent.classList.add("card-content");
      cardContent.id = "cardContent";

      //appends to the webpage
      let logSection = document.getElementsByClassName('log-section');
      tagMeSpan.appendChild(input);
      cardImage.appendChild(showImg, tagMeSpan);
      cardImage.appendChild(tagMeSpan);
      card.appendChild(cardImage);
      card.appendChild(cardContent);
      logSection[0].append(card);

      // calls the Clarifai function, to return us the array of potential food items
      //prints tags
      food(origUrl, cardContent);

      // user can click on button and it is added as a "recipe ingredient"

      // shows the example of nutrition from the first highlighted item

      // allows the user change the highlighted item

      // allows the user to change the amount of the items

      // submit on the new information to edaman


      // confirm and log the correct food item and amount

      //stretch goal - log the brand: build brand recognition.


  });

});
