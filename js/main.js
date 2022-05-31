var $entryForm = document.querySelector('form');
$entryForm.addEventListener('submit', handleSubmit);
function handleInput(event) {
  img.setAttribute('src', input.value);
}

var img = document.querySelector('img');

function handleSubmit(event) {
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
    $entryForm.reset();
  }
}

var input = document.querySelector('#photoUrl');
input.addEventListener('input', handleInput);

var photoUrl = document.querySelector('.image');
photoUrl.addEventListener('input', handleInput);

// render entry startts//
function renderEntry(entry) {
  window.addEventListener('DOMContentLoaded', renderEntry);
  var list = document.createElement('li');
  list.setAttribute('data-entry-id', entry.id);

  var firstDiv = document.createElement('div');
  firstDiv.setAttribute('class', 'row');

  var colHalfdiv = document.createElement('div');
  colHalfdiv.setAttribute('class', 'column-half');

  var secondcolHalf = document.createElement('div');
  secondcolHalf.setAttribute('class', 'column-half');

  var description = document.createElement('p');
  description.textContent = entry.notes;

  var image = document.createElement('img');
  image.setAttribute('src', entry.photo);

  var heading = document.createElement('h2');
  heading.textContent = entry.title;

  list.appendChild(firstDiv);
  firstDiv.appendChild(colHalfdiv);
  colHalfdiv.appendChild(image);
  firstDiv.appendChild(secondcolHalf);
  secondcolHalf.appendChild(heading);
  secondcolHalf.appendChild(description);
  var ul = document.querySelector('ul');
  ul.append(list);
  return list;

}

var $entriesView = document.querySelector('#entries');
$entriesView.addEventListener('click', viewEntryForm);
var entryTextChange = document.querySelector('.entry-text');
function viewEntryForm(event) {
  data.view = 'entry-form';
  $entriesView.className = '.hidden';
  $entryForm.className = '';

}

function viewEntries(event) {
  data.view = 'entries';
  $entriesView.className = '';
  $entryForm.classList.add('hidden');
  entryTextChange.textContent = 'Entries';

}
