const Browser = require("zombie");
var port = 8080;
var url = "http://localhost:" + port;

const browser = new Browser();
var expect = require('expect');
var assert = require('assert');
var express = require('express');
var serveStatic = require('serve-static');

var app = express();
app.use(serveStatic('.', {'index': ['index.html']}));

var httpServer = require('http').createServer(app);

describe("Testing bunny player with zombie", function() {

  before(function(done) {
    httpServer.listen(port, () => {
      browser.visit(url, done);
    });
  });

  after(function(done) {
    httpServer.close(done);
  });

  it("should have defined headless browser", function(){
    expect(typeof browser != "undefined").toBe(true);
    expect(browser instanceof Browser).toBe(true);
    assert.ok(browser.success);
  });

  it("check title", function() {
    assert.equal(browser.text('h1'), 'Bunny Player', "equal is not success");
  });

  it("check player", function() {
    browser.assert.element('#player');
    browser.assert.evaluate("mediaPlayer.paused", true);
  });

  it("check play button", function() {
    browser.assert.element('#play-pause');
    browser.assert.evaluate("!playPauseBtn.click();");
    browser.assert.evaluate("playPauseBtn.title === 'pause'");
  });

});
