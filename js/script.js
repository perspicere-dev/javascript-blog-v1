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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){ // generowanie listy tytułow

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('optArticleSelector + customSelector: ', optArticleSelector + customSelector);
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagsWrapper', tagsWrapper);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray)

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    console.log('tag', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('HTML of tag: ', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tagsWrapper HTML: ', html)

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href of clicked tag', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('extraxt tag: ', tag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags', activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
}

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks', tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
    console.log('add active to tagLink', tagLink);

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log('find all links to tags: ', links);

  /* START LOOP: for each link */
  for (let link of links ){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
