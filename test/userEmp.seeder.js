const axios = require('axios');
const progress = require('cli-progress');
const _colors = require('colors');

const Student = require('../models/studentModel');
const Emp = require('../models/empModel');
const { JsonWebTokenError } = require('jsonwebtoken');
const { json } = require('body-parser');

async function StudentSeeder(){
    const feilds = {
        'CS': getRandomInt(10, 120), 
        'IT': getRandomInt(10, 120), 
        'ME': getRandomInt(10, 120), 
        'CVE': getRandomInt(10, 120), 
        'EE': getRandomInt(10, 120), 
        'EC': getRandomInt(10, 120), 
        'CE': getRandomInt(10, 120), 
        'BE': getRandomInt(10, 120), 
        'ASE': getRandomInt(10, 120)
    };
    const college = 'TCE';
    const total = totalStudents(feilds);
    let studentDone = 0;
    for(const i in feilds){
        const numbersOfStudents = getRandomInt(10, 120);
        for(let j=1; j<=numbersOfStudents; j++){
            const studentID =  college+`${new Date().getFullYear()}`.substr(2,2)+feilds[i]+1;
            const fakeData = await axios.get('https://api.namefake.com/');
            const student = await Student.create({
                studentId: studentID,
                name: fakeData.name,
                address: fakeData.address,
                dob: fakeData.birth_date,
                phone: [fakeData.phone_h, fakeData.phone_w],
                email: fakeData.email_d,
                organization: 'TCE'
            });
            studentDone++;
            process.stdout.write(`\r${studentDone/total}%`);
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function totalStudents(feildObj){
    let total = 0;
    for(let [value] in Object.entries(feildObj)){
        total += value;
    }
    return total;
}


StudentSeeder();