// const allUsers = document.querySelector('#allUsers ');
let content = document.querySelector('#content table ');
const searchSizeWeight = document.querySelector('#searchSizeWeight');
const sizeBigWeight = document.querySelector('#sizeBigWeight');
const sizeSmallWeight = document.querySelector('#sizeSmallWeight');
const t = document.querySelector('#t table ');
const bigWeek = document.querySelector('#bigWeek');
const tblBigWeights = document.querySelector('#tblBigWeights table ');
let tableSearchWeight="";
const baseUrl = 'http://localhost:8000/users';



async function alUsers() {
    content.style.display = 'block';
    try {
        let users = await fetch(baseUrl);
        users = await users.json();
        let table = "";
        users.users.forEach(user => {
            let bmi = user.meetings[length].weight / Math.pow(user.hight, 2);
            table +=
                `
               <tr>
                <th>${user.firstName + ' ' + user.lastName}</th>
                <th class="${bmi > 25 ? 'red' : 'green'}">${bmi}</th>
                <th><a href="./src/showUser.html?id=${user.id}"><input type="button" value="link to"" /></a></th>
               </tr>
               `
        })
        content.innerHTML += table;
    }
    catch (e) { console.error(e) }
}


async function sBigLess() {
    t.style.display = "inLine";
    try {
        let users = await fetch(baseUrl);
        users = await users.json();
        users.users.forEach(user => {
            const a = user.meetings;
            const y = a.filter((k) => { return k.weight > sizeBigWeight.value && k.weight < sizeSmallWeight.value })
            y.forEach((k) => {
                tableSearchWeight += `<tr><th>${k.date}</th><th>${k.weight}</th></tr>`;
            });
            t.innerHTML=tableSearchWeight;
        })
    }
    catch (e) { console.log(e); }
}


let bigCurrentWeight = [];
async function weekBig() {
    tblBigWeights.style.display = 'block';
    try {
        let users = await fetch(baseUrl);
        users = await users.json();
        bigCurrentWeight = users.users.filter(user => {
            return user.meetings[user.meetings.length - 1].weight > user.meetings[user.meetings.length - 2].weight

        });
        tblBigWeights.innerHTML =
            `
         <tr>
         <th>userName</th>
         <th>lastWeight</th>
         <th>currentWeight</th>
         </tr>
         `;


        bigCurrentWeight.forEach(user => {

            tblBigWeights.innerHTML +=
                `
                    <tr>
                    <th>${user.firstName} ${user.lastName}</th>
                    <th>${user.meetings[user.meetings.length - 2].weight}</th>
                    <th>${user.meetings[user.meetings.length - 1].weight}</th>
                    </tr>
                    `;
        });
    }
    catch (err) { console.log(err); }
}


