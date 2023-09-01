// ИСХОДНЫЕ ДАННЫЕ НЕ ТРОГАТЬ!*

let successful = []

let unSuccessful = []

let taxes = Number

let taxesMax = {}

let taxesMin = {}

// Реальные данные 2021*

let bank = [

{

name: 'Apple',

budget: 1000000,

tax: 28,

expensesPerYear: [

{ title: 'Salaries', total: 125000 },

{ title: 'Utilities', total: 18000, },

{ title: 'Rent', total: 258000 }

]

},

{

name: 'Microsoft',

budget: 988000,

tax: 21,

expensesPerYear: [

{

title: 'Salaries',

total: 148000

},

{

title: 'Utilities',

total: 124000,

},

{

title: 'Rent',

total: 314000

}

]

},

{

name: 'HP',

budget: 609000,

tax: 14,

expensesPerYear: [

{

title: 'Salaries',

total: 414000

},

{

title: 'Utilities',

total: 19000,

},

{

title: 'Rent',

total: 114400

}

]

},

{

name: 'Xiaomi',

budget: 889500,

tax: 17,

expensesPerYear: [

{

title: 'Salaries',

total: 318000

},

{

title: 'Utilities',

total: 14000,

},

{

title: 'Rent',

total: 169000

}

]

},

{

name: 'Samsung',

budget: 889500,

tax: 12,

expensesPerYear: [

{

title: 'Salaries',

total: 650400

},

{

title: 'Utilities',

total: 29000,

},

{

title: 'Rent',

total: 212000

}

]

},

]

// 1. Высчитать месячные траты, создав ключ expensesPerMonth в объектах*

// 2. Высчитать отношение трат в месяц к месячному бюджету в процентах, создав ключ procent в объектах. Например компания в месяц зарабатывает 100,000, а тратит 25,000, значит ее ключ procent = 25%*

// 3. Сохранить successful и unsuccessful и добавить туда фирмы, вычитав налог tax*

// 4. Сохранить в переменной taxes общее количество налогов со всех компаний. Например все платят по 20,000 в месяц. В итоге taxes = 100,000*

// 5. Сохранить в переменных taxesMax и taxesMin те, компанию которая больше и меньше всех платит налоги*

// 6. Добавить ключ totalMoney в каждой компании. Эта переменная показывает сколько в итоге осталось денег в компании после вычета всех налогов и трат*

// * Писать весь код в функции `setup()`*

// ТРИ ОЦЕНКИ. ЧИСТОТА КОДА, ЛОГИКА РАБОТЫ, УНИКАЛЬНОСТЬ КОДА*

const setup = () => {
    //task 1 new key in bank called expensesPerMonth

    bank.forEach(company => {
        const monthlyExpenses = company.expensesPerYear.reduce((total, expense) => total + expense.total, 0) / 12;
        company.expensesPerMonth = monthlyExpenses.toFixed();
    });
    console.log(bank);

    //task 2 calculate ratio of company's  monthly budget to monthly expenses, save in key monthlyBudgetExpensesRatio

    bank.forEach(company => {
        const monthlyBudget = company.budget / 12;
        const monthlyBudgetExpensesRatio  = (company.expensesPerMonth / monthlyBudget) * 100;
        company.monthlyBudgetExpensesRatio = monthlyBudgetExpensesRatio.toFixed(1) + '%';
    });
    console.log(bank);
    
    //task 3 and 6 combined(successful and unSuccessful companies), new key totalMoney 


bank.forEach(company => {
    const taxAmount = (company.budget * company.tax) / 100;
    const remainingBudget = (company.budget - company.expensesPerMonth) - taxAmount;

    company.totalMoney = remainingBudget ;

    if (remainingBudget > 0) {
        successful.push(company);
    } else {
        unSuccessful.push(company);
    }
})
console.log('Успешные компании:');
successful.forEach(company => {
    console.log(`${company.name}: Остаток бюджета - $${company.totalMoney.toFixed(2)}`);
});

console.log('Неуспешные компании:');
unSuccessful.forEach(company => {
    console.log(`${company.name}: Остаток бюджета - $${company.totalMoney.toFixed(2)}`);
});


//task 4 taxes total amount

const taxes = bank.reduce((total, company) => total + (company.budget * company.tax) / 100, 0);
console.log( `Общая сумма налогов, которые должны заплатить все компании: $${taxes}`);

//task 5 taxesMax and taxesMin 

let taxesMax = bank[0];
let taxesMin = bank[0];

bank.forEach(company => {
    const taxAmount = (company.budget * company.tax) / 100;

    if (taxAmount > (taxesMax.budget * taxesMax.tax) / 100) {
        taxesMax = company;
    }

    if (taxAmount < (taxesMin.budget * taxesMin.tax) / 100) {
        taxesMin = company;
    }

});

console.log(`Больше всех налогов платит компания ${taxesMax.name}: $${taxesMax.budget * taxesMax.tax / 100}`);
console.log(`Меньше всех налогов платит компания ${taxesMin.name}: $${taxesMin.budget * taxesMin.tax / 100}`);

}

setup()