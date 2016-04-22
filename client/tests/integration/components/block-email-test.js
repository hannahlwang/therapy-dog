import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';

moduleForComponent('block-email', 'Integration | Component | Email block', {
  integration: true
});

let block = Ember.Object.create({
  type: 'email',
  key: 'email',
  label: 'Email Address',
  required: true
});

test('it renders', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-email entry=entry}}`);

  assert.equal(this.$('label').text().trim(), 'Email Address');
  assert.ok(this.$('.block').hasClass('required'));
});

test('it updates the entry value when text is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-email entry=entry}}`);

  this.$('input').val('info@email.edu');
  this.$('input').change();

  assert.deepEqual(entry.get('value'), 'info@email.edu');
});

test('it is invalid with no text entered if required', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-email entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('');
  this.$('input').change();

  assert.ok(this.$('.block').hasClass('invalid'));
});

test('it is invalid if an invalid email is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-email entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('infoemail.edu');
  this.$('input').change();

  assert.ok(this.$('.block').hasClass('invalid'));
});

test('it is valid if an valid email is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-email entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('info@email.edu');
  this.$('input').change();

  assert.notOk(this.$('.block').hasClass('invalid'));
});