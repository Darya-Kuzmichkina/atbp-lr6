const express = require('express');
const app = express();
app.use(express.static('public'));

app.use(express.json());


const employeeHours = {
  1: 150,
  2: 170,   
  3: 800    
};


app.get('/api/tracker/:employeeId', (req, res) => {
  const id = req.params.employeeId;
  const hours = employeeHours[id];

  if (!hours) {
    return res.status(404).json({
      status: 'error',
      message: 'Сотрудник не найден'
    });
  }

  res.status(200).json({
    status: 'success',
    employeeId: id,
    hours: hours
  });
});


app.post('/api/salary/calculate', (req, res) => {
  try {
    const { hours, hourRate } = req.body;

    if (hourRate <= 0) {
      throw new Error('Некорректная ставка');
    }

    if (hours > 744) {
      throw new Error('Превышен допустимый лимит часов');
    }

    let totalSalary = 0;

    
    if (hours > 160) {
      const overtime = hours - 160;
      totalSalary = (160 * hourRate) + (overtime * hourRate * 1.5);
    } else {
      totalSalary = hours * hourRate;
    }

    res.status(200).json({
      status: 'success',
      hours,
      hourRate,
      totalSalary
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});


if (require.main === module) {
  app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
  });
}
module.exports = app;