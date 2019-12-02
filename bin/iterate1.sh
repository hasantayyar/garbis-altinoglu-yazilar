# Make sure globstar is enabled
shopt -s globstar
for f in ../garbisaltinoglu.blogcu.com/**/*.html;
do
  echo "Generating pdf file for $f"
  node create-clean-pdf.js $f
done
