//this postman app run by live server not by nodejs and ichat app is also run by live server but in postman app before add on github first add about & contact page on postman app


console.log('This is my project 6 from JavaScript course');


//utility functions:
// 1. utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initialise no. of parameters
let addedParamCount = 0;


// Hide the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';


//If the user click on params, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';//json hide
    document.getElementById('parametersBox').style.display = 'block';//parameter display
})


//If the user click on json, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';//parameter hide
    document.getElementById('requestJsonBox').style.display = 'block';//json display
})


// If the user click on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-2">
                   <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                   <div class="col-md-4">
                       <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                   </div>
                   <div class="col-md-4">
                       <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                   </div>
                   <button class = "btn btn-primary deleteParam"> - </button>
                   </div>`;

    //Convert the element to string DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    //Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //TO DO: Add a confirmation box to confirm parameter deletion


            e.target.parentElement.remove();//e.target : vo button jis  pe click kiya gya he, parentElement : is string vala div above which copy from html page and remove the the parent element. By this the whole div is remove. 

        })
    }



    addedParamCount++;//how many parameter are insert in DOM

})

//If the user click on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please Wait.. Fetching response...";
    document.getElementById('responseprism').innerHTML = "Please Wait.. Fetching response...";


    //Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    //If user has used params option instead of json collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);//collect data from parameters in 
        //string form  </ OUR DATA IS A JSON STRING/>

    }
    else {
        data = document.getElementById('requestJsonText').value;//collect data from json in string form 
    }

    //Log all the values in the console for debugging
    console.log('URL is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data);

    //  if the request type is get, invoke fetch api to create a get request
    if (requestType == 'GET'){
        fetch(url, {
            method: 'GET', 
        })
        .then(response=> response.text())
        .then((text) =>{
        //  document.getElementById('responseJsonText').value = text;
         document.getElementById('responseprism').innerHTML = text;
         Prism.highlightAll();
         
        });
    }
    //if the request type is post, invoke fetch api tocreate a post request
     else{
        fetch(url, {
            method: 'POST', 
            body : data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }          
        })
        .then(response=> response.text())
        .then((text) =>{
        //  document.getElementById('responseJsonText').value = text;
         document.getElementById('responseprism').innerHTML = text;
         Prism.highlightAll();
        });  
     }
})