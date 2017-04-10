import { CwbPage } from './app.po';

describe('cwb App', () => {
  let page: CwbPage;

  beforeEach(() => {
    page = new CwbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
