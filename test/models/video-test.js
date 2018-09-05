const {assert} = require('chai');
const Video = require('../../models/video');
const {buildVideoObject} = require('../test-helpers');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Video model', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('Is a string', () => {
      const titleNotAString = 11;
      const newItem = new Video(buildVideoObject({'title': titleNotAString}));

      assert.strictEqual(newItem.title, titleNotAString.toString());
    });

    it('Is is required', () => {
      let theVideo = buildVideoObject();
      theVideo.title = undefined;
      const newItem = new Video(theVideo);
      newItem.validateSync();

      assert.equal(newItem.errors.title.message, 'a title is required');
    });
  });

  describe('#videoUrl', () => {
    it('Is a string', () => {
      const videoUrlNotAString = 11;
      const newItem = new Video(buildVideoObject({'videoUrl': videoUrlNotAString}));

      assert.strictEqual(newItem.videoUrl, videoUrlNotAString.toString());
    });

    it('Is required', () => {
      let theVideo = buildVideoObject();
      theVideo.videoUrl = undefined;
      const newItem = new Video(theVideo);
      newItem.validateSync();

      assert.equal(newItem.errors.videoUrl.message, 'a URL is required');
    });
  });

  describe('#description', () => {
    it('is a String', () => {
      const descriptionNotAString = 11;
      const newItem = new Video(buildVideoObject({'description': descriptionNotAString}));

      assert.strictEqual(newItem.description, descriptionNotAString.toString());
    });

    it('is required', () => {
      let theVideo = buildVideoObject();
      theVideo.description = undefined;
      const newItem = new Video(theVideo);
      newItem.validateSync();

      assert.equal(newItem.errors.description.message, 'a description is required');
    });
  });
});
