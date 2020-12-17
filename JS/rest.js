var BASE_URL='http://localhost:2776';

/**
 * 
 * @param {Uri} ressourceUrl 
 */

function get(ressourceUrl)
{   //instancier xhr
    var xhr=new XMLHttpRequest();
    // ouverture de la connexion
    xhr.open('GET',BASE_URL+ressourceUrl);
    //tache a effectuer à chaque changement de readstate (passage d'une étape de reception
    //1--> open 2--> send 3--> en cours de reception 4--> fin de reception
    xhr.onreadystatechange=function(evt){
    if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
    var objt=JSON.parse(evt.currentTarget.response);
    console.log(objt);
    }
    //envoie de la requête
    xhr.send();
}

/**
 * Permet l'envoi en POST d'une ressource sur la ressourceURL
 * @param {Uri} ressourceUrl 
 * @param {Uri} ressource 
 */
function post(ressourceUrl, ressource)
{
    var xhr=new XMLHttpRequest();
    xhr.open('POST',BASE_URL+ressourceUrl);
    //specification du type contenu
    xhr.setRequestHeader('Content-Type','application/json');
    //specification de ce qui est attendu en retour
    xhr.setRequestHeader('Accept','application/json');
    xhr.onreadystatechange = function (evt) 
    {
        if(xhr.readyState<4){return;}
        console.log(JSON.parse(xhr.response));
    };
    xhr.send(JSON.stringify(ressource));
}

/**
 * Suppression
 * @param {Uri} ressourceUrl 
 */
function remove(ressourceUrl)
{   var xhr=new XMLHttpRequest();
    xhr.open('DELETE',BASE_URL+ressourceUrl);
    xhr.onreadystatechange=function(evt){
    if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
    var objt=JSON.parse(evt.currentTarget.response);
    console.log(objt);
    }
    xhr.send();
}

/**
 * Mise à jour d'une ressource sur ressourceUrl
 * @param {Uri} ressourceUrl 
 * @param {Uri} ressource 
 */
function put(ressourceUrl, ressource)
{
    var xhr=new XMLHttpRequest();
    xhr.open('PUT',BASE_URL+ressourceUrl);
    //specification du type contenu
    xhr.setRequestHeader('Content-Type','application/json');
    //specification de ce qui est attendu en retour
    xhr.setRequestHeader('Accept','application/json');
    xhr.onreadystatechange = function (evt) 
    {
        if(xhr.readyState<4){return;}
        console.log(JSON.parse(xhr.response));
    };
    xhr.send(JSON.stringify(ressource));
}