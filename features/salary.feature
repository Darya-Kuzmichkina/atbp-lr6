Feature: Расчет заработной платы

  Scenario Outline: Расчет зарплаты сотрудника
    Given сервис доступен по адресу "/api/tracker/2" 
    Given сотрудник имеет <hours> часов
    Given ставка равна <rate>
    When я отправляю POST запрос на "/api/salary/calculate"
    Then API возвращает статус-код <status>
    And ответ содержит "<message>"

    Examples:
      | hours | rate | status | message |
      | 150   | 1000 | 200    | success |
      | 170   | 1000 | 200    | success |
      | 800   | 1000 | 400    | Превышен |