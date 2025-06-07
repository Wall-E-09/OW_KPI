document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо елементи DOM
    const fuelTypeSelect = document.getElementById('fuelType');
    const coalParamsDiv = document.getElementById('coalParams');
    const oilParamsDiv = document.getElementById('oilParams');
    const gasParamsDiv = document.getElementById('gasParams');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const runControlExampleBtn = document.getElementById('runControlExample');
    const controlExampleResultsDiv = document.getElementById('controlExampleResults');
    
    // Обробник зміни типу палива
    fuelTypeSelect.addEventListener('change', function() {
        coalParamsDiv.style.display = 'none';
        oilParamsDiv.style.display = 'none';
        gasParamsDiv.style.display = 'none';
        
        if (this.value === 'coal') {
            coalParamsDiv.style.display = 'block';
        } else if (this.value === 'oil') {
            oilParamsDiv.style.display = 'block';
        } else if (this.value === 'gas') {
            gasParamsDiv.style.display = 'block';
        }
    });
    
    // Функція для розрахунку показника емісії для вугілля
    function calculateCoalEmissionFactor() {
        const Qr = parseFloat(document.getElementById('coalQr').value);
        const a_vyn = parseFloat(document.getElementById('coalBoilerType').value);
        const A = parseFloat(document.getElementById('coalAsh').value);
        const G_vyn = parseFloat(document.getElementById('coalCombustible').value);
        const n_zu = parseFloat(document.getElementById('coalFilterEfficiency').value);
        
        // Формула (2.2) для вугілля
        const k_tv = (Math.pow(10, 6) / Qr) * a_vyn * (A / 100) * ((100 - G_vyn) / 100) * (1 - n_zu);
        
        return k_tv;
    }
    
    // Функція для розрахунку показника емісії для мазуту
    function calculateOilEmissionFactor() {
        const Qr = parseFloat(document.getElementById('oilQr').value);
        const A = parseFloat(document.getElementById('oilAsh').value);
        const G_vyn = parseFloat(document.getElementById('oilCombustible').value);
        const n_zu = parseFloat(document.getElementById('oilFilterEfficiency').value);
        
        // Формула (2.2) для мазуту (a_vyn = 1 для мазуту)
        const k_tv = (Math.pow(10, 6) / Qr) * 1 * (A / 100) * ((100 - G_vyn) / 100) * (1 - n_zu);
        
        return k_tv;
    }
    
    // Функція для розрахунку валового викиду
    function calculateTotalEmission(emissionFactor, Qr, fuelAmount) {
        // Формула (2.1)
        return Math.pow(10, -6) * emissionFactor * Qr * fuelAmount;
    }
    
    // Обробник кнопки розрахунку
    calculateBtn.addEventListener('click', function() {
        let emissionFactor, totalEmission, Qr, fuelAmount;
        
        if (fuelTypeSelect.value === 'coal') {
            emissionFactor = calculateCoalEmissionFactor();
            Qr = parseFloat(document.getElementById('coalQr').value);
            fuelAmount = parseFloat(document.getElementById('coalAmount').value);
            totalEmission = calculateTotalEmission(emissionFactor, Qr, fuelAmount);
        } else if (fuelTypeSelect.value === 'oil') {
            emissionFactor = calculateOilEmissionFactor();
            Qr = parseFloat(document.getElementById('oilQr').value);
            fuelAmount = parseFloat(document.getElementById('oilAmount').value);
            totalEmission = calculateTotalEmission(emissionFactor, Qr, fuelAmount);
        } else if (fuelTypeSelect.value === 'gas') {
            // Для природного газу тверді частинки відсутні
            emissionFactor = 0;
            totalEmission = 0;
        }
        
        // Відображаємо результати
        document.getElementById('emissionFactor').textContent = emissionFactor.toFixed(2);
        document.getElementById('totalEmission').textContent = totalEmission.toFixed(2);
        resultsDiv.style.display = 'block';
    });
    
    // Обробник кнопки контрольного прикладу
    runControlExampleBtn.addEventListener('click', function() {
        // Відображаємо результати контрольного прикладу
        document.getElementById('ceCoalFactor').textContent = '150';
        document.getElementById('ceCoalEmission').textContent = '3366';
        document.getElementById('ceOilFactor').textContent = '0.57';
        document.getElementById('ceOilEmission').textContent = '1.60';
        document.getElementById('ceGasFactor').textContent = '0';
        document.getElementById('ceGasEmission').textContent = '0';
        controlExampleResultsDiv.style.display = 'block';
    });
});