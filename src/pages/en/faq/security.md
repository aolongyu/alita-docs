---
previousText: '跨域访问'
previousUrl: '/faq/cors'
nextText: '开发技巧'
nextUrl: '/faq/tips'
disableHtmlPreviews: true
contributors:
  - liamdebeasi
---

# 安全性

### React

React DOM escapes values embedded in JSX before rendering them by converting them to strings. For example, the following would be safe as `name` is converted to a string before being rendered:

```jsx
const name = values.name;
const element = <h1>Hello, {name}!</h1>;
```

However, this does not stop someone from injecting JavaScript into places such as the `href` attribute of an anchor element. The following is unsafe and can potentially allow an XSS attack to occur:

```jsx
const userInput = 'javascript:alert("Oh no!")';
const element = <a href={userInput}>Click Me!</a>
```

If the developer needs to achieve more comprehensive sanitization, they can use the [sanitize-html](https://www.npmjs.com/package/sanitize-html) package.

To learn more about the built-in protections that React and JSX provide, see the [React JSX Documentation](https://reactjs.org/introducing-jsx.html#jsx-prevents-injection-attacks).
