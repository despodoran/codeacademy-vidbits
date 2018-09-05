const {assert} = require('chai');
const {buildVideoObject, generateRandomUrl} = require('../test-helpers');

function fillFormAndSubmit(video) {
  browser.setValue('#video-title', video.title);
  browser.setValue('#video-description', video.description);
  browser.setValue('#video-url', video.videoUrl);
  browser.click('#submit-video');
}

describe('User visits the update page', () => {
  describe('Updating the video details', () => {
    it('Changes values', async () => {
      const title = 'original title';
      const updatedTitle = 'updated title';
      const video = buildVideoObject({'title': title, 'videoUrl': generateRandomUrl('youtube.com')});
      const updatedVideo = buildVideoObject({'title': updatedTitle, 'videoUrl': generateRandomUrl('youtube.com')});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.click('#edit');
      fillFormAndSubmit(updatedVideo);

      assert.include(browser.getText('body'), updatedVideo.title);
      assert.include(browser.getText('body'), updatedVideo.description);
      assert.equal(browser.getAttribute('iframe', 'src'), updatedVideo.videoUrl);
    });

    it('Does not create a video', async () => {
      const title = 'original title';
      const updatedTitle = 'updated title';
      const video = buildVideoObject({'title': title, 'videoUrl': generateRandomUrl('youtube.com')});
      const updatedVideo = buildVideoObject({'title': updatedTitle, 'description': 'newdesc', 'videoUrl': generateRandomUrl('youtube.com')});

      browser.url('/videos/create');
      fillFormAndSubmit(video);
      browser.click('#edit');
      fillFormAndSubmit(updatedVideo);

      assert.notInclude(browser.getText('body'), video.title);
      assert.notInclude(browser.getText('body'), video.description);
      assert.notEqual(browser.getAttribute('iframe', 'src'), video.videoUrl);
    });
  });
});
