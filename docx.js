const superagent = require('superagent');
const mammoth = require('mammoth');

const fs = require("fs");
const files = fs.readFileSync('sum.docx');

fs.readFile(files, 'utf8', function (err, contents) {
    console.log(contents);
});
return console.log(err)



mammoth.extractRawText({ path: files })
    .then(function (result) {
        var text = result.value; // The raw text 
        console.log(text);
        var messages = result.messages;
    })
    .done();
return
const url = 'http://www.ojk.ee/sites/default/files/respondus-docx-sample-file_0.docx';

const main = async () => {

    const response = await superagent.get(files)
        .parse(superagent.parse.image)
        .buffer();

    const buffer = response.body;

    return console.log(buffer)

    const text = (await mammoth.extractRawText({ buffer })).value;
    const lines = text.split('\n');

    console.log(lines);
};

main().catch(error => console.error(error));