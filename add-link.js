function getHost() {
  // TODO: make host configurable
  return "http://quickgitbook.com"
}

function main() {
  console.log('Log from quick-gitbook extension')

  // get repo name
  var repoLink = document.querySelector("h1.public strong[itemprop='name'] a")
  if (!repoLink) {
    console.log('This is not repo page!')
    return
  }
  // repoLink.href example: "https://github.com/baurine/study-note"
  var url = new URL(repoLink.href)
  // pathname example: "/baurine/study-note"
  var repoName = url.pathname

  // add link
  var repoActions = document.querySelector("ul.pagehead-actions")
  if (repoActions) {
    var link = document.createElement("a")
    link.href = getHost() + repoName
    link.target = "_blank"
    link.innerHTML = "View Gitbook"
    link.classList = "btn btn-sm"
    var li = document.createElement("li")
    li.appendChild(link)
    repoActions.prepend(li)
  }
}

main()
