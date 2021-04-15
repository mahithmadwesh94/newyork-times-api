//get top stories with api and api key
const baseUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
const apiKey = '1adXxys8r8s0pwyjjBYiPYj47bj3y13y';

var newsContent = [];
var newsRow = createElement('div', 'row m-2 p-2');
var NavMenu = new Set();

fetch(baseUrl + apiKey).then((response) => {
    return response.json();
}).then((result) => {
    console.log(result);

    // scriptContent = document.getElementsByTagName('script');

    newsContent = result.results;
    createNav(result.results);
    container.append(newsRow);
    homePage();
    // document.body.append(...scriptContent);

}).catch((err) => {
    console.error(err);
});

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//create the Container and row
var container = createElement('div', 'container-fluid overflow-hidden');








//create nav bar
function createNav(resultObj) {
    let row = createElement('div', 'row');

    let hrLin = createElement('hr');


    container.append(row);

    let nav = createElement('nav', 'navbar sticky-top navbar-expand-md navbar-light');

    let div1 = createElement('div', 'container-fluid');

    let button1 = createElement('button', 'navbar-toggler');
    button1.setAttribute('type', 'button');
    button1.setAttribute('data-bs-toggle', 'collapse');
    let homeUl = createElement('ul', 'navbar-nav');
    homeUl.append(createNavLink('Home'))
    button1.append(homeUl)

    // let buttonSpan = createElement('span', 'navbar-toggler-icon');
    // buttonSpan.addEventListener('click', () => {
    //     console.log('Show Menu')
    // });
    // // 1
    // button1.append(buttonSpan);

    // 2
    let navDiv = createElement('div', 'collapse navbar-collapse');


    let navUl = createElement('ul', 'navbar-nav');

    NavMenu.add('Home')
    resultObj.forEach((element) => {
        NavMenu.add(element.section);
    });

    NavMenu.forEach((element) => {


        let tempElement = createNavLink(element);
        navUl.append(tempElement);
    });

    navDiv.append(navUl);

    div1.append(button1, navDiv);


    nav.append(div1);

    row.append(nav);




}




document.body.appendChild(container);
document.body.append(createBootstrapScript(), createScriptTags('index.js'));

//append scripts to the body
{/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
        crossorigin="anonymous"></script>
    <script src="index.js"></script> */}

//bootstrap script
function createBootstrapScript() {
    let script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js';
    script1.integerity = 'sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf';
    script1.crossOrigin = "anonymous";
    return script1;

}

function createScriptTags(src) {
    let scripts1 = document.createElement('script');
    scripts1.src = src;
    return scripts1;
}







//FUnction to create Elements
function createElement(element, className) {
    let newElement = document.createElement(element);
    newElement.setAttribute('class', className);
    return newElement;
}

//Create the Navbar links
function createNavLink(text) {

    let li = document.createElement('li');
    li.setAttribute('class', 'nav-item pb-3');

    let aTag = document.createElement('a');
    aTag.setAttribute('id', text);
    aTag.setAttribute('class', 'nav-link');
    aTag.innerText = text;
    aTag.addEventListener('click', (event) => {
        makeMeActive(event);
    });

    li.append(aTag);

    return li;

}

//Make Nav button active
function makeMeActive(event) {
    let selectedTag = event.target.id;
    console.log('selectedTag', selectedTag)
    let navItems = document.getElementsByClassName('nav-link');

    for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].getAttribute('id') === selectedTag) {
            navItems[i].classList.add('active-nav');
        } else {
            if (navItems[i].getAttribute('id') !== selectedTag) {
                if (navItems[i].classList.contains('active-nav')) {
                    navItems[i].classList.remove('active-nav');
                }
            }
        }

    }


    newsRow.innerHTML = '';
    //Display appropriate Content
    if (selectedTag !== 'Home') {
        newsContent.forEach((x) => {
            if (x.section === selectedTag) {
                newsRow.append(createArticle(x));
            }
        })

    } else {
        homePage();
    }
}


//Show Respective nav topics
function createArticle(obj) {

    //card creation
    let cardDiv = createElement('div', 'card m-2 p-2');

    let cardRow = createElement('div', 'row');
    cardDiv.append(cardRow);
    let cardRow1 = createElement('div', 'col-12 col-sm-12 col-md-6 col-lg-9');
    let cardBody = createElement('div', 'card-body');

    let heading1 = createElement('h5', 'card-title topic-header text-highlight');
    heading1.innerText = obj.section;

    let heading2 = createElement('h5', 'card-title');
    heading2.innerText = obj.title;

    //Date formattting for published date
    let publishedMonth = monthNames[new Date(obj.created_date).getMonth()] + ' ' + new Date(obj.created_date).getDay();

    let heading3 = createElement('h5', 'card-title');
    heading3.innerText = publishedMonth;

    let cardContent = createElement('p', 'card-text');
    cardContent.innerText = obj.abstract + '(' + obj.item_type + ')';;

    //byline

    let pTag1 = createElement('p', 'card-text');
    let byLine = createElement('small', 'text-muted');
    byLine.innerText = obj.byline;


    pTag1.append(byLine);



    //last updated
    let pTag = createElement('p', 'card-text');
    let smallTag = createElement('small', 'text-muted');

    let timeDifference = new Date() - new Date(obj.updated_date);
    let finalResult = Math.floor((timeDifference / 60000 / 60));
    console.log(finalResult);

    smallTag.innerText = 'Last Updated ' + finalResult + 'min ago';


    pTag.append(smallTag);




    let heading4 = createElement('a', 'card-title click-link text-highlight');
    heading4.setAttribute('href', obj.short_url)
    heading4.innerText = 'Continue Reading';

    cardBody.append(heading1, heading2, heading3, cardContent, pTag1, pTag, heading4);
    cardRow1.append(cardBody);


    let cardRow2 = createElement('div', 'col-12 col-sm-12 col-lg-3 col-md-6');
    cardRow2.style = 'padding:0;';

    let img = createElement('img', 'img-fluid img-thumbnail float-end click-link');
    img.style = 'width:100%;'
    img.src = obj.multimedia[4].url;

    cardRow2.append(img);

    cardRow.append(cardRow1, cardRow2);

    return cardDiv;

}

function homePage() {
    let homeRow = createElement('div', 'row');

    let img = createElement('img', 'img-fluid');
    img.src = 'images/1920px-NewYorkTimes.svg.png'
    homeRow.append(img);

    let homeRow2 = createElement('div', 'row m-2');
    NavMenu.forEach((x) => {
        if (x !== 'Home')
            homeRow2.append(createHomeCard(x))
    });
    newsRow.innerHTML = ''
    newsRow.append(homeRow, homeRow2);
}

function createHomeCard(text) {
    let cardDiv = createElement('div', 'card m-2 p-2');
    cardDiv.style = "width: 300px;"
    cardDiv.id = text;

    cardDiv.addEventListener('mouseenter', (event) => {
        console.log(event.target.id)
        event.target.classList.add('click-link', 'text-highlight', 'active-nav')
        // makeMeActive(event)
    });

    cardDiv.addEventListener('mouseleave', (event) => {
        event.target.classList.remove('click-link', 'text-highlight', 'active-nav')
    });



    let cardBody = createElement('div', 'card-body text-center');


    let heading = createElement('h5', 'card-title');
    heading.innerText = text;
    // <button type="button" class="btn btn-dark">Dark</button>

    let button = createElement('button', 'btn btn-dark');
    button.setAttribute('type', 'button');
    button.innerText = 'View';
    button.id = text;
    button.addEventListener('click', (event) => {
        console.log(event.target.id);
        makeMeActive(event);

    })

    let pTag = createElement('p', 'card-text');
    let smallTag = createElement('small', 'text-muted');


    smallTag.innerText = 'Click view more';
    pTag.append(smallTag);

    cardBody.append(heading, button, pTag);

    cardDiv.append(cardBody);

    return cardDiv;


}



