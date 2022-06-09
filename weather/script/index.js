const printData = document.getElementById("print");
const search = async()=>{
    try{
        let city = document.getElementById("city").value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63169f5e04d76ea736b20778bbdcadb5&units=metric`)
    let data = await res.json();
    append(data)
    console.log(data);

    let weekly = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=&appid=63169f5e04d76ea736b20778bbdcadb5&units=metric`)
        let weeklyData = await weekly.json();
        console.log("weekly:",weeklyData.daily)

        //call function=>

        weekData(weeklyData.daily);

    
    }
    catch(err){
        console.log("error",err)
    };

}
function append(data){
    printData.innerHTML= "";
    let main = document.createElement('div');
    main.setAttribute("id","main");

    let div1 = document.createElement('div');
    div1.setAttribute("id","details");
    let name = document.createElement('h3');
    name.innerText = `City: ${data.name}`;

    // let temp = document.createElement('h3');
    // temp.innerText = `temp: ${data.main.temp} °C`;

    let min_temp = document.createElement('h3');
    min_temp.innerText = `Min_temp ${data.main.temp_min} °C`;

    let max_temp = document.createElement('h3');
    max_temp.innerText = `Max_temp: ${data.main.temp_max} °C`;

    let wind = document.createElement("h3"); 
    wind.innerText=`Wind:${data.wind.speed}`;

    let clouds = document.createElement("h3");
    clouds.innerText=`Clouds:${data.clouds.all}%`;


    let sunrisediv = document.createElement("div");
    sunrisediv.setAttribute("id","sunset");
    let riseimg = document.createElement("img");
    riseimg.src= "https://thumbs.gfycat.com/WastefulSmartHoki-size_restricted.gif"    

    let sunrise = document.createElement("h3");
    sunrise.innerText =`Sunrise : ${data.sys.sunrise}`;

    sunrisediv.append(riseimg,sunrise)

    let sunsetdiv = document.createElement("div");
    sunsetdiv.setAttribute("id","sunset");
    let setimg = document.createElement("img");
    setimg.src= "https://i.pinimg.com/originals/f5/55/61/f555617f01d2b30cc417a045f00c0ced.gif"    



    let sunset = document.createElement("h3");
    sunset.innerText =`Sunset : ${data.sys.sunset}`;

    sunsetdiv.append(setimg,sunset)


    let div2 = document.createElement('div');
    div2.setAttribute("id","map");
    let iframe = document.createElement("iframe");
    iframe.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    iframe.height=`250px`;
    iframe.width=`500px`;

    div2.append(iframe)

    div1.append(name,min_temp,max_temp,wind,clouds,sunrisediv,sunsetdiv);
    main.append(div1,div2);
    
    printData.append(main)

}

const weekData = (data)=>{
    week.innerHTML = "";
    data.map(function(elem,index){
        if(index==8)return;
        let days = ["Sun","Mon","Tue","Wed","Thr","Fri","Sat","Sun"]

        let maindiv = document.createElement("div");
        maindiv.setAttribute("id","fcast")
        

        let iname= document.createElement("p");
        iname.innerText = days[index];

        let logo = document.createElement("p");
        logo.innerText = ("⛅");

        let min = document.createElement("p");
        min.innerText = elem.temp.min+"°C";

        let max = document.createElement("p");
        max.innerText = elem.temp.max+"°C"

        maindiv.append(iname,logo,min,max);
        week.append(maindiv);


        
    })

}