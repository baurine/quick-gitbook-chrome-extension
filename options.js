var DEF_HOST = "http://quickgitbook.com"
var options_host = localStorage.options_host || DEF_HOST

var host_el = document.getElementById("options_host")
host_el.value = options_host

document.getElementById("options_reset").onclick = function() {
  host_el.value = DEF_HOST
}
document.getElementById("options_save").onclick = function() {
  localStorage.options_host = host_el.value
  document.getElementById("flash").innerHTML = `Change host to ${host_el.value}`
}
