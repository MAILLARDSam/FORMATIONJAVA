var BASE_URL = 'http://localhost:2776';

//création d'un Objet (majuscule au debut pour identifier un objet)
//Objet permettant les appelle http
var Crud = function (serveurUrl) {

    /**
     * récupération d'informations
     * @param {Uri} ressourceUrl  chemin de la ressource dans le serveur
     */

    function _get(ressourceUrl,clbk) {   //instancier xhr
        var xhr = new XMLHttpRequest();
        // ouverture de la connexion
        xhr.open('GET', serveurUrl + ressourceUrl);
        //tache a effectuer à chaque changement de readstate (passage d'une étape de reception
        //1--> open 2--> send 3--> en cours de reception 4--> fin de reception
        xhr.onreadystatechange = function (evt) {
            if (evt.currentTarget.readyState < XMLHttpRequest.DONE) { return; }
            var objt = JSON.parse(evt.currentTarget.response);
            console.log(objt);
            clbk(objt);
        }
        //envoie de la requête
        xhr.send();
    }

    /**
     * Permet l'envoi en POST d'une ressource sur la ressourceURL
     * @param {Uri} ressourceUrl chemlin du post
     * @param {Uri} ressource data a envoyer
     * @param {function} clbk fonction de callback avec injection du retour
     */
    function _post(ressourceUrl, ressource,clbk) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', serveurUrl + ressourceUrl);
        //specification du type contenu
        xhr.setRequestHeader('Content-Type', 'application/json');
        //specification de ce qui est attendu en retour
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < 4 || xhr.status != 201) { return; }
            console.log(JSON.parse(xhr.response));
            clbk(JSON.parse(xhr.response));
        };
        xhr.send(JSON.stringify(ressource));
    }

    /**
     * 
     * @param {Uri} ressourceUrl adresse de la ressource
     * @param {Function} cblk fonction à exécuter à la la fin de la supression
     */
    function _remove(ressourceUrl, cblk) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', serveurUrl + ressourceUrl);
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < 4 || xhr.status != 200) { return; }
            cblk();
        }
        xhr.send();
    }

    /**
     * Mise à jour d'une ressource sur ressourceUrl
     * @param {Uri} ressourceUrl 
     * @param {Uri} ressource 
     */
    function _put(ressourceUrl, ressource,clbk) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', serveurUrl + ressourceUrl);
        //specification du type contenu
        xhr.setRequestHeader('Content-Type', 'application/json');
        //specification de ce qui est attendu en retour
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < 4 || xhr.status !== 200) { return; }
            //console.log(JSON.parse(xhr.response));
            clbk(JSON.parse(xhr.response));
        };
        xhr.send(JSON.stringify(ressource));
    }
    //zone d'expositions des fonctons en public
    //pour acceder depuis l'exterieurde l'instance
    this.recuperer=_get;
    this.creer=_post;
    this.mettreAjour=_put;
    this.supprimer=_remove;

/**
 * 
 * @param {Uri} ressourceUrl 
 * @param {Uri} ressource 
 * @param {function} clbk 
 */
    this.envoiRessource=function(ressourceUrl, ressource, clbk)
    {
        if(undefined !== ressource.id)
        {
            _put(ressourceUrl+'/'+ressource.id,ressource,clbk);            
        }
        else
        {
            _post(ressourceUrl,ressource,clbk);
        }
    }

}


