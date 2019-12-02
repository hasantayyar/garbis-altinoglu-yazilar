const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fs = require('fs')
const PDFDocument = require('pdfkit');

const pdf = new PDFDocument()

const mainContentSelector = 'div.left_content'
const filePath = process.argv[2]
const contents = fs.readFileSync(filePath, 'utf8')
const dom = new JSDOM(contents)
const { document }  = (new JSDOM(contents)).window

const doc = document.querySelector(mainContentSelector)

doc.removeChild(document.querySelector('.yorum'))
doc.removeChild(document.querySelector('.action-icons'))
doc.removeChild(document.querySelector('.action-icons'))
doc.removeChild(document.querySelector('.action-icons'))
doc.removeChild(document.querySelector('.social-bar'))

const cleanHtml = doc.textContent

console.log(cleanHtml)

pdf.pipe(fs.createWriteStream(`${(process.argv[2].replace('.html','.pdf'))}`))
pdf.font('fonts/regular.ttf')
pdf.fontSize(14)
   .text(cleanHtml)

pdf.end() 
