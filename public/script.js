document.getElementById('calcBtn').addEventListener('click', async () => {
    const id = document.getElementById('employeeId').value;
    const rate = document.getElementById('rate').value;

    try {
        // 1. Получаем часы
        const trackerRes = await fetch(`/api/tracker/${id}`);
        const trackerData = await trackerRes.json();

        if (!trackerRes.ok) {
            throw new Error(trackerData.message);
        }

        // 2. Считаем зарплату
        const salaryRes = await fetch('/api/salary/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hours: trackerData.hours,
                hourRate: Number(rate)
            })
        });

        const salaryData = await salaryRes.json();

        if (!salaryRes.ok) {
            throw new Error(salaryData.message);
        }

        document.getElementById('result').innerText =
            `ЗП: ${salaryData.totalSalary}, часы: ${salaryData.hours}`;

        document.getElementById('error').innerText = '';

    } catch (e) {
        document.getElementById('error').innerText = e.message;
        document.getElementById('result').innerText = '';
    }
});