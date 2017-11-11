# QuickGitbook Chrome Extension

A chrome extension for myself [QuickGitbook](https://github.com/baurine/quick-gitbook) project, imitate [Sourcegraph](https://about.sourcegraph.com/), add a link in github repo page to help quickly jump to QuickGitbook website to read.

![](./art/quick-gitbook-chrome-extension.png)

In above screenshot, the first button is injected by this extension, while the second button is injected by Sourcegraph extension.

In above page (<https://github.com/baurine/study-note>), after click the "View Gitbook" button, it will open a new tab and jump to <http://quickgitbook.com/baurine/study-note>.

## TODO

- [ ] Only show "View Gitbook" link when contains "SUMMARY.md"
- [ ] Publish to chrome store
- [ ] Make "http://quickgitbook.com" host configurable, because you maybe deploy the "QuickGitbook" project to yourself server
