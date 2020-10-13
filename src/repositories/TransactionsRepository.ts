import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public setBalance(): void {
    const allIncomeValuesArray = this.transactions.map(transaction =>
      transaction.type === 'income' ? transaction.value : 0,
    );

    const allOutcomeValuesArray = this.transactions.map(transaction =>
      transaction.type === 'outcome' ? transaction.value : 0,
    );

    const sum = (acc: number, cur: number): number => acc + cur;

    const reducer = (valuesArray: Array<number>): number =>
      valuesArray.reduce(sum);

    const income = reducer(allIncomeValuesArray);
    const outcome = reducer(allOutcomeValuesArray);
    const extract = income - outcome;
    let total = 0;

    if (extract >= 0) {
      total = extract;
    } else {
      throw Error('Deuu erro!');
    }

    this.balance = {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    this.setBalance();

    return transaction;
  }
}

export default TransactionsRepository;
