import { AngulrSrcPage } from './app.po';

describe('angulr-src App', function() {
  let page: AngulrSrcPage;

  beforeEach(() => {
    page = new AngulrSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
