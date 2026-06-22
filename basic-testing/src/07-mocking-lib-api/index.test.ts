import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import runAllTimers = jest.runAllTimers;

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));
    (axios.create as jest.Mock).mockImplementation(mockCreate);

    throttledGetDataFromApi('/fake_url');
    runAllTimers();

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));
    (axios.create as jest.Mock).mockImplementation(mockCreate);

    throttledGetDataFromApi('/provided/url');
    runAllTimers();

    expect(mockGet).toHaveBeenCalledWith('/provided/url');
  });

  test('should return response data', (done) => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));

    (axios.create as jest.Mock).mockImplementation(mockCreate);

    throttledGetDataFromApi('/provided/url')?.then((data) => {
      expect(data).toEqual('mock data');
      done();
    });
    runAllTimers();
  });
});
