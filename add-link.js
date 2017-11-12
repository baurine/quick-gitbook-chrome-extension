var DEF_HOST = "http://quickgitbook.com"

function log(msg) {
  console.log("QuickGitbook extension:", msg)
}

// https://stackoverflow.com/questions/2844565/is-there-a-javascript-jquery-dom-change-listener
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
// http://www.jianshu.com/p/b5c9e4c7b1e1
function listenDOMChange() {
  var target = document.querySelector("#js-repo-pjax-container")
  if (!target) return
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  var observer = new MutationObserver(function(mutations) {
    // mutations.forEach(function(mutation) {
    //   console.log(mutation.type)
    // })
    prepareAddLink()
  })
  var config = { childList: true }
  observer.observe(target, config)
}

function prepareAddLink() {
  if (repoIsGitbook === UNKNOWN) checkGitbookRepo()
  if (repoIsGitbook === YES) addLink()
}

// check whether this repo is a gitbook repo
// according whether "SUMMARY.md" exists in repo home page
function checkGitbookRepo() {
  var isHomePage = document.querySelector("div.js-repo-meta-container") !== null
  if (!isHomePage) return

  var summaryRow = document.querySelector("tr.js-navigation-item td.content a[title='SUMMARY.md']")
  repoIsGitbook = summaryRow ? YES : NO
}

function addLink() {
  // get repo name
  var repoLink = document.querySelector("h1.public strong[itemprop='name'] a")
  if (!repoLink) {
    log("this is not a repo page")
    return
  }
  // repoLink.href example: "https://github.com/baurine/study-note"
  var url = new URL(repoLink.href)
  // pathname example: "/baurine/study-note"
  var repoName = url.pathname

  // add link
  var repoActions = document.querySelector("ul.pagehead-actions")
  if (!repoActions) {
    log("there is no action buttons")
    return
  }

  // return in advance if link already exists
  var existedLink = repoActions.querySelector("li#view-gitbook")
  if (existedLink) return

  chrome.storage.local.get(["options_host"], function(items) {
    host = items.options_host || DEF_HOST

    var link = document.createElement("a")
    link.id = "view-gitbook"
    link.classList = "btn btn-sm"
    link.href = host + repoName
    link.target = "_blank"
    link.innerHTML = "View Gitbook"
    var li = document.createElement("li")
    li.appendChild(link)
    repoActions.prepend(li)
  })
}

var UNKNOWN = 0, NO = 1, YES = 2
var repoIsGitbook = UNKNOWN
function main() {
  log("load")

  prepareAddLink()
  if (repoIsGitbook !== NO) listenDOMChange()
}

main()
