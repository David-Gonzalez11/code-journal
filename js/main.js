var $entryForm = document.querySelector('form');
$entryForm.addEventListener('submit', handleSubmit);
var $newBtn = document.querySelector('.new');
$newBtn.addEventListener('click', newButton);
var noEntries = document.querySelector('h5');
var img = document.querySelector('img');
var input = document.querySelector('#photoUrl');
input.addEventListener('input', handleInput);
var $photoUrl = document.querySelector('.image');
$photoUrl.addEventListener('input', handleInput);
var entriesText = document.querySelector('.entry-text');
var $EntryFormView = document.querySelector('div[data-view="entry-form"]');
var $EntriesView = document.querySelector("div[data-view='entries']");
var $save = document.querySelector('.save');
$save.addEventListener('click', viewEntries);
var $entriesLink = document.getElementById('entries');
$entriesLink.addEventListener('click', viewEntries);
var ul = document.querySelector('ul');
var modal = document.querySelector('#modal');
var overlay = document.querySelector('#overlay');
var confirmModal = document.querySelector('#confirm-modal');

// modal.addEventListener('click', editClick)
var deleteEntry = document.querySelector('h6');
deleteEntry.addEventListener('click', showModal);
function handleInput(event) {
  img.setAttribute('src', $photoUrl.value);
}
function handleSubmit(event) {
  event.preventDefault();
  var notes = $entryForm.elements.notes.value;
  var title = $entryForm.elements.title.value;
  var photoUrl = $entryForm.elements.photoUrl.value;
  if (data.editing === null) {
    var formValues = {
      title,
      notes,
      photo: photoUrl,
      id: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(formValues);
    img.setAttribute('src', 'images/placeholder-image-square.jpg');
    ul.prepend(renderEntry(formValues)
    );
  } else {
    var updatedEntryId = data.editing.id;

    var $updatedTitle = $entryForm.elements.title.value;
    var $updatedNotes = $entryForm.elements.notes.value;
    var $updatedPhotoUrl = $entryForm.elements.photoUrl.value;

    var updatedEntry = {
      title: $updatedTitle,
      notes: $updatedNotes,
      photo: $updatedPhotoUrl,
      id: updatedEntryId
    };
    var indexToUpdate = data.entries.findIndex(entry => (Number(entry.id) === Number(updatedEntryId)));
    data.entries[indexToUpdate] = updatedEntry;
    data.editing = null;
    replaceExisitngEntry(updatedEntry);
  }
  $entryForm.reset();
  $EntryFormView.classList.add('hidden');
  $EntriesView.className = ('');

}

function replaceExisitngEntry(entry) {
  var updatedNode = renderEntry(entry);
  var entryAttribute = '[data-entry-id="' + entry.id + '"]';
  var oldListItem = document.querySelector(entryAttribute);
  oldListItem.replaceWith(updatedNode);

}
// render entry startts//
function renderEntry(entry) {
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
  var heading = document.createElement('h3');
  heading.textContent = entry.title;
  var editIcon = document.createElement('i');
  editIcon.className = 'fas fa-pen';
  list.appendChild(firstDiv);
  firstDiv.appendChild(colHalfdiv);
  colHalfdiv.appendChild(image);
  firstDiv.appendChild(secondcolHalf);
  secondcolHalf.appendChild(heading);
  secondcolHalf.appendChild(description);
  heading.appendChild(editIcon);
  return list;
}

function editClick(event) {
  data.view = 'entry-form';
  var toEdit = event.target.closest('li');
  var entryId = toEdit.getAttribute('data-entry-id');
  var entry = data.entries.find(entry => entry.id == (entryId));
  if (event.target.tagName === 'I') {
    entriesText.textContent = 'Edit Entry';
    $EntriesView.className = 'hidden';
    $entryForm.className = '';
    data.editing = entry;
    var $title = document.querySelector('#title');
    var $notes = document.querySelector('#notes');
    var $photoUrl = document.querySelector('#photoUrl');
    var existingEntryId = document.querySelector('#existingEntryId');
    $title.value = (data.editing.title);
    $notes.value = (data.editing.notes);
    $photoUrl.value = (data.editing.photo);
    img.setAttribute('src', $photoUrl.value);
    existingEntryId.value = (data.editing.id);
  }
}
window.addEventListener('DOMContentLoaded', domContentLoaded);
function domContentLoaded(event) {
  var $entriesList = document.querySelector('.parent');
  $entriesList.addEventListener('click', editClick);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      var entry = renderEntry(data.entries[i]);
      $entriesList.appendChild(entry);
      stayOnSamePageAfterRefresh();

    }
  }
}
function viewEntryForm(event) {
  data.view = 'entry-form';
  $entryForm.className = '';
  $EntriesView.className = 'hidden';
  $entryForm.reset();
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  entriesText.textContent = 'New Entry';
}
function viewEntries(event) {
  data.view = 'entries';
  $EntriesView.className = '';
  $entryForm.classList.add('hidden');
  if (data.entries.length === 0) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
    noEntries.textContent = '';
  }
}
function stayOnSamePageAfterRefresh() {
  if (data.view === 'entries') {
    viewEntries();
  } else {
    viewEntryForm();
  }
}
var $ul = document.querySelector('ul');
$ul.addEventListener('click', clicksOnParent);
function clicksOnParent(event) {
}

function newButton(event) {
  if (event.target === $newBtn) {
    $entryForm.className = '';
    $EntriesView.classList.add('hidden');
  }
}
function showModal(event) {
  if (event.target === deleteEntry) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
}

var cancelBtn = document.querySelector('#close-modal-btn');
cancelBtn.addEventListener('click', removeEntry);

function removeEntry(event) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

}
var currentEntry = data.editing.id;
confirmModal.addEventListener('click', deleteAnEntry);
function deleteAnEntry(event) {

  var $li = document.querySelectorAll('li');
  for (var i = 0; i < data.entries.length; i++) {

    var entryIdValue = $li[i].getAttribute('data-entry-id');
    var parsedValue = parseInt(entryIdValue);

    if (currentEntry === parsedValue) {
      data.entries.splice(i, 1);
      $li[i].remove();
      viewEntries();
    }
  }
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  data.editing = null;
  data.view = ('entries');
}
