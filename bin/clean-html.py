import requests
from readability import Document
response = requests.get('http://garbisaltinoglu.blogcu.com/turkiye-de-bir-devlet-gelenegi-ve-devlet-akli-var-mi/19749587')
doc = Document(response.text)
print doc.content()

