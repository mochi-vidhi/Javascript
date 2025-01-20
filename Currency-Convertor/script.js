let fromCurrency = document.querySelector("#from-currency");
let toCurrency = document.querySelector('#to-currency');
let fromFlag = document.querySelector("#from-flag");
let toFlag = document.querySelector("#to-flag");

let btn = document.querySelector('#btn');

let baseURL = " https://v6.exchangerate-api.com/v6/Your_API_KEY/latest";

let countryCode = async () => {
    try {
        let countryURl = 'https://restcountries.com/v3.1/all';
        let countryFetch = await fetch(countryURl);
        let allcountry = await countryFetch.json();
        allcountry.forEach(country => {
            const currencyCode = Object.keys(country.currencies || {})[0];
             if(currencyCode){
                 const optionFrom = document.createElement('option');
                 const optionTo = document.createElement('option');

                 const flagUrl = country.flags.svg || country.flags.png;
                
                 optionFrom.value = currencyCode;
                 optionFrom.textContent = `${country.name.common} (${currencyCode})`;
                 fromCurrency.appendChild(optionFrom);
 
                 optionTo.value = currencyCode;
                 optionTo.textContent = `${country.name.common} (${currencyCode})`;
                 toCurrency.appendChild(optionTo);
 
                 // Add flag mapping
                 optionFrom.setAttribute("data-flag", flagUrl);
                 optionTo.setAttribute("data-flag", flagUrl);
             }    
        });

        fromCurrency.addEventListener('change',(e)=>{
            const selectedOption = fromCurrency.options[fromCurrency.selectedIndex];
            const flagUrl = selectedOption.getAttribute('data-flag');
            fromFlag.src = flagUrl;
        });

        toCurrency.addEventListener('change',(e)=>{
            const selectedOption = toCurrency.options[toCurrency.selectedIndex];
            const flagUrl = selectedOption.getAttribute('data-flag');
            toFlag.src = flagUrl;
        });
        
        fromCurrency.dispatchEvent(new Event("change"));
        toCurrency.dispatchEvent(new Event("change"));
        
    }
    catch(err){
        console.log(err);
    }
};

countryCode();

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('#amt');
    let amtVal = parseFloat(amount.value); 
    if(isNaN(amtVal) || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const fromCurrencyCode = fromCurrency.value.toUpperCase();
    const toCurrencyCode = toCurrency.value.toUpperCase();
    try{
        const URL = `${baseURL}/${fromCurrencyCode}`;
        console.log("Constructed URL:", URL);

        let response = await fetch(URL);
        if(!response.ok){
            throw new Error(`faild to fetch currency rate`);
        }

        let data = await response.json();
        console.log(data);
        let exchangeRate = data.conversion_rates[toCurrencyCode];
        console.log(exchangeRate);
        if(!exchangeRate){
            throw new Error(`Exchange rate for ${toCurrency.value} not found.`);
        }
        let convertedAmt = (amtVal * exchangeRate).toFixed(2);
        
        let para = document.querySelector('.msg p');
        para.textContent = `${amtVal} ${fromCurrency.value} = ${convertedAmt} ${toCurrency.value}`;

    }
    catch(err){
        let para = document.querySelector('.msg p');
        para.textContent = 'Failed to fetch conversion rate. please try again.'
    }
});


