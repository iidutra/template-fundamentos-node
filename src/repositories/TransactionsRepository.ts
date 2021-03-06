import Transaction from '../models/Transaction';
import { json } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, incomeTransaction) => incomeTransaction.value + total, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (total, outcomeTransaction) => outcomeTransaction.value + total,
        0,
      );

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title,type,value});

    this.transactions.push(transaction)

    return transaction;
  }
}

export default TransactionsRepository;
