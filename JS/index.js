window.addEventListener('load', function (evt) {
    //usage d'une fonction
    initialisationJS('Samuel');
    // Acrrochage d'un écouteur d'event sur une balise
    // event : submit
    // fonction à décelncher pour l'event -> formSubmit
    document.querySelector('form').addEventListener('submit', formSubmited);
    //chargement initial des postit
    (new Crud(BASE_URL)).recuperer('/postit', function (mesPostits) {
        console.log('j\'ai fini de recevoir mes postit voici la liste :', mesPostits);

        mesPostits.forEach(function (postit) {
            console.log(postit);
            createPostitByObject(postit);
        });
    });
});



//declaration d'une fonction
function initialisationJS(prenom) {
    // définition d'une variable et affectation d'un contenu
    var jsload = document.querySelector('#jsload');
    // modification du contenu html de la balise dans la var
    jsload.innerHTML = 'mon<span style="font-weight:900">JS</span> est chargé' + prenom;
    // modification du style de la balise dans la var
    jsload.style.backgroundColor = "LIME";
}


function formSubmited(evt) {
    evt.preventDefault();
    // C'est une fonction qui demande de ne pas faire le fonctionnement normal : rechargement de la page
    //console.log('Mon formulaire est "submit" ')
    //onsole.log(evt);
    /*console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);*/
    var monFormulaire = document.forms['editor-form'];
    //création d'un n ouvel objet au rest
    var postit = {
        titre: monFormulaire["title"].value,
        datetime: evt.target[1].value + 'T' + evt.target[2].value,
        description: evt.target[3].value
    };
    console.log(postit);
    //Appel rest pour l'ajout dans la liste et recup de l'id
    (new Crud(BASE_URL)).creer('/postit', postit, function (objSaved) {
        createPostitByObject(objSaved);
    }
        /*createPostit(
         monFormulaire['title'].value,
         monFormulaire['date'].value,
         monFormulaire['time'].value,
         monFormulaire['description'].value*/
    );
}

/**
 * 
 * @param {String} titre titre de la note
 * @param {String} date JJ:MM:AAAA
 * @param {String} heure HH:MM
 * @param {String} description description
 */

function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    // ajout d'un class dans la liste de classe d'un Element
    postit.classList.add('postit');
    // Possiblité de suppresion d'une class d'un balise
    //ostit.classList.remove('postit');
    //postit.innerHTML='Mon nouveau postit';

    postit.innerHTML = '<div class="close">\
                        <img src="img/close.png"/>\
                        </div><div class="postit-titre">' + titre + '</div>\
                        date: <span class="datetime">'+ date + '</span> heure : <span class="datetime">' + heure + '</span>\
                        <h2>Description :</h2>'+ description;

    // selection a partir de postit de .close img
    postit.querySelector('.close img').addEventListener('click', deletePostit);

    //sélection de la liste de postit    
    var liste = document.querySelector('#list');
    liste.append(postit);
}

/**
 * 
 * @param {Object} postit 
 */

function createPostitByObject(postitInput) {
    var postit = document.createElement('div');
    //creation d ela balidse id du postit dans le rest   
    postit.id = 'postit-' + postitInput.id;
    // ajout d'un class dans la liste de classe d'un Element
    postit.classList.add('postit');
    postit.addEventListener('dblclick', putinformclickedpostit);
    // Possiblité de suppresion d'une class d'un balise
    //ostit.classList.remove('postit');
    //postit.innerHTML='Mon nouveau postit';

    postit.innerHTML = '<div class="close">\
                        <img src="img/close.png"/>\
                        </div><div class="postit-titre">' + postitInput.titre + '</div>\
                        date: <span class="datetime postit-date">'+ postitInput.datetime.substring(0, 10) + '</span>\ heure :\
                        <span class="datetime postit-heure">' + postitInput.datetime.substring(11) + '</span>\
                        <h2>Description :</h2><div class="postit-description">'+ postitInput.description + '</div>';

    // selection a partir de postit de .close img
    postit.querySelector('.close img').addEventListener('click', deletePostit);

    //sélection de la liste de postit    
    var liste = document.querySelector('#list');
    liste.append(postit);
}

function deletePostit(evt) {
    //Arrête les événments qui découlent
    evt.stopPropagation();
    //code pour vérifier dans la console que cela fonctionne
    //window.evt=evt;
    //equivalent à var evt=evt;
    console.log('evenement lié à la suppression d\'une note', evt);
    var domPostitId = evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/' + domPostitId, function () {
        evt.path[2].remove();
    });

}

function putinformclickedpostit(evt) {
    console.log('j\'ai double cliqué sur un postit', evt);
    var dompostit = evt.currentTarget;
    console.log(
        dompostit.id.substring(7),
        dompostit.querySelector('.postit-titre').innerText,
        dompostit.querySelector('.postit-date').innerText,
        dompostit.querySelector('.postit-heure').innerText,
        dompostit.querySelector('.postit-description').innerText
    );
    document.forms["editor-form"]['id'].value = dompostit.id.substring(7);
    document.forms["editor-form"]['title'].value = dompostit.querySelector('.postit-titre').innerText;
    document.forms["editor-form"]['date'].value = dompostit.querySelector('.postit-date').innerText;
    document.forms["editor-form"]['time'].value = dompostit.querySelector('.postit-heure').innerText;
    document.forms["editor-form"]['description'].value = dompostit.querySelector('.postit-description').innerText;
}
