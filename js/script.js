'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const titleClickHandler = function(event) { //wyświetlanie artykułu po kliknięciu
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!')
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    console.log('class active removed from articles')
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement: ', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const articles = document.querySelectorAll('article.active');

  for (let article of articles) {
    article.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('atribute herf form clicked link is: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle)

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('add class active to correct article', targetArticle)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){ // generowanie listy tytułow

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId is: ', articleId);

    /* find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('article title is: ', articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML created: ', linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    console.log('final html list of title list is generated');
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links: ', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
