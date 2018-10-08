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
    recherches.splice(recherches.indexOf(recherche_courante), 1);
    $(e).parent().remove();
}

function selectionner_recherche(e)
{ 
    recherche_courante = $(e).parent().find("label").text();
    $("#zone_saisie").val(recherche_courante);
}


function init()
{
    var cookie = JSON.parse($.cookie("recherches"));
    if(cookie){
        for(var i = 0; i < cookie.length; i++){
            recherches.push(cookie[i]);
            $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + cookie[i] + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
        }
    }
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
    var url = "search.php?data=" + encodeURI(recherche_courante);
    ajax_get_request(maj_resultats, url, true);
    $("#wait").css("display", "block");
}


function maj_resultats(res)
{
    var parsed = JSON.parse(res);
    for(var i = 0; i < parsed.length; i++){
        $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href=\""
        + decodeEntities(parsed[i]["url"])
        + "\" target=\"_blank\">"
        + decodeEntities(parsed[i]["titre"])
        + "</a><span class=\"date_news\">"
        + format(decodeEntities(parsed[i]["date"]))
        + "</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
    }
    
    $("#wait").css("display", "none");
}


function sauver_nouvelle(e)
{
    $(e).find("img").attr("src","disk15.jpg");
    $(e).attr("onclick", "supprimer_nouvelle(this)");
    var url = $(e).parent().find(".titre_news").attr("href");
    var titre = $(e).parent().find(".titre_news").val();
    var date = $(e).parent().find(".date_news").val();
    var objet_resultat = {"url":url, "titre":titre, "date":date};
    recherche_courante_news.push(objet_resultat);
}


function supprimer_nouvelle(e)
{
    $(e).find("img").attr("src","horloge15.jpg");
    $(e).attr("onclick", "sauver_nouvelle(this)");
}
