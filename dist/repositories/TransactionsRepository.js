"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
        this.balance = {
            income: 0,
            outcome: 0,
            total: 0,
        };
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        return this.balance;
    };
    TransactionsRepository.prototype.setBalance = function () {
        var allIncomeValuesArray = this.transactions.map(function (transaction) {
            return transaction.type === 'income' ? transaction.value : 0;
        });
        var allOutcomeValuesArray = this.transactions.map(function (transaction) {
            return transaction.type === 'outcome' ? transaction.value : 0;
        });
        var sum = function (acc, cur) { return acc + cur; };
        var reducer = function (valuesArray) {
            return valuesArray.reduce(sum);
        };
        var income = reducer(allIncomeValuesArray);
        var outcome = reducer(allOutcomeValuesArray);
        var extract = income - outcome;
        var total = 0;
        if (extract >= 0) {
            total = extract;
        }
        else {
            throw Error('Deuu erro!');
        }
        this.balance = {
            income: income,
            outcome: outcome,
            total: total,
        };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        this.setBalance();
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
