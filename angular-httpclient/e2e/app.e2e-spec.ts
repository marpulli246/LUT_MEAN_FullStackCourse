import { AngularHttpclientPage } from './app.po';

describe('angular-httpclient App', function() {
  let page: AngularHttpclientPage;

  beforeEach(() => {
    page = new AngularHttpclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
