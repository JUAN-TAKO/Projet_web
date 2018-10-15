
function ajouter_recherche()
{
    model.ajouter_recherche(view.get_zone());
}

function supprimer_recherche(e)
{
    model.supprimer_recherche(view.get_label(e));
}

function selectionner_recherche(e)
{ 
    model.set_recherche(view.get_label(e));
    view.set_zone(model.get_recherche());

    var cookie = model.get_saved_nouvelles();
    if(cookie){
        for(var i = 0; i < cookie.length; i++){
            model.ajouter_nouvelle_direct(cookie[i]);
            view.afficher_resultat(cookie[i], true);
        }
    }

    rechercher_nouvelles();
}


function init()
{
    var cookie = model.get_saved_recherche();
    if(cookie){
        for(var i = 0; i < cookie.length; i++){
            model.ajouter_recherche_direct(cookie[i]);
            view.ajouter_recherche(cookie[i]);    
        }
    }
    rechercher_nouvelles();
}

function ajax_get_request(callback, url, async){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if ((xhr.readyState==4) && (xhr.status == 200)){
        callback(xhr.responseText);
      }
    }
    xhr.open("GET",url, async);
    xhr.send();
  }    
  

function rechercher_nouvelles()
{
    view.clear_results();
    model.set_recherche(view.get_zone());

    model.load_recherche_news();

    var url = "search.php?data=" + encodeURI(model.get_recherche());
    ajax_get_request(maj_resultats, url, true);
    view.start_loading();
}

function maj_resultats(res)
{    
    var parsed = JSON.parse(res);

    for(var i = 0; i < parsed.length; i++){
        var decoded = model.decode_nouvelle();
        view.afficher_resultat(parsed[i], indexOf(recherche_courante_news, decoded) >= 0);
    }
    
    view.stop_loading();
}


function sauver_nouvelle(e)
{   
    var objet_resultat = view.make_nouvelle_object(e);
    model.ajouter_nouvelle(objet_resultat);
}

function supprimer_nouvelle(e)
{   
    var objet_resultat = view.make_nouvelle_object(e);
    model.supprimer_nouvelle(objet_resultat);
}
