
fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.getElementById('cards-container');

    data.forEach(post => {
      const colCont = document.createElement('div');
      colCont.classList.add('col-4', 'u-equal-height')
      const card = document.createElement('div');
      card.classList.add('p-card--highlighted','u-equal-height');
      card.style.boxShadow = "0 1px 1px 0 rgba(0, 0, 0, .15), 0 2px 2px -1px rgba(0, 0, 0, .15), 0 0 3px 0 rgba(0, 0, 0, .2), 0 -5px 0 0 rgba(168, 124, 160, 1)"
      card.style.borderRadius = "5px"
      
      const cardContent = document.createElement('div');
      cardContent.classList.add('p-card__inner','u-equal-height');
      cardContent.style.flexDirection = 'column';
      cardContent.style.justifyContent = 'space-between';
      
      const image = document.createElement('img');
      image.classList.add('p-card__image');
      image.src = post.featured_media; 
      image.alt = post.title.rendered;
      
      const readMoreLinkContainer = document.createElement('h4');
      
      const readMoreLink = document.createElement('a');
      readMoreLink.href = post.link; 
      readMoreLink.innerHTML = post.title.rendered;
      
      readMoreLinkContainer.appendChild(readMoreLink);
      
      const authorName = document.createElement('a');
      authorName.textContent = post._embedded.author[0].name;
      authorName.href = post._embedded.author[0].link;
      
      const authorField = document.createElement('p');
      authorField.classList.add('p-heading--6');
      authorField.innerHTML = `By ${authorName.outerHTML} on ${formatDate(post.date)}`;

      
      
      const article = document.createElement('p');
      article.classList.add('u-no-margin--bottom');
      article.textContent = "Article";
      
      const headText = document.createElement('p');
      headText.textContent = "CLOUD AND SERVICES";
      headText.classList.add('p-card__header');

      const separator = document.createElement('hr');
      separator.classList.add('is-muted');
      
      cardContent.appendChild(headText);
      cardContent.appendChild(separator);
      cardContent.appendChild(image);
      cardContent.appendChild(readMoreLinkContainer);
      cardContent.appendChild(authorField)
      cardContent.appendChild(separator);
      cardContent.appendChild(article);
      
      card.appendChild(cardContent);
      
      colCont.appendChild(card)

      cardsContainer.appendChild(colCont);
    });
  })
  .catch(error => console.error('Error fetching data:', error));


function formatDate(dateString) {
  const date = new Date(dateString);
  
  const day = date.toLocaleDateString(undefined, { day: '2-digit' });
  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const year = date.toLocaleDateString(undefined, { year: 'numeric' });
  
  return `${day} ${month} ${year}`;
}


