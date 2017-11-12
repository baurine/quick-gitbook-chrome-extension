var DEF_HOST = "http://quickgitbook.com"

function showMessage(msg) {
  // alert(msg)
  document.getElementById("flash").innerHTML = msg
}

function main() {
  var host_el = document.getElementById("options_host")
  chrome.storage.local.get(["options_host"], function(items) {
    host_el.value = items.options_host || DEF_HOST
  })

  document.getElementById("options_reset").onclick = function() {
    host_el.value = DEF_HOST
  }
  document.getElementById("options_save").onclick = function() {
    var host = host_el.value.trim()
    if (!host) {
      showMessage("Host can't be empty!")
      return
    }
    if (!/^https?:\/\//.test(host)) {
      showMessage("Host should start with http:// or https://")
      return
    }
    chrome.storage.local.set({"options_host": host}, function() {
      showMessage(`Change host to ${host}`)
    })
  }
}

main()
