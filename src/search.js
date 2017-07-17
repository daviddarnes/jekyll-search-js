class jekyllSearch {
  constructor(dataSource, searchField, resultsList) {
    this.dataSource = dataSource;
    this.searchField = document.querySelector(searchField);
    this.resultsList = document.querySelector(resultsList);
  }

  fetchedData() {
    const items = [];
    fetch(this.dataSource)
      .then(blob => blob.json())
      .then(data => items.push(...data))
    return items;
  }

  findResults() {
    return this.fetchedData().filter(item => {
      const regex = new RegExp(this.searchField.value, 'gi');
      return item.title.match(regex) || item.content.match(regex);
    })
  }

  displayResults() {
    const html = this.findResults().map(item => {
      return `
        <li class="item  item--result">
            <article class="article">
                <h4><a href="${item.url}">${item.title}</a></h4>
                <p>${item.excerpt}</p>
            </article>
        </li>`;
    }).join('');
    if ((this.findResults().length == 0) || (this.searchField.value == '')) {
      this.resultsList.innerHTML = `<p>Sorry, nothing was found</p>`;
    } else {
      this.resultsList.innerHTML = html;
    }
  }

  init() {
    this.searchField.addEventListener('keyup', this.displayResults);
    this.searchField.addEventListener('keypress', event => {
      if (event.keyCode == 13) {
        event.preventDefault();
      }
    });
  }
}
