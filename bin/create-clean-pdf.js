const { exec } = require('child_process');
const fixUtf8 = require('fix-utf8')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fs = require('fs')
const PDFDocument = require('pdfkit');
var slugify = require('slugify')

const pdf = new PDFDocument()

const mainContentSelector = 'div.left_content'
const filePath = process.argv[2]
const outputDir = process.argv[3]
const indexFile = process.argv[4]
const contents = fs.readFileSync(filePath, 'utf8')
const dom = new JSDOM(contents)
const { document }  = (new JSDOM(contents)).window

const doc = document.querySelector(mainContentSelector)
const title = document.querySelector('title').textContent
const slug = slugify(title, {
  replacement: '-',    // replace spaces with replacement
  remove: /[*+~.()\/,'"!:@]/g,
  lower: true,         // result in lower case
})
const outputPath = outputDir + slug + '.pdf'

try {
  doc.removeChild(document.querySelector('.yorum'))
  doc.removeChild(document.querySelector('.action-icons'))
  doc.removeChild(document.querySelector('.action-icons'))
  doc.removeChild(document.querySelector('.action-icons'))
  doc.removeChild(document.querySelector('.social-bar'))
} catch(e) {
  console.error('silent fail')
}
const cleanHtml = fixUtf8(doc.textContent).replace(/[^a-zA-Z0-9 öÖçÇşŞıİğĞüÜ\’\'\-\_\*\&\^\%\$\`\<\>\n\,\.\\\/\"\'\?\!\@\#\=\+\=\:\(\)\[\]\{\}]/g, "")

console.log(title)
console.log(slug)

console.log(outputPath)

pdf.pipe(fs.createWriteStream(outputPath))
pdf.font('fonts/regular2.ttf')
pdf.fontSize(14).text(cleanHtml)

pdf.end()

exec(`echo '- <a href="${slug}.pdf">${title}</a>' >> ${indexFile}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Index is updated`);
});
