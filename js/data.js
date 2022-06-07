// // /* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('code-journal');
if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', handleWindows);
function handleWindows(event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', todosJSON);

}
