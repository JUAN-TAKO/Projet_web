function set_icon_hotloge(e){
    $(e).find("img").attr("src","horloge15.jpg");
    $(e).attr("onclick", "sauver_nouvelle(this)");
}

function set_icon_disk(e){
    $(e).find("img").attr("src","disk15.jpg");
    $(e).attr("onclick", "supprimer_nouvelle(this)");
}

function ajouter_recherche(recherche_courante){
    $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + recherche_courante + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
        
}
function supprimer_recherche(e){
    $(e).parent().remove();
}

function get_zone(){
    return $("#zone_saisie").val();
}

function set_zone(z){
    $("#zone_saisie").val(z);
}

function get_label(e){
    return $(e).parent().find("label").text();
}

function clear_results(){
    $("#resultats").empty();
}

function start_loading(){
    $("#wait").css("display", "block");
}
function stop_loading(){
    $("#wait").css("display", "none");
}

function make_nouvelle_object(e){
    var url = $(e).parent().find(".titre_news").attr("href");
    var titre = $(e).parent().find(".titre_news").text();
    var date = $(e).parent().find(".date_news").text();
    var obj =  {"titre":titre, "date":date, "url":url};
    return obj;
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

