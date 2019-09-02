const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const pug = require('pug');
const jsdom = require('jsdom');
const { JSDOM }  = jsdom;
// const path = require('path'); 
const fs = require('fs');
let demomd = fs.readFileSync('./docs/demo.md');
let html = fs.readFileSync('./publice/index.html');
const dom = new JSDOM(html);
let result = md.render(demomd.toString());
dom.window.document.querySelector("#content").innerHTML = result;
console.log(dom.window.document.body.outerHTML);
let domStr = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>` + dom.window.document.body.innerHTML + '</html>'
fs.writeFileSync('./publice/index.html',domStr,function(err){
  if(err){
    return console.error(err)
  }
})