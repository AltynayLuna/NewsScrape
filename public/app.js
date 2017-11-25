var articles = [];

function getOnionData(button){
  let newsHeadlines = [];
  let buttonText = $(button).text();
  $(button).html("getting data...");
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function(newsHeadlines){
    var resultDiv = document.getElementById("results");
    $(button).text(buttonText);
    articles = newsHeadlines;
    renderHeadlines();
  });
}
function renderHeadlines(){
  resultsObject = document.getElementById("results");
  $(resultsObject).addClass("jumbotron");
  html = "";
  articles.forEach((item) => {
    if(item.headline) {
     let div = `<div class='article-item-container'>
                  <div><h3><a href=${item.link} target='_blank'>${item.headline}</a></h3></div>
                  <div>${item.summary}<div><button onclick="saveArticle(this, ${item.id})">Save!</button></div></div>
                  <div id='msg-${item.id}'></div>
                </div>`;
      html+=div; 
    } 
  });
  resultsObject.innerHTML = html;
}
function saveArticle(button, itemId) {
  $(button).text("Saving...");
  let item = articles[itemId];
  $.post('/save', item, 
    function(returnedData){
      let elementId = `msg-${itemId}`;
      let messagePosted = document.getElementById(elementId);
      messagePosted.innerHTML = "<span class='green'>Article Saved!<span>";
      $(button).text("Save");
      $(button).attr("disabled", "disabled");
  });
};

function deleteArticle(id){
  $.ajax({
    url: '/deleteArticle/'+id,
    method: "GET"
  }).done((res)=>{
    let div = document.getElementById(id);
    div.parentNode.removeChild(div);
  });
}
