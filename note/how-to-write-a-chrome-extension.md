# How to Write a Chrome Extension

## References

- [从零开始编写一个 Chrome 扩展](http://www.jianshu.com/p/cf5b3fba44ea)
- [一个简单的 Chrome 拓展程序开发](https://segmentfault.com/a/1190000007518215)
- [内容脚本](https://crxdoc-zh.appspot.com/extensions/content_scripts)
- [发布教程](http://www.cnblogs.com/xishuai/p/google-chrome-webstore-developer-upload-program.html)

## Note

Chrome Extension 可以做很多复杂的事情，但我写的这个例子，只需要它最简单的功能，就是在某个特定的网页 (GitHub 的 repo 页面) 加载完成后，我们在这个页面上添加一个按钮，点击这个按钮后跳到我们的网站阅读这个 repo。

一个插件必须的文件只有 manifest.json，它用来描述这个插件的名字，作者，版本。我们在 `content_scripts` 字段中描述在网页加载完成后额外需要执行的代码。

    "content_scripts": [
        {
          "matches": ["https://github.com/*/*"],
          "js": ["add-link.js"]
        }
    ]

这段描述表示，在任何以 `https://github.com/*/*/` 打头的网页加载完成后，都会额外再执行 `add-link.js` 中的代码。我们就把所有逻辑放在 `add-link.js` 中就行。

我们在 `add-link.js` 中使用 DOM API 生成所需按钮元素，插入到原来的页面中，就这么简单。

    var link = document.createElement("a")
    link.id = "view-gitbook"
    link.classList = "btn btn-sm"
    link.href = host + repoName
    link.target = "_blank"
    link.innerHTML = "View Gitbook"
    var li = document.createElement("li")
    li.appendChild(link)
    repoActions.prepend(li)

如果你还需要一个选项界面，允许用户设置一些选项，那么用 `options_page` 字段来声明这个 option 界面，option 界面是自己用 HTML 实现的，如果需要执行 JavaScript 代码 (那几乎是肯定的)，需要把 JavaScript 代码放在一个单独的 JS 文件中，然后在 HTML 代码中用 `<script>` 标签导入。

    // manifest.json
    "options_page": "options.html",

    // options.html
    <body>
      <p id="flash"></p>
      <label for="options_host">QuickGitbook Host:</label>
      <input type="text" id="options_host"/>
      <br />
      <br />
      <button type="button" id="options_reset">Reset</button>
      <button type="button" id="options_save">Save</button>
      <script src="options.js"></script>
    </body>

涉及到设置选项，那肯定是需要将一些值持久化了，这时候需要向 Chrome 申请 storage 的权限。Chrome 将需要持久化的值存在它自己的 storage 中，有 local 和 sync 两种，不能使用 HTML5 的 localStorage，我想是因为前者可以存到 Google 的服务器上，从而实现将保存的数据在各个 Chrome 客户端中的同步，但 localStorage 不行。

    // manifest.json
    "permissions": [
      "storage"
    ]

**发布**

登录 [Chrome Web Store Dashboard](https://chrome.google.com/webstore/developer/dashboard?hl=zh-CN) 进行上传和发布。上传前要先自行将文件打包成 .zip 格式，我写了一个 package.sh 脚本来做这件事。
