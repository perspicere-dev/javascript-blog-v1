'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-articleTag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-articleAuthor-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML)
}

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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';


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

    //REPLACED FOR HANDLEBARS /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('linkHTML created: ', linkHTML);

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkHTML po handlebars', linkHTML);


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

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
  console.log(tag + ' is used ' + tags[tag] + ' times');

  params.max = Math.max(tags[tag], params.max);
  params.min = Math.min(tags[tag], params.min);

  }
return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;

}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      /* generate HTML of the link with HANDLEBARS */

      const linkHTMLdata = {id: tag};
      const linkHTML = templates.articleTagLink(linkHTMLdata);
      console.log('HTML of tag: ', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    console.log('allTags', allTags);
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tagsWrapper HTML: ', html)

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] changing tag list into tag cloud */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code (handlebars change for const allTagsData)*/
  //let allTagsHTML = '';
  const allTagsData = {tags: []};
  console.log('allTagsData from handlerbars', allTagsData );

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams); //skąd takie argumenty?
    console.log('tagLinkHTML:', tagLinkHTML);

    /* [NEW] generate code of a link and add it to allTagsHTML - handlebars change*/
    //allTagsHTML += '<li><a class="' + tagLinkHTML + '" href="#tag-' + tag + '">' + tag +  '(' + allTags[tag] + ')</a></li>';
    allTagsData.tags.push({
      dupa: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData', allTagsData);

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
    console.log('add active class to tagLink', tagLink);

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


function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles){

    /* [DONE] find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('authorsWrapper', authorsWrapper);

    /* [DONE] make html variable with empty string */
    let html = ' ';

    /* [DONE] get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);

    /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
    /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log('allAuthors', allAuthors);

    /* generate HTML of the link with HANDLEBARS */
    const linkHTMLData = {id: articleAuthor};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);
    console.log('HTML of author link: ', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    console.log('authorsWrapperr HTML: ', html)

  /* END LOOP: for every article: */
  }
  /* [NEW] [DONE] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);
  console.log('authorsList', authorsList);

  /* Change for handlebars [NEW][DONE] create variable for all authors HTML code */
  //let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* change for handlebars [NEW] generate code of a link and add it to allTagsHTML */
  //allAuthorsHTML += '<li><a class="' + author + '" href="#author-' + author + '">' + author +  '(' + allAuthors[author] + ')</a></li>';

  allAuthorsData.authors.push({
    author: author,
    count: allAuthors[author],
  });
  }
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] change for handlebars add HTML from allTagsHTML to tagList */
//authorsList.innerHTML = allAuthorsHTML;
//console.log('allAuthorsHTML are', allAuthorsHTML);
authorsList.innerHTML = templates.authorListLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href of clicked author', href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('extraxt author: ', author);

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeAuthors', activeAuthors);

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active author link */
}

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks', authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){

    /* add class active */
    authorLink.classList.add('active');
    console.log('add active class to authorLink', authorLink);

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log('find all links to tags: ', links);

  /* START LOOP: for each link */
  for (let link of links ){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
