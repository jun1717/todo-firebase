const MAX_RECENT_UPDATED_TODOS = 3;

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const addRecentUpdate = (uid, todoId, text, eventType) => {
  return admin.database().ref('/users/' + uid + '/displayName').once('value').then((snapshot) => {
    const displayName = snapshot.val();
    return (admin.database().ref('/recentUpdatedTodos/' + todoId).set({
      uid,
      displayName,
      text,
      eventType,
      _updatedAt: admin.database.ServerValue.TIMESTAMP
    }));
  });
}

exports.addRecentUpdateOnCreate = functions.database.ref('/todos/{uid}/{todoId}/text')
  .onCreate((snapshot, context) => {
    const uid = context.params.uid;
    const todoId = context.params.todoId;
    const text = snapshot.val();

    return addRecentUpdate(uid, todoId, text, 'CREATE');
  })

exports.addRecentUpdateOnUpdateCompleted = functions.database.ref('/todos/{uid}/{todoId}/completed')
  .onUpdate((change, context) => {
    const todoId = context.params.todoId;
    const uid = context.params.uid;

    return change.after.ref.parent.child('text').once('value').then((snapshot) => {
      const text = snapshot.val();
      return addRecentUpdate(uid, todoId, text, 'UPDATE');
    });
  })

exports.limitRecentUpdatedTodos = functions.database.ref('/recentUpdatedTodos/{todoId}/_updatedAt')
  .onCreate((snapshot, context) => {
    const recentUpdatedTodosRef = snapshot.ref.parent.parent;
    return recentUpdatedTodosRef.orderByChild('_updatedAt').once('value').then((todosSnapshot) => { // #1

      if (todosSnapshot.numChildren() <= MAX_RECENT_UPDATED_TODOS) {
        return null;
      }

      let childCount = 0;
      const updates = {};
      todosSnapshot.forEach((child) => {
        // remove old updates
        if (++childCount <= todosSnapshot.numChildren() - MAX_RECENT_UPDATED_TODOS) {  // #2
          console.log('aaaa');
          updates[child.key] = null;  // #3
        }
      });
      return recentUpdatedTodosRef.update(updates);  // #4
    });
  })