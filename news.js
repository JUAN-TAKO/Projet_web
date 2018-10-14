var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    recherche_courante = $("#zone_saisie").val();
    if(recherche_courante !== "" && recherches.indexOf(recherche_courante) == -1){
        recherches.push(recherche_courante);
        $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + recherche_courante + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
        $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});

    }
}

function supprimer_recherche(e)
{
    recherches.splice(recherches.indexOf($(e).parent().find("label").text()), 1);
    $(e).parent().remove();
    $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});
}

function selectionner_recherche(e)
{ 
    recherche_courante = $(e).parent().find("label").text();
    $("#zone_saisie").val(recherche_courante);

    var cookie = $.cookie(recherche_courante);
    if(cookie){
        var parsed = JSON.parse(cookie);
        for(var i = 0; i < parsed.length; i++){
            recherche_courante_news.push(parsed[i]);
            afficher_resultat(parsed[i], true);
        }
    }

    rechercher_nouvelles();
}

function afficher_resultat(res, saved){
    var str;
    if(saved){
        str = "</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>";
    }else{
        str = "</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>"
    }
    $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href=\""
    + decodeEntities(res["url"])
    + "\" target=\"_blank\">"
    + decodeEntities(res["titre"])
    + "</a><span class=\"date_news\">"
    + format(decodeEntities(res["date"]))
    + str);
}
function init()
{
    var cookie = $.cookie("recherches");
    if(!!cookie){
        cookie = JSON.parse(cookie);
        for(var i = 0; i < cookie.length; i++){
            recherches.push(cookie[i]);
            $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + cookie[i] + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
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
    $("#resultats").empty();
    recherche_courante = $("#zone_saisie").val();
    var cookie = $.cookie(recherche_courante);
    if(!!cookie){
        recherche_courante_news = JSON.parse(cookie);
    }
    var url = "search.php?data=" + encodeURI(recherche_courante);
    ajax_get_request(maj_resultats, url, true);
    $("#wait").css("display", "block");
}


function maj_resultats(res)
{
    
    var parsed = JSON.parse(res);


    for(var i = 0; i < parsed.length; i++){
        
        //var copy = parsed[i];    
        //copy["date"] = format(decodeEntities(copy["date"]));
        
        afficher_resultat(parsed[i], indexOf(recherche_courante_news, parsed[i]) >= 0);
    }
    
    $("#wait").css("display", "none");
}

function make_nouvelle_object(e){
    var url = $(e).parent().find(".titre_news").attr("href");
    var titre = $(e).parent().find(".titre_news").text();
    var date = $(e).parent().find(".date_news").text();
    var obj =  {"titre":titre, "date":date, "url":url};
    return obj;

}

function sauver_nouvelle(e)
{
    $(e).find("img").attr("src","disk15.jpg");
    $(e).attr("onclick", "supprimer_nouvelle(this)");
    var objet_resultat = make_nouvelle_object(e);

    if(indexOf(recherche_courante_news, objet_resultat) < 0){
        recherche_courante_news.push(objet_resultat);
    }
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news), {expires : 1000});
}

function supprimer_nouvelle(e)
{
    $(e).find("img").attr("src","horloge15.jpg");
    $(e).attr("onclick", "sauver_nouvelle(this)");
    var objet_resultat = make_nouvelle_object(e);
    var index = indexOf(recherche_courante_news, objet_resultat);
    if(index >= 0){
        recherche_courante_news.splice(index, 1);
    }
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news), {expires : 1000});

}
