class jekyllSearch {
  constructor(dataSource, searchField, resultsList, siteURL) {
    this.dataSource = dataSource
    this.searchField = document.querySelector(searchField)
    this.resultsList = document.querySelector(resultsList)
    this.siteURL = siteURL

    this.displayResults = this.displayResults.bind(this)
  }

  fetchedData() {
    return fetch(this.dataSource)
      .then(blob => blob.json())
  }

  async findResults() {
    const data = await this.fetchedData()
    return data.filter(item => {
      const regex = new RegExp(this.searchField.value, 'gi')
      return item.title.match(regex) || item.content.match(regex)
    })
  }

  async displayResults() {
    const results = await this.findResults()
    const html = results.map(item => {
      return `
        <li class="result">
            <article class="result__article  article">
                <h4>
                  <a href="${this.siteURL + item.url}">${item.title}</a>
                </h4>
                <p>${item.excerpt}</p>
            </article>
        </li>`
    }).join('')
    if ((results.length == 0) || (this.searchField.value == '')) {
      this.resultsList.innerHTML = `<p>Sorry, nothing was found</p>`
    } else {
      this.resultsList.innerHTML = html
    }
  }

  init() {
    const url = new URL(document.location)
    if (url.searchParams.get("search")) {
      this.searchField.value = url.searchParams.get("search")
      this.displayResults()
    }
    this.searchField.addEventListener('keyup', () => {
      this.displayResults()
      url.searchParams.set("search", this.searchField.value)
      window.history.pushState('', '', url.href)
    })
    this.searchField.addEventListener('keypress', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
      }
    })
  }
}
