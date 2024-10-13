// Your code here
function createEmployeeRecord(testEmployee) {
    return {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(testEmployee) {
    return testEmployee.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const timeInEvent ={
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    }

    employeeRecord.timeInEvents.push(timeInEvent)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const[date, hour] = dateStamp.split(' ');

    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100

    return hoursWorked;

}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(hoursWorkedOnDate(cRecord, "0044-03-15"))

function wagesEarnedOnDate(employeeRecord, date) {

    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);

    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(wagesEarnedOnDate(cRecord, "0044-03-15"))

function allWagesFor(employeeRecord){
    const workedDates = employeeRecord.timeInEvents.map(event => event.date);

    const totalWages = workedDates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord,date)
    }, 0);
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
    return totalPayroll
}