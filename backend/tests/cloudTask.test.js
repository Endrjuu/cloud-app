const { test } = require('node:test');
const assert = require('assert');

class CloudTask {
  constructor() {
    this.Name = '';
    this.IsCompleted = false;
  }
}

test('NewTask_ShouldNotBeCompleted', () => {
  const task = new CloudTask();

  task.Name = 'Przetestować bezpiecznik';

  assert.strictEqual(task.IsCompleted, false);
  console.log('✓ Nowe zadanie ma IsCompleted = false');
});