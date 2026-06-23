import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from './index';
import { random } from 'lodash';

jest.mock('lodash', () => {
  const originalLodash = jest.requireActual('lodash');

  return {
    ...originalLodash,
    random: jest.fn(),
  };
});

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  const initialBalance = 100;

  beforeEach(() => {
    bankAccount = new BankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(101)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = new BankAccount(0);

    expect(() => bankAccount.transfer(101, newBankAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(10, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    bankAccount.deposit(10);

    expect(bankAccount.getBalance()).toEqual(110);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(10);

    expect(bankAccount.getBalance()).toEqual(90);
  });

  test('should transfer money', () => {
    const newBankAccount = new BankAccount(0);
    bankAccount.transfer(40, newBankAccount);

    expect(bankAccount.getBalance()).toEqual(60);
    expect(newBankAccount.getBalance()).toEqual(40);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockedRandom = jest.mocked(random);
    mockedRandom.mockReturnValueOnce(42).mockReturnValueOnce(1);
    await expect(bankAccount.fetchBalance()).resolves.toEqual(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(4);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toEqual(4);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
