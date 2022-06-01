var $entryForm = document.querySelector('form');
$entryForm.addEventListener('submit', handleSubmit);
var $newBtn = document.querySelector('.new');
$newBtn.addEventListener('click', viewEntryForm);
var noEntries = document.querySelector('h5');
// var EntriesText = document.querySelector('.entries-text');
function handleInput(event) {
  img.setAttribute('src', input.value);
}

var img = document.querySelector('img');

function handleSubmit(event) {
  event.preventDefault();
  var notes = $entryForm.elements.notes.value;
  var title = $entryForm.elements.title.value;
  var photoUrl = $entryForm.elements.photoUrl.value;
  if (data.editing === null) {
    var formValues = {
      title,
      notes,
      photoUrl,
      id: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(formValues);
    img.setAttribute('src', 'images/placeholder-image-square.jpg');
    renderEntry(formValues);
    $entryForm.reset();
  }
}

var input = document.querySelector('#photoUrl');
input.addEventListener('input', handleInput);
var photoUrl = document.querySelector('.image');
photoUrl.addEventListener('input', handleInput);
// render entry startts//

function renderEntry(entry) {
  var list = document.createElement('li');
  var firstDiv = document.createElement('div');
  firstDiv.setAttribute('class', 'row');
  var colHalfdiv = document.createElement('div');
  colHalfdiv.setAttribute('class', 'column-half');
  var secondcolHalf = document.createElement('div');
  secondcolHalf.setAttribute('class', 'column-half');
  var description = document.createElement('p');
  description.textContent = entry.notes;
  var image = document.createElement('img');
  image.setAttribute('src', entry.photoUrl);
  var heading = document.createElement('h3');
  heading.textContent = entry.title;

  list.appendChild(firstDiv);
  firstDiv.appendChild(colHalfdiv);
  colHalfdiv.appendChild(image);
  firstDiv.appendChild(secondcolHalf);
  secondcolHalf.appendChild(heading);
  secondcolHalf.appendChild(description);
  var ul = document.querySelector('.parent');
  ul.prepend(list);

  return list;
}
window.addEventListener('DOMContentLoaded', DOMContentLoaded);

function DOMContentLoaded(event) {
  var $entriesList = document.querySelector('.parent');
  $entriesList.addEventListener('click', editClick);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      var entry = renderEntry(data.entries[i]);
      $entriesList.appendChild(entry);
    }
  }
}
function editClick(event) {
}
var $entriesLink = document.getElementById('entries');
$entriesLink.addEventListener('click', viewEntries);
function viewEntryForm(event) {
  data.view = 'entry-form';
  $entryForm.className = '';
  $EntriesView.className = 'hidden';
}
function viewEntries(event) {
  data.view = 'entries';
  $EntriesView.className = '';
  $entryForm.classList.add('hidden');
  if (data.entries.length === 0) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
  }
}
var $EntryFormView = document.querySelector('div[data-view="entry-form"]');
var $EntriesView = document.querySelector("div[data-view='entries']");
var $save = document.querySelector('.save');
$save.addEventListener('click', viewEntries);

function stayOnSamePageAfterRefresh() {
  if (data.view === 'entries') {
    viewEntries();
  } else {
    viewEntryForm();
  }
}
stayOnSamePageAfterRefresh();
