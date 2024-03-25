'use client'
import { useState } from 'react';

const Home: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMonthlyPayment = () => {
    const principalValue = parseFloat(principal);
    const interestRateValue = parseFloat(interestRate) / 100 / 12;
    const loanTermMonths = parseFloat(loanTerm) * 12;

    if (isNaN(principalValue) || isNaN(interestRateValue) || isNaN(loanTermMonths) || principalValue <= 0 || interestRateValue <= 0 || loanTermMonths <= 0) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const x = Math.pow(1 + interestRateValue, loanTermMonths);
    const monthlyPaymentValue =
      (principalValue * x * interestRateValue) / (x - 1);

    setMonthlyPayment(monthlyPaymentValue);
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
      setPrincipal(value);
    }
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
      setInterestRate(value);
    }
  };

  const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
      setLoanTerm(value);
    }
  };

  const handleClear = () => {
    setPrincipal('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment(null);
  };

  return (
    <div className="container">
      <h1 className="text-center font-bold text-xl mt-auto">Mortgage Calculator</h1>
      <div className='mb-2'>
        <label className="block">Principal Amount ($): </label>
        <input type="number" value={principal} min='0' onChange={(e) => setPrincipal(e.target.value)} required 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" />
      </div>
      <div className='mb-2'>
        <label className="block">Interest Rate (%): </label>
        <input type="number" value={interestRate} min='0' onChange={(e) => setInterestRate(e.target.value)} required 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" />
      </div>
      <div className='mb-2'>
        <label className="block">Loan Term (in Years): </label>
        <input type="number" value={loanTerm}  min='0' onChange={(e) => setLoanTerm(e.target.value)} required 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" />
      </div>
      <div className="flex justify-center m-2">
        <button onClick={calculateMonthlyPayment} className="border border-black hover:border-green-600 p-2 rounded-md hover:bg-green-600 mr-2">Calculate</button>
        <button onClick={handleClear} className="border border-black hover:border-red-600 p-2 rounded-md hover:bg-red-600">Clear</button>
      </div>
      {monthlyPayment !== null && <div className="result">
        <h2 className="text-center font-medium text-lg">Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
      </div>}
    </div>
  );
};

export default Home;
