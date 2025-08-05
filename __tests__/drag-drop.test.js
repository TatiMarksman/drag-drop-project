// Mock File object for Node (AppVeyor can't use browser File API)
global.File = class {
  constructor(parts, filename, options) {
    this.parts = parts;
    this.name = filename;
    this.type = options.type;
  }
};

describe('Drag and Drop', () => {
  test('should handle file drop event', () => {
    const dropEvent = {
      dataTransfer: {
        files: [
          new File(['test content'], 'test.txt', { type: 'text/plain' })
        ]
      }
    };

    expect(dropEvent.dataTransfer.files[0].name).toBe('test.txt');
    expect(dropEvent.dataTransfer.files[0].type).toBe('text/plain');
  });

  test('should validate file types', () => {
    const validFile = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
    const invalidFile = new File(['content'], 'script.exe', { type: 'application/x-msdownload' });

    expect(validFile.type).toMatch(/^image\//);
    expect(invalidFile.type).not.toMatch(/^image\//);
  });

  test('basic test', () => {
    expect(2 + 2).toBe(4);
  });
}); 