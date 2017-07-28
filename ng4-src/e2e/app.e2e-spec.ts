import { Ng4SrcPage } from './app.po';

describe('ng4-src App', () => {
  let page: Ng4SrcPage;

  beforeEach(() => {
    page = new Ng4SrcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
