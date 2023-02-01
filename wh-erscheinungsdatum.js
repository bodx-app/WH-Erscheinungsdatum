function formatDate(inputDate) {
  const dateString = inputDate;
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };
  const formattedDate = new Intl.DateTimeFormat("de-DE", options).format(date);
  return formattedDate;
}

function getPublishedDate() {
  const data = document.getElementById('__NEXT_DATA__').textContent
  const jsonData = JSON.parse(data);
  const publishDate = jsonData.props.pageProps.advertDetails.publishedDate;
  if (publishDate) {
    return `Erscheinungsdatum: ${formatDate(publishDate)}`
  }
  return '';
}

function addPublishedDate(formattedPublishDate) {
  const adDate = document.querySelector('[data-testid="ad-detail-ad-edit-date-top"]');
  const lastEdited = adDate.innerHTML;
  adDate.innerHTML = `${formattedPublishDate} | ${lastEdited}`;

}

const marketLocation = 'https://www.willhaben.at/iad/kaufen-und-verkaufen/d/';

if (location.href.startsWith(marketLocation)) {
  addPublishedDate(getPublishedDate());
}


// store url on load
let currentPage = location.href;
console.log(currentPage)

// listen for changes
setInterval(function () {
  if (currentPage != location.href && document.readyState === 'complete' && location.href.startsWith(marketLocation)) {
    location.reload();
  }
}, 2000);