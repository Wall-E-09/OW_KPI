function openTab(tabName, event) {
    event.preventDefault();
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function calculateTask1(event) {
    if (event) event.preventDefault();
    
    // Отримуємо вхідні дані
    const Hp = parseFloat(document.getElementById('Hp').value) || 0;
    const Cp = parseFloat(document.getElementById('Cp').value) || 0;
    const Sp = parseFloat(document.getElementById('Sp').value) || 0;
    const Np = parseFloat(document.getElementById('Np').value) || 0;
    const Op = parseFloat(document.getElementById('Op').value) || 0;
    const Wp = parseFloat(document.getElementById('Wp').value) || 0;
    const Ap = parseFloat(document.getElementById('Ap').value) || 0;
    
    // Перевірка на коректність вхідних даних
    const sum = Hp + Cp + Sp + Np + Op + Wp + Ap;
    if (Math.abs(sum - 100) > 0.1) {
        alert(`Сума компонентів повинна бути 100%. У вас: ${sum.toFixed(2)}%`);
        return;
    }
    
    performCalculations(Hp, Cp, Sp, Np, Op, Wp, Ap);
}

function performCalculations(Hp, Cp, Sp, Np, Op, Wp, Ap) {
    // 1. Розрахунок коефіцієнтів переходу
    const Kps = 100 / (100 - Wp);
    const Kpg = 100 / (100 - Wp - Ap);
    
    // 2. Розрахунок складу сухої маси
    const Hd = (Hp * Kps).toFixed(2);
    const Cd = (Cp * Kps).toFixed(2);
    const Sd = (Sp * Kps).toFixed(2);
    const Nd = (Np * Kps).toFixed(3);
    const Od = (Op * Kps).toFixed(2);
    const Ad = (Ap * Kps).toFixed(2);
    
    // 3. Розрахунок складу горючої маси
    const Hg = (Hp * Kpg).toFixed(2);
    const Cg = (Cp * Kpg).toFixed(2);
    const Sg = (Sp * Kpg).toFixed(2);
    const Ng = (Np * Kpg).toFixed(3);
    const Og = (Op * Kpg).toFixed(2);
    
    // 4. Розрахунок теплоти згоряння
    const Qpn = (339 * Cp + 1030 * Hp - 108.8 * (Op - Sp) - 25 * Wp).toFixed(1);
    const QpnMj = (Qpn / 1000).toFixed(4);
    const Qdn = (QpnMj * (100 / (100 - Wp))).toFixed(4);
    const Qdafn = (QpnMj * (100 / (100 - Wp - Ap))).toFixed(4);
    
    // Вивід результатів
    const resultsHTML = `
        <div class="result-section">
            <h4>Коефіцієнти переходу:</h4>
            <p>Від робочої до сухої маси (K<sup>Р→С</sup>): ${Kps.toFixed(2)}</p>
            <p>Від робочої до горючої маси (K<sup>Р→Г</sup>): ${Kpg.toFixed(2)}</p>
        </div>
        
        <div class="result-section">
            <h4>Склад сухої маси:</h4>
            <p>H<sup>С</sup>: ${Hd}%</p>
            <p>C<sup>С</sup>: ${Cd}%</p>
            <p>S<sup>С</sup>: ${Sd}%</p>
            <p>N<sup>С</sup>: ${Nd}%</p>
            <p>O<sup>С</sup>: ${Od}%</p>
            <p>A<sup>С</sup>: ${Ad}%</p>
            <p><strong>Сума: ${(parseFloat(Hd) + parseFloat(Cd) + parseFloat(Sd) + parseFloat(Nd) + parseFloat(Od) + parseFloat(Ad)).toFixed(2)}%</strong></p>
        </div>
        
        <div class="result-section">
            <h4>Склад горючої маси:</h4>
            <p>H<sup>Г</sup>: ${Hg}%</p>
            <p>C<sup>Г</sup>: ${Cg}%</p>
            <p>S<sup>Г</sup>: ${Sg}%</p>
            <p>N<sup>Г</sup>: ${Ng}%</p>
            <p>O<sup>Г</sup>: ${Og}%</p>
            <p><strong>Сума: ${(parseFloat(Hg) + parseFloat(Cg) + parseFloat(Sg) + parseFloat(Ng) + parseFloat(Og)).toFixed(2)}%</strong></p>
        </div>
        
        <div class="result-section">
            <h4>Теплота згоряння:</h4>
            <p>Робоча маса (Q<sub>i</sub><sup>P</sup>): ${QpnMj} МДж/кг</p>
            <p>Суха маса (Q<sub>i</sub><sup>d</sup>): ${Qdn} МДж/кг</p>
            <p>Горюча маса (Q<sub>i</sub><sup>daf</sup>): ${Qdafn} МДж/кг</p>
        </div>
    `;
    
    document.getElementById('resultsContent1').innerHTML = resultsHTML;
    document.getElementById('results1').style.display = 'block';
    document.getElementById('results1').scrollIntoView({ behavior: 'smooth' });
}

function checkControlExample(event) {
    if (event) event.preventDefault();
    
    // Заповнюємо дані контрольного прикладу
    document.getElementById('Hp').value = 1.9;
    document.getElementById('Cp').value = 21.1;
    document.getElementById('Sp').value = 2.6;
    document.getElementById('Np').value = 0.2;
    document.getElementById('Op').value = 7.1;
    document.getElementById('Wp').value = 53;
    document.getElementById('Ap').value = 14.1;
    
    // Виконуємо розрахунок
    calculateTask1();
}

function calculateVariant9(event) {
    if (event) event.preventDefault();
    
    // Дані для 9 варіанту
    document.getElementById('Hp').value = 2.6;
    document.getElementById('Cp').value = 38.6;
    document.getElementById('Sp').value = 3.80;
    document.getElementById('Np').value = 0.80;
    document.getElementById('Op').value = 3.10;
    document.getElementById('Wp').value = 11.0;
    document.getElementById('Ap').value = 40.1;
    
    // Виконуємо розрахунок
    calculateTask1();
}

function calculateTask2(event) {
    if (event) event.preventDefault();
    
    // Отримуємо вхідні дані
    const Hg = parseFloat(document.getElementById('Hg').value) || 0;
    const Cg = parseFloat(document.getElementById('Cg').value) || 0;
    const Sg = parseFloat(document.getElementById('Sg').value) || 0;
    const Og = parseFloat(document.getElementById('Og').value) || 0;
    const Qdaf = parseFloat(document.getElementById('Qdaf').value) || 0;
    const Wr = parseFloat(document.getElementById('Wr').value) || 0;
    const Ad = parseFloat(document.getElementById('Ad').value) || 0;
    const Vg = parseFloat(document.getElementById('Vg').value) || 0;
    
    // Перевірка на коректність вхідних даних
    const sum = Hg + Cg + Sg + Og;
    if (Math.abs(sum - 100) > 0.1) {
        alert(`Сума компонентів горючої маси повинна бути 100%. У вас: ${sum.toFixed(2)}%`);
        return;
    }
    
    // 1. Перерахунок складу на робочу масу
    const multiplier = (100 - Wr - Ad) / 100;
    const Hr = (Hg * multiplier).toFixed(2);
    const Cr = (Cg * multiplier).toFixed(2);
    const Sr = (Sg * multiplier).toFixed(2);
    const Or = (Og * multiplier).toFixed(2);
    const Ar = (Ad * (100 - Wr) / 100).toFixed(2);
    const Vr = (Vg * (100 - Wr) / 100).toFixed(2);
    
    // 2. Перерахунок теплоти згоряння
    const Qr = (Qdaf * (100 - Wr - Ad) / 100).toFixed(4);
    
    // Вивід результатів
    const resultsHTML = `
        <div class="result-section">
            <h4>Склад робочої маси:</h4>
            <p>H<sup>P</sup>: ${Hr}%</p>
            <p>C<sup>P</sup>: ${Cr}%</p>
            <p>S<sup>P</sup>: ${Sr}%</p>
            <p>O<sup>P</sup>: ${Or}%</p>
            <p>A<sup>P</sup>: ${Ar}%</p>
            <p>V<sup>P</sup>: ${Vr} мг/кг</p>
        </div>
        
        <div class="result-section">
            <h4>Теплота згоряння:</h4>
            <p>Q<sub>i</sub><sup>P</sup>: ${Qr} МДж/кг</p>
        </div>
    `;
    
    document.getElementById('resultsContent2').innerHTML = resultsHTML;
    document.getElementById('results2').style.display = 'block';
    document.getElementById('results2').scrollIntoView({ behavior: 'smooth' });
}

// Ініціалізація при завантаженні сторінки
window.onload = function() {
    // Заповнюємо 9 варіант за замовчуванням
    calculateVariant9();
    
    // Додаємо обробники подій для кнопок
    document.getElementById('fuelForm1').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateTask1();
    });
    
    document.getElementById('fuelForm2').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateTask2();
    });
    
    // Контрольний приклад для завдання 2
    document.getElementById('Hg').value = 11.2;
    document.getElementById('Cg').value = 85.5;
    document.getElementById('Sg').value = 2.5;
    document.getElementById('Og').value = 0.8;
    document.getElementById('Qdaf').value = 40.4;
    document.getElementById('Wr').value = 2;
    document.getElementById('Ad').value = 0.15;
    document.getElementById('Vg').value = 333.3;
};