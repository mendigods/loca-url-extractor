/**************************************
 * 
 *      Author: David Martins
 *          URL EXTRACTOR
 * 
 ***************************************/

//Dependências
const fs = require("fs");
const getUrls = require('get-urls');
var http = require('http');

//Localização dos ficheiros HTML
let directory = "data";
let dirBuf = Buffer.from(directory);

//Pega uma lista de todos os ficheiros e mete dentro de um Array => files
var url;
fs.readdir(dirBuf, (err,files) => {
    
    if (err) {
        console.log(err.message);
    } else {
        //Mostra os ficheiros na pasta
        //console.log(files);
        //Mostra o número de ficheiros na pasta
        let totalFiles = files.length;
        console.log("Número de ficheiros: "+totalFiles);
        
        //Faz a leitura dos ficheiros dentro do Array => files
        for (i = 0; i < totalFiles; i++) {
            var contents = fs.readFileSync(__dirname + "/data/" + files[i] , 'utf8');
            //console.log(contents);
            console.log("Ficheiro número: " + i);

            //Trata o html e devolve todos os urls dentro dos ficheiros
           //console.log(getUrls(contents))

           aux = getUrls(contents)
           //console.log(url);

           //Converte o objeto em string
           url = Array.from(aux).join("\n\n"+"Nome do ficheiro -> "+files[i]+'\n')
           //console.log(Array.from(aux).join('\n'));

           //Guarda os links no ficheiro url.txt
           fs.appendFile('url.txt', url, function (err) {
            if (err) throw err;
            console.log('Dados extraidos.');
          });
        }
    }
})

//importa os dados para a variável
fs.readFile('url.txt', 'utf8', function(err, contents) {
    url_extraidos = contents
});

//Cria um servidor local
http.createServer(function (req, res) {
    res.write(url_extraidos); //escreve os dados
    res.end(); //fecha a respota
  }).listen(8080); //o servidor vai ficar na escuta na porta 8080