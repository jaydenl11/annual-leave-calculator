let annualLeaveEntitlement = 0;

function setPreviousStep(prevStep) {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById(prevStep).style.display = 'block';
}

let usedCarryBeforeApr = false;

document.getElementById('usedCarryYesBtn').addEventListener('click', function() {
    usedCarryBeforeApr = true;
    document.getElementById('carriedUsedDiv').style.display = 'block';
    this.style.backgroundColor = '#45a049';
    document.getElementById('usedCarryNoBtn').style.backgroundColor = '#f44336';
});

document.getElementById('usedCarryNoBtn').addEventListener('click', function() {
    usedCarryBeforeApr = false;
    document.getElementById('carriedUsedDiv').style.display = 'none';
    document.getElementById('daysUsedBeforeApr').value = '';
    this.style.backgroundColor = '#d32f2f';
    document.getElementById('usedCarryYesBtn').style.backgroundColor = '#4CAF50';
});

function calculateDaysWorked() {
    const terminationDate = new Date(document.getElementById('terminationDate').value);
    const currentDate = new Date('2025-07-02'); // Current date as per 11:13 AM HKT, July 02, 2025
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    let daysWorked = Math.floor((terminationDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

    if (daysWorked < 0) {
        alert("Termination date must be within the current year.");
        return;
    }

    annualLeaveEntitlement = (20 * daysWorked) / 365;
    document.getElementById('entitlementOutput').innerText = 
        `${annualLeaveEntitlement.toFixed(2)} days (20 × ${daysWorked} ÷ 365 = ${annualLeaveEntitlement.toFixed(2)})`;

    setPreviousStep('step3');
}

function calculateOutstandingLeave() {
    const annualLeaveTaken = parseFloat(document.getElementById('annualLeaveTaken').value);
    const carryForward = parseFloat(document.getElementById('carryForward').value);
    let daysUsedBeforeApr = 0;
    if (usedCarryBeforeApr) {
        daysUsedBeforeApr = parseFloat(document.getElementById('daysUsedBeforeApr').value) || 0;
    }
    const outstandingLeave = annualLeaveEntitlement - annualLeaveTaken + (carryForward - daysUsedBeforeApr);

    document.getElementById('entitlementResult').textContent = annualLeaveEntitlement.toFixed(2);
    document.getElementById('takenResult').textContent = annualLeaveTaken;
    document.getElementById('carryForwardResult').textContent = carryForward;
    document.getElementById('usedBeforeResult').textContent = usedCarryBeforeApr ? daysUsedBeforeApr : 0;
    document.getElementById('outstandingResult').textContent = outstandingLeave.toFixed(2);

    setPreviousStep('result');
}

function resetToStep1() {
    document.getElementById('terminationDate').value = '';
    document.getElementById('annualLeaveTaken').value = '';
    document.getElementById('carryForward').value = '';
    document.getElementById('daysUsedBeforeApr').value = '';
    usedCarryBeforeApr = false;
    document.getElementById('carriedUsedDiv').style.display = 'none';
    document.getElementById('usedCarryYesBtn').style.backgroundColor = '#4CAF50';
    document.getElementById('usedCarryNoBtn').style.backgroundColor = '#f44336';
    annualLeaveEntitlement = 0;
    document.getElementById('entitlementOutput').innerText = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}