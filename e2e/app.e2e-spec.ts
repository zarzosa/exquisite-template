import { ExquisiteTemplatePage } from './app.po';

describe('exquisite-template App', () => {
  let page: ExquisiteTemplatePage;

  beforeEach(() => {
    page = new ExquisiteTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
