import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

jest.mock('path', () => {
  return {
    ...jest.requireActual('path'),
    join: jest.fn(),
  };
});
jest.mock('fs', () => {
  return {
    ...jest.requireActual('fs'),
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const time = 100000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time);

    expect(setTimeout).toHaveBeenCalledWith(callback, time);

    jest.restoreAllMocks();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, time);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  const time = 100000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time);

    expect(setInterval).toHaveBeenCalledWith(callback, time);

    jest.restoreAllMocks();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, time);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathName = 'path/to/file';

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.mocked(path.join);
    mockedJoin.mockReturnValueOnce(pathName);

    await readFileAsynchronously(pathName);

    expect(mockedJoin).toHaveBeenCalledWith(__dirname, pathName);
  });

  test('should return null if file does not exist', async () => {
    const mockedExistsSync = jest.mocked(fs.existsSync);
    mockedExistsSync.mockReturnValueOnce(false);

    const returnedValue = await readFileAsynchronously(pathName);

    expect(returnedValue).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    jest.mocked(fs.existsSync).mockReturnValueOnce(true);
    const readFileMock = jest.mocked(readFile);
    readFileMock.mockResolvedValueOnce(Buffer.from(fileContent));

    const returnedValue = await readFileAsynchronously(pathName);

    expect(returnedValue).toEqual(fileContent);
  });
});
