let a;
        let date;
        let time;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setInterval(() => {
            a = new Date(); 
            date = a.toLocaleDateString(undefined, options);
            time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
            document.getElementById('time').innerHTML = time + "<br>on " + date;
        }, 1000);

        // let b;
        // let Date;
        // let Time;
        // const Options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // setInterval(() => {
        //     a = new Date(); 
        //     date = a.toLocaleDateString(undefined, options);
        //     time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
        //     document.getElementById('Time').innerHTML = Time + "<br>on " + Date;
        // }, 1000);

        function getAndUpdate(){
            console.log("Updating List...");
            tit = document.getElementById('title').value;
            desc = document.getElementById('description').value;
            if (localStorage.getItem('itemsJson')==null){
                itemJsonArray = [];
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson')
                itemJsonArray = JSON.parse(itemJsonArrayStr);
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            update();
        }

        function update(){
            if (localStorage.getItem('itemsJson')==null){
                itemJsonArray = []; 
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            } 
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson')
                itemJsonArray = JSON.parse(itemJsonArrayStr); 
            }
            // Populate the table
            let tableBody = document.getElementById("tableBody");
            let str = "";
            itemJsonArray.forEach((element, index) => {
                str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td> 
                <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
                </tr>`; 
            });
            tableBody.innerHTML = str;
        }
        add = document.getElementById("add");
        add.addEventListener("click", getAndUpdate);
        update();
        function deleted(itemIndex){
            console.log("Delete", itemIndex);
            itemJsonArrayStr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            // Delete itemIndex element from the array
            itemJsonArray.splice(itemIndex, 1);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            update();

        }
        function clearStorage(){
            if (confirm("Do you areally want to clear?")){
            console.log('Clearing the storage')
            localStorage.clear();
            update()
            }
        }
        