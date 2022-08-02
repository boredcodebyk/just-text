//import * as PouchDB from 'pouchdb';
//declare function require(name:string);
import PouchDB from "pouchdb";
console.log(PouchDB)

const txtdb = new PouchDB('jtext');

var remoteCouch = false;

txtdb.changes({
  since: 'now',
  live: true
}).on('change', showText);

var fetchedText = "";
function addText(id, _title, _text) {
  var txto = {
    _id: id,
    title: _title,
    text: _text,
    completed: false
  };
  txtdb.put(txto, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
};

function showText() {
  txtdb.allDocs({include_docs: true, descending: true}, function(err, doc) {
    fetchedText = doc.rows;
  });
};

function deleteTxt(_id) {
  txtdb.get(_id).then(function(doc) {
    return txtdb.remove(doc);
  }).then(function (result) {
    // handle result
  }).catch(function (err) {
    console.log(err);
  });
}

export {addText, showText, fetchedText, txtdb, deleteTxt};

