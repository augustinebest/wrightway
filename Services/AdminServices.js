const AdminRepository = require('../Repositories/AdminRepository');
const FactoryRepository = require('../Repositories/FactoryWorkerRepository');
const CompanyRepository = require('../Repositories/CompanyRepository');
const functions = require('../Factories/functions');
const AttendanceRepository = require('../Repositories/AttendanceRepository');
const ExpensesRepository = require('../Repositories/ExpensesRepository');
const SalesRepository = require('../Repositories/SalesRepository');

exports.login = (req, res, admin) => {
    AdminRepository.getByIdNo(admin.idNo, (err, work) => {
        if(err) return res.json({message: 'Error ocurred in finding this account', code: 11});
        if(!work) {
            return res.json({message: 'This account does not exist', code: 12});
        }
        const dbpassword = work.password;
        if(work) {
            if(!(admin.password == dbpassword)) {
                return res.json({message: 'Invalid input details', code: 13})
            } else {
                CompanyRepository.get({}, (err, company) => {
                    if(err) return res.json({message: 'Error ocurred in getting the companies', code: 14});
                    if(company) {
                        const token = functions.getToken(work.idNo, work.email);
                        for(let i=0; i<company.length; i++) {
                            if(company[i].name == 'Wrightway-Water' ) {
                                const comp = (company[i]._id);
                                // res.cookie('token', { httpOnly: true })
                                // console.log(res)
                                return res.json({ message: 'You have logged in succesfully', code: 200, comp: comp, token: token });
                            }
                        }
                    } else {
                        return res.json({message: 'Company does not exist'})
                    }
                })
            }
        }
    })
}


exports.addWorker = (req, res, worker) => {
    var idNo;
    const date = new Date;
    const year = date.getUTCFullYear();
    const uuid = functions.uuid();
    FactoryRepository.get({}, (err, result) => {
        if(err) return res.json({message: 'Error ocurred in finding the Workers', code: 18});
        if(result) {
            if(result.length == 0) {
                const start = 1;
                idNo = 'WWF-'+year+uuid+start;
            }else {
                idNo = 'WWF-'+year+uuid+(result.length+1);
            }
            worker.idNo = idNo;
            console.log(worker.idNo)
            FactoryRepository.add(worker, (err, work) => {
                if(err) return res.json({message: 'Error ocurred in workding this Worker', code: 19});
                if(work) {
                    CompanyRepository.getById(worker.companyId, (err, comp) => {
                        if(err) return res.json({message: 'Error ocurred in finding this company', code: 20});
                        if(!comp) return res.json({message: 'This company does not exist', code: 21})
                            const check = comp.workers.push(work._id)
                            if(check) {
                                comp.save();
                                return res.json({message: 'This Worker have been added successfully', code: 200});
                            }
                    })
                }
            })
        } 
    })
}

exports.getAdminForAttendance = (req, res, currentDate) => {
    AdminRepository.get({}, (err, admin) => {
        if(err) return res.json({message: 'Error ocurred in getting the admins'});
        if(!admin) {
            return res.json({message: 'Threr is no admin currently', code: 12})
        }
        const formattedMonth = functions.formatMonthDate(currentDate);
        const formatDate = {
            day: currentDate.getUTCDate(),
            month: currentDate.getUTCMonth()+1,
            year: currentDate.getUTCFullYear(),
        }
        const date = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
        var admins = [];
        admin.forEach(element => {
            if(element.currentDate != date) {
                admins.push(element);
            }
        })
        if(admins.length > 0) {
            return res.json({count: admins.length, message: admins, code: 200})
        }
    })
}
exports.getFactoryWorkers = (req, res, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        FactoryRepository.findById(company.workers, (err, workers) => {
            if(err) return res.json({message: 'Error ocurred in getting this workers', code: 11});
            if(!workers) {
                return res.json({message: 'There is no worker currently', code: 12});
            }
            var factoryWorkers = [];
            workers.forEach(element => {
                if(element.role == 'Factory') {
                    factoryWorkers.push(element);
                }
            })
            if(factoryWorkers.length > 0) {
                return res.json({count: factoryWorkers.length, message: factoryWorkers, code: 200})
            }
        })
    })
}

exports.getFactoryWorkersForAttendance = (req, res, currentDate, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        FactoryRepository.findById(company.workers, (err, workers) => {
            if(err) return res.json({message: 'Error ocurred in finding the workers at the moment', code: 12});
            if(!workers) {
                return res.json({message: 'There is no worker currently', code: 13})
            }
            const formattedMonth = functions.formatMonthDate(currentDate);
            const formatDate = {
                day: currentDate.getUTCDate(),
                month: currentDate.getUTCMonth()+1,
                year: currentDate.getUTCFullYear(),
            }
            const date = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
            var currentAttendanceList = [];
            workers.forEach(element => {
                if(element.role == 'Factory' && element.currentDate != date) {
                    currentAttendanceList.push(element)
                }
            })
            if(currentAttendanceList.length > 0) {
                return res.json({message: currentAttendanceList, code: 200})
            } 
        })
    })
}

exports.getDriversForAttendance = (req, res, currentDate, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        FactoryRepository.findById(company.workers, (err, drivers) => {
            if(err) return res.json({message: 'Error ocurred in finding the drivers at the moment', code: 12});
            if(!drivers) {
                return res.json({message: 'There is no driver currently', code: 13})
            }
            const formattedMonth = functions.formatMonthDate(currentDate);
            const formatDate = {
                day: currentDate.getUTCDate(),
                month: currentDate.getUTCMonth()+1,
                year: currentDate.getUTCFullYear(),
            }
            const date = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
            var currentAttendanceList = [];
            drivers.forEach(element => {
                if(element.role == 'Driver' && element.currentDate != date) {
                    currentAttendanceList.push(element)
                }
            })
            if(currentAttendanceList.length > 0) {
                return res.json({message: currentAttendanceList, code: 200})
            } 
        })
    })
}

exports.getOperatorsForAttendance = (req, res, currentDate, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        FactoryRepository.findById(company.workers, (err, operators) => {
            if(err) return res.json({message: 'Error ocurred in finding the operators at the moment', code: 12});
            if(!operators) {
                return res.json({message: 'There is no operator currently', code: 13})
            }
            const formattedMonth = functions.formatMonthDate(currentDate);
            const formatDate = {
                day: currentDate.getUTCDate(),
                month: currentDate.getUTCMonth()+1,
                year: currentDate.getUTCFullYear(),
            }
            const date = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
            var currentAttendanceList = [];
            operators.forEach(element => {
                if(element.role == 'Operator' && element.currentDate != date) {
                    currentAttendanceList.push(element)
                }
            })
            if(currentAttendanceList.length > 0) {
                return res.json({message: currentAttendanceList, code: 200})
            } 
        })
    })
}

exports.getDrivers = (req, res, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        if(!company) {
            return res.json({message: 'This company does not exist', code: 30})
        }
        FactoryRepository.findById(company.workers, (err, drivers) => {
            if(err) return res.json({message: 'Error ocurred in getting this drivers', code: 11});
            if(!drivers) {
                return res.json({message: 'There is no driver currently', code: 12});
            }
            var drive = [];
            drivers.forEach(element => {
                if(element.role == 'Driver') {
                    drive.push(element);
                }
            })
            if(drive.length > 0) {
                return res.json({count: drive.length, message: drive, code: 200})
            }
        })
    })
}

exports.getOperators = (req, res, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        FactoryRepository.findById(company.workers, (err, op) => {
            if(err) return res.json({message: 'Error ocurred in getting this operators', code: 11});
            if(!op) {
                return res.json({message: 'There is no operator currently', code: 12});
            }
            var operators = [];
            op.forEach(element => {
                if(element.role == 'Operator') {
                    operators.push(element);
                }
            })
            if(operators.length > 0) {
                res.json({count: operators.length, message: operators, code: 200})
            }
        })
    })
}

exports.getAworker = (req, res, worker) => {
    // console.log(worker)
    FactoryRepository.getByIdNo(worker, (err, work) => {
        if(err) return res.json({message: 'Error ocurred in finding this workers', code: 11});
        if(!work) {
            return res.json({message: 'This worker does not exist', code: 12})
        }
        return res.json({message: work, code: 200})
    })
}

exports.ascribeSalary = (req, res, data) => {
    FactoryRepository.getByIdNo(data.workerId, (err, worker) => {
        if(err) return res.json({message: 'Error ocurred in finding all workers', code: 11});
        if(!worker) {
            return res.json({message: 'This worker does not exist', code: 12})
        }
        worker.salary = data.newSalary;
        worker.save()
        return res.json({message: 'This worker salary have been updated successfully', code: 200});
    })
}

exports.markAttendance = (req, res, worker) => {
    FactoryRepository.getByIdNo(worker.idNo, (err, work) => {
        if(err) return res.json({message: 'Error ocurred in getting this worker', code: 11});
        if(!work) {
            return res.json({message: 'This worker does not exist'});
        }
        if(work.salary == 0) {
            return res.json({message: 'You have to ascribe a salary to his worker', code: 12});
        } else {
            const formattedDays = functions.formatDaysDate(worker.date);
            const formattedMonth = functions.formatMonthDate(worker.date);
            const formatDate = {
                day: worker.date.getUTCDate(),
                month: worker.date.getUTCMonth()+1,
                year: worker.date.getUTCFullYear(),
                hour: worker.date.getUTCHours(),
                minutes: worker.date.getUTCMinutes()
            }
            const timeArrived = formatDate.hour+'.'+formatDate.minutes;
            worker.timeIn = timeArrived.replace('.', ':') + 'am';
            worker.date = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
            worker.day = formattedDays;
            CompanyRepository.getById(worker.companyId, (err, company) => {
                if(err) return res.json({message: 'Error ocurred in finding this company', code: 13});
                if(!company) {
                    return res.json({message: 'This company does not exist', code: 14})
                }
                const dashboard = {
                    maxTimeStart: company.maxTimeStart.replace(':', '.'),
                        late1Start: company.late1Start.replace(':', '.'),
                        late1End: company.late1End.replace(':', '.'),
                        late1Debit: company.late1Debit,
                        late2Start: company.late2Start.replace(':', '.'),
                        late2End: company.late2End.replace(':', '.'),
                        late2Debit: company.late2Debit,
                        absentDebit: company.absentDebit
                }
                if(worker.status == 1 && parseFloat(timeArrived) < parseFloat(dashboard.maxTimeStart)) {
                    console.log('You came before the maximum time')
                    const newSalary = work.salary - 0;
                    work.salary = newSalary;
                    worker.amountDeducted = 0
                    AttendanceRepository.add(worker, (err, result) => {
                        if(err) return res.json({message: 'Error ocurred in creating this attendance', code: 15}) 
                        if(result) {
                            work.currentDate = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
                            work.attendanceTable.push(result._id);
                            work.save();
                            return res.json({message: `${work.fullName} has been marked successfully`, code: 200})
                        }
                    })
                }
                else if(worker.status == 0 || parseFloat(timeArrived) > parseFloat(dashboard.late2End)) {
                    console.log('You are absent')
                    let newSalary = work.salary - dashboard.absentDebit;
                    work.salary = newSalary;
                    worker.amountDeducted = dashboard.absentDebit;
                    AttendanceRepository.add(worker, (err, result) => {
                        if(err) return res.json({message: 'Error ocurred in creating this attendance', code: 16}) 
                        if(result) {
                            work.currentDate = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
                            work.attendanceTable.push(result._id);
                            work.save();
                            return res.json({message: `${work.fullName} has been marked absent`, code: 200})
                        }
                    })
                }
                else if(parseFloat(timeArrived) >= parseFloat(dashboard.late1Start) && parseFloat(timeArrived) <= parseFloat(dashboard.late1End)) {
                    console.log('You came between 8:05-8:15')
                    const newSalary = work.salary - dashboard.late1Debit;
                    work.salary = newSalary;
                    worker.amountDeducted = dashboard.late1Debit;
                    AttendanceRepository.add(worker, (err, result) => {
                        if(err) return res.json({message: 'Error ocurred in creating this attendance', code: 17}) 
                        if(result) {
                            work.currentDate = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
                            work.attendanceTable.push(result._id);
                            work.save();
                            return res.json({message: `${work.fullName} has been marked present and deducted ${dashboard.late1Debit}`, code: 200})
                        }
                    })
                }
                else if(parseFloat(timeArrived) >= parseFloat(dashboard.late2Start) && parseFloat(timeArrived) <= parseFloat(dashboard.late2End)) {
                    console.log('You came between 8:15-8:30')
                    let newSalary = work.salary - dashboard.late2Debit;
                    work.salary = newSalary;
                    worker.amountDeducted = dashboard.late2Debit;
                    AttendanceRepository.add(worker, (err, result) => {
                        if(err) return res.json({message: 'Error ocurred in creating this attendance', code: 18}) 
                        if(result) {
                            work.currentDate = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
                            work.attendanceTable.push(result._id);
                            work.save()
                            return res.json({message: `${work.fullName} has been marked present and deducted ${dashboard.late2Debit}`, code: 200})
                        }
                    })
                } 
            })
        }
    })
}

exports.findAWorkerAttendanceInAMonth = (req, res, date, id) => {
    FactoryRepository.getByIdNo(id, (err, worker) => {
        if(err) return res.json({message: 'Error ocurred in finding this worker', code: 10});
        if(!worker) {
            return res.json({message: 'This worker does not exist', code: 11});
        }
        AttendanceRepository.findById(worker.attendanceTable, (err, attendance) => {
            if(err) return res.json({message: 'Error ocurred in getting the attendance', code: 12});
            if(attendance.length < 1) {
                return res.json({message: 'There is no attendance for this worker currently', code: 13});
            }
            var p = attendance.filter(element => {
                return element.date.includes(date);
            })
            if(p.length < 1) {
                return res.json({message: 'There is no attendance for this period'})
            } else {
                return res.json({message: p, code: 200})
            }
        })
    })
}

exports.makeExpenses = (req, res, data, compId) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 12});
        if(!company) {
            return res.json({message: 'This company does not exist', code: 13});
        }
        AdminRepository.getByIdNo(data.person, (err, admin) => {
            if(err) return res.json({message: 'Error ocurred in getting this Admin', code: 12});
            if(!admin) {
                return res.json({message: 'This Admin does not exist', code: 13});
            }
            data.person = admin.fullName;
            const formattedMonth = functions.formatMonthDate(data.date);
            const formatDate = {
                day: data.date.getUTCDate(),
                year: data.date.getUTCFullYear(),
                hour: data.date.getUTCHours(),
                minutes: data.date.getUTCMinutes()
            }
            const ampm = formatDate.hour >= 12 ? 'pm' : 'am';
            formatDate.hour = formatDate.hour % 12;
            formatDate.hour = formatDate.hour ? formatDate.hour : 12;
            formatDate.minutes = formatDate.minutes < 10 ? '0'+formatDate.minutes : formatDate.minutes
            let time = formatDate.hour+':'+formatDate.minutes+ampm
            const storeDate = formatDate.day+'/'+formattedMonth+'/'+formatDate.year;
            data.date = storeDate;
            data.time = time;
            ExpensesRepository.add(data, (err, expense) => {
                if(err) return res.json({message: 'Error ocurred in adding this expense', code: 15})
                if(expense) {
                    const check = company.expenses.push(expense._id)
                    if(check) {
                        company.save();
                        res.json({message: 'This expense have been created successfully', code: 200});
                    }
                }
            })
        })
    })
} 

exports.getPreferredDateExpenses = (req, res, compId, date) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        if(!company) return res.json({message: 'This company does not exists', code: 11});
        ExpensesRepository.findById(company.expenses, (err, expenses) => {
            if(err) return res.json({message: 'Error ocurred in getting the expenses', code: 12});
            const p = expenses.filter(element => {
                return element.date == date
            })
            if(p.length > 0) {
                var y = [...p].reverse();
                var amt = y.map(m => {
                    return m.amount;
                })
                getSum = (total, sum) => {
                    return total + sum;
                }
                var amount = amt.reduce(getSum);
                return res.json({message: y, amount: amount, code: 200})
            } else {
                return res.json({message: 'There is no expenses on this day', code: 16})
            }
        })
    })
} 

exports.addSales = (req, res, compId, data) => {
    CompanyRepository.getById(compId, (err, company) => {
        if(err) return res.json({message: 'Error ocurred in getting this company', code: 10});
        if(!company) return res.json({message: 'This company does not exists', code: 11});
        res.json(company);
    })
    // console.log('Services', data);
    // SalesRepository.add(data, (err, sale) => {
    //     if(err) return res.json({message: 'error ocurred while creating this sale'})
    //     console.log(sale)
    // })
}