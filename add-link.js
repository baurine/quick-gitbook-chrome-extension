function getHost() {
  // TODO: make host configurable
  return "http://quickgitbook.com"
}

// https://stackoverflow.com/questions/2844565/is-there-a-javascript-jquery-dom-change-listener
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
// http://www.jianshu.com/p/b5c9e4c7b1e1
function listenDOMChange() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  var target = document.querySelector('#js-repo-pjax-container')
  var observer = new MutationObserver(function(mutations) {
    // mutations.forEach(function(mutation) {
    //   console.log(mutation.type)
    // })
    addLink()
  })
  var config = { childList: true }
  observer.observe(target, config)
}

function addLink() {
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
    link.id = "viwe-gitbook"
    link.classList = "btn btn-sm"
    link.href = getHost() + repoName
    link.target = "_blank"
    link.innerHTML = "View Gitbook"
    var li = document.createElement("li")
    li.appendChild(link)
    repoActions.prepend(li)
  }
}

function main() {
  console.log('Load quick-gitbook extension')

  listenDOMChange()
  addLink()
}

main()
