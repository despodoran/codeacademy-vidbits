const {assert} = require('chai');
const {buildVideoObject} = require('../test-helpers');

function fillFormAndSubmit(video) {
  browser.setValue('#video-title', video.title);
  browser.setValue('#video-description', video.description);
  browser.setValue('#video-url', video.videoUrl);
  browser.click('#submit-video');
}

describe('User visits the video creation page', () => {
  describe('Add a new video', () => {
    it('Has an empty form', () => {
      browser.url('/videos/create');

      assert.equal(browser.getText('#video-title'), '');
      assert.equal(browser.getText('#video-description'), '');
      assert.equal(browser.getText('#video-url'), '');
    });

    it('Redirects to the landing page with the newly posted video', () => {
      const video = buildVideoObject();

      browser.url('/videos/create');
      fillFormAndSubmit(video);

      // console.log(browser.getSource());
      assert.include(browser.getText('.contents-container'), video.title);
    });
  });

  describe('Has access to creation page', () => {
    it('Has a link to /videos/create', () => {
      browser.url('/');

      browser.click('a[href="/videos/create"]');

      assert.include(browser.getText('body'), 'Save a video');
    });
  });
});
