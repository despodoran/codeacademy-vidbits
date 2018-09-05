const {assert} = require('chai');
const {buildVideoObject, generateRandomUrl} = require('../test-helpers');

function fillFormAndSubmit(video) {
  browser.setValue('#video-title', video.title);
  browser.setValue('#video-description', video.description);
  browser.setValue('#video-url', video.videoUrl);
  browser.click('#submit-video');
}

describe('User visits the landing page', () => {
  describe('empty on the initial visit', () => {
    it('should contain no videos', async () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('With existing videos', () => {
    it('should display them', async () => {
      const title = 'the new title';
      const video = buildVideoObject({'title': title});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.url('/');

      assert.include(browser.getText('#videos-container'), title);
    });

    it('Should display the video', () => {
      const title = 'the new title';
      const video = buildVideoObject({'title': title, 'videoUrl': generateRandomUrl()});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.url('/');

      const iframeElement = browser.element('iframe');

      assert.notInclude(iframeElement, {'state': 'failure'}, 'iframe not found');
      assert.equal(browser.getAttribute('iframe', 'src'), video.videoUrl);
    });

    it('Can navigate to a video', () => {
      const title = 'the new title 2';
      const video = buildVideoObject({'title': title, 'videoUrl': generateRandomUrl('youtube.com')});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.url('/');

      browser.click('.video-title a');

      assert.include(browser.getText('body'), video.title);
      assert.include(browser.getText('body'), video.description);
      assert.equal(browser.getAttribute('iframe', 'src'), video.videoUrl);
    });
  });

  describe('Has access to creation page', () => {
    it('has a link to /videos/create', async () => {
      browser.url('/');

      browser.click('a[href="/videos/create"]');

      assert.include(browser.getText('body'), 'Save a video');
    });
  });
});
