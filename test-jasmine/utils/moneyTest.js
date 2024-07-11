import { formatCurrency } from "../../script/utils/money.js";


describe('Test Suite: formatCurrency', ()=>{

  it('Converts cents into dollars', ()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('Works with 0', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Round up to the nearest cent', ()=>{
    expect(formatCurrency(2999.5)).toEqual('30.00');
  });

  it('Round down to the nearest cent', ()=>{
    expect(formatCurrency(2999.1)).toEqual('29.99');
  });


})