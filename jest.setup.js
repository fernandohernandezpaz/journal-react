
require('dotenv').config({
  path: '.env',
});

jest.mock('./src/core/helpers/getEnvironment.helper', () => ({
  getEnvironment: () => ({ ...process.env }),
}));
