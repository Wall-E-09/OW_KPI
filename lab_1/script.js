let currentResults = {};

document.getElementById('fuelForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateAll();
});

function calculateAll() {
    const Hp = parseFloat(document.getElementById('Hp').value) || 0;
    const Cp = parseFloat(document.getElementById('Cp').value) || 0;
    const Sp = parseFloat(document.getElementById('Sp').value) || 0;
    const Np = parseFloat(document.getElementById('Np').value) || 0;
    const Op = parseFloat(document.getElementById('Op').value) || 0;
    const Wp = parseFloat(document.getElementById('Wp').value) || 0;
    const Ap = parseFloat(document.getElementById('Ap').value) || 0;

    const sum = Hp + Cp + Sp + Np + Op + Wp + Ap;
    if (Math.abs(sum - 100) > 0.1) {
        alert(`Сума компонентів повинна бути 100%. У вас: ${sum.toFixed(2)}%`);
        return;
    }

    currentResults = calculateTask1(Hp, Cp, Sp, Np, Op, Wp, Ap);
    displayTask1Results(currentResults);

    const task2Results = calculateTask2(currentResults);
    displayTask2Results(task2Results);
}

function calculateTask1(Hp, Cp, Sp, Np, Op, Wp, Ap) {
    const Kps = 100 / (100 - Wp);
    const Kpg = 100 / (100 - Wp - Ap);

    const Hd = (Hp * Kps).toFixed(2);
    const Cd = (Cp * Kps).toFixed(2);
    const Sd = (Sp * Kps).toFixed(2);
    const Nd = (Np * Kps).toFixed(3);
    const Od = (Op * Kps).toFixed(2);
    const Ad = (Ap * Kps).toFixed(2);

    const totalCombustible = Hp + Cp + Sp + Np + Op;
    const Hg = ((Hp / totalCombustible) * 100).toFixed(2);
    const Cg = ((Cp / totalCombustible) * 100).toFixed(2);
    const Sg = ((Sp / totalCombustible) * 100).toFixed(2);
    const Ng = ((Np / totalCombustible) * 100).toFixed(3);
    const Og = ((Op / totalCombustible) * 100).toFixed(2);

    const Qpn = (339 * Cp + 1030 * Hp - 108.8 * (Op - Sp) - 25 * Wp).toFixed(1);
    const QpnMj = (Qpn / 1000).toFixed(4);
    const Qdn = (QpnMj * (100 / (100 - Wp))).toFixed(4);
    const Qdafn = (QpnMj * (100 / (100 - Wp - Ap))).toFixed(4);

    return {
        Kps: Kps.toFixed(2),
        Kpg: Kpg.toFixed(2),
        dryComposition: { Hd, Cd, Sd, Nd, Od, Ad },
        combustibleComposition: { Hg, Cg, Sg, Ng, Og },
        heatValues: { QpnMj, Qdn, Qdafn },
        Wp,
        Ap,
        originalComposition: { Hp, Cp, Sp, Np, Op }
    };
}

function calculateTask2(results) {
    const Qdaf = 40.40;
    const Vg = 333.3;

    const { combustibleComposition, Wp, Ap } = results;
    const { Hg, Cg, Sg, Og } = combustibleComposition;

    const multiplier = (100 - Wp - Ap) / 100;
    const Hr = (parseFloat(Hg) * multiplier).toFixed(2);
    const Cr = (parseFloat(Cg) * multiplier).toFixed(2);
    const Sr = (parseFloat(Sg) * multiplier).toFixed(2);
    const Or = (parseFloat(Og) * multiplier).toFixed(2);
    const Ar = Ap.toFixed(2);
    const Vr = (Vg * (100 - Wp) / 100).toFixed(2);

    const Qr = (Qdaf * multiplier).toFixed(4);

    return {
        composition: { Hr, Cr, Sr, Or, Ar, Vr },
        heatValue: Qr
    };
}

function displayTask1Results(results) {
    const { Kps, Kpg, dryComposition, combustibleComposition, heatValues } = results;
    const { Hd, Cd, Sd, Nd, Od, Ad } = dryComposition;
    const { Hg, Cg, Sg, Ng, Og } = combustibleComposition;
    const { QpnMj, Qdn, Qdafn } = heatValues;

    const combustibleSum = (parseFloat(Hg) + parseFloat(Cg) + parseFloat(Sg) + parseFloat(Ng) + parseFloat(Og)).toFixed(2);

    const resultsHTML = `
        <div class="result-section">
            <h4>Коефіцієнти переходу:</h4>
            <p>Від робочої до сухої маси (K<sup>Р→С</sup>): ${Kps}</p>
            <p>Від робочої до горючої маси (K<sup>Р→Г</sup>): ${Kpg}</p>
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
            <p><strong>Сума: ${combustibleSum}%</strong></p>
        </div>
        
        <div class="result-section">
            <h4>Теплота згоряння:</h4>
            <p>Робоча маса (Q<sub>i</sub><sup>P</sup>): ${QpnMj} МДж/кг</p>
            <p>Суха маса (Q<sub>i</sub><sup>d</sup>): ${Qdn} МДж/кг</p>
            <p>Горюча маса (Q<sub>i</sub><sup>daf</sup>): ${Qdafn} МДж/кг</p>
        </div>
    `;
    
    document.getElementById('resultsContent1').innerHTML = resultsHTML;
    document.getElementById('task1Results').style.display = 'block';
}

function displayTask2Results(results) {
    const { composition, heatValue } = results;
    const { Hr, Cr, Sr, Or, Ar, Vr } = composition;
    
    const resultsHTML = `
        <div class="result-section">
            <h4>Склад робочої маси мазуту:</h4>
            <p>H<sup>P</sup>: ${Hr}%</p>
            <p>C<sup>P</sup>: ${Cr}%</p>
            <p>S<sup>P</sup>: ${Sr}%</p>
            <p>O<sup>P</sup>: ${Or}%</p>
            <p>A<sup>P</sup>: ${Ar}%</p>
            <p>V<sup>P</sup>: ${Vr} мг/кг</p>
        </div>
        
        <div class="result-section">
            <h4>Теплота згоряння:</h4>
            <p>Q<sub>i</sub><sup>P</sup>: ${heatValue} МДж/кг</p>
        </div>
    `;
    
    document.getElementById('resultsContent2').innerHTML = resultsHTML;
    document.getElementById('task2Results').style.display = 'block';
}

function fillControlExample() {
    document.getElementById('Hp').value = 1.9;
    document.getElementById('Cp').value = 21.1;
    document.getElementById('Sp').value = 2.6;
    document.getElementById('Np').value = 0.2;
    document.getElementById('Op').value = 7.1;
    document.getElementById('Wp').value = 53;
    document.getElementById('Ap').value = 14.1;
    calculateAll();
}

function fillVariant9() {
    document.getElementById('Hp').value = 2.6;
    document.getElementById('Cp').value = 38.6;
    document.getElementById('Sp').value = 3.8;
    document.getElementById('Np').value = 0.8;
    document.getElementById('Op').value = 3.1;
    document.getElementById('Wp').value = 11.0;
    document.getElementById('Ap').value = 40.1;
    calculateAll();
}

window.onload = function() {
    fillVariant9();
};
