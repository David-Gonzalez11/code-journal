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
