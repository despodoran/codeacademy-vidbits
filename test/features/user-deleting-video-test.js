const chai = require('chai');
chai.use(require('chai-string'));
const {assert} = chai;
const {buildVideoObject, generateRandomUrl} = require('../test-helpers');

function fillFormAndSubmit(video) {
  browser.setValue('#video-title', video.title);
  browser.setValue('#video-description', video.description);
  browser.setValue('#video-url', video.videoUrl);
  browser.click('#submit-video');
}

describe('User deleting video', () => {
  describe('after deletion', () => {
    it('should remove the video from the list', async () => {
      const title = 'the new title';
      const video = buildVideoObject({'title': title, 'videoUrl': generateRandomUrl()});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.click('#delete');

      assert.notInclude(browser.getText('body'), video.title);
      assert.endsWith(browser.getUrl(), '/videos');
    });
  });
});
