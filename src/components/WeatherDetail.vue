<template>
   <div style="margin-left:40%;margin-top:10%">
       
       <h1>Weather</h1>
       <table>
           <tr>
               <td style="border:none"><input type="text" v-model="wcityAdd">
                    <br><button v-on:click="addWCity">Add city</button></td>
                <td style="border:none; min-width:50px"> <select v-model="wcity" style="min-width:150px">
                        <option  v-for="city in wcities" v-bind:key="city" v-bind:value="city">{{ city}}</option>
                    </select>
                    <br>
                    <router-link v-bind:to="'/weather-info/'+wcity">
                        <button v-on:click="getWeather">Get Weather</button>
                    </router-link>
                </td>
            </tr>
       </table>
       <table v-if="weather.cod >0">
                <tr>City: {{weather.name}}</tr>
               <tr>Country: {{weather.sys.country}}</tr>    
                <tr>Weather at all: {{weather.weather[0].main}}</tr>
               <tr>Temperature: {{weather.main.temp-273.15 | roundValue}} C</tr>
               <tr>Feels like: {{weather.main.feels_like-273.15 | roundValue}} C</tr>
               <tr>Min. temperature today: {{weather.main.temp_min-273.15 | roundValue}} C</tr>
               <tr>Max. temperature today: {{weather.main.temp_max-273.15 | roundValue}} C</tr>
               <tr>Pressure: {{weather.main.pressure}} P</tr>
               <tr>Wind speed: {{weather.wind.speed}}</tr>
            
       </table>
   </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
 
   export default {
       props:{
           cityName:'',
       },
        data: function() {
           return {
           
           wcityAdd:"",
           wcity:"",
           wcities:[],
           weather:[],
           testValue:0,
           latitude:0,
           longitude:0,
           link:"",
        }},
        mounted: function(){
            
        

               if(localStorage.getItem("wcities") !== '') this.wcities = JSON.parse(localStorage.getItem("wcities") || "[]");
                
               
                
                var getPosition = function (options) {
                    return new Promise(function (resolve, reject) {
                        navigator.geolocation.getCurrentPosition(resolve, reject, options);
                        }
                    );
                };
               getPosition()
                .then((position) => {
                    
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    console.log(this.latitude, this.longitude);
                    this.link = "https://api.openweathermap.org/data/2.5/weather?lat="+ this.latitude.toString()+"&lon="+ this.longitude.toString()+"&appid=7914d5a440960cfd5df3bd0388a7ad0f";
                        axios.get(this.link, {
                                units: "metric",
                        })
                        .then((response)=>{
                            console.log(response.data);
                            this.weather = response.data;
                        })
                })
                .catch((err) => {
                    console.error(err.message);
                });
                
        },
        methods:{
            

            
            getWeather: function() {
                 axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.wcity+"&appid=7914d5a440960cfd5df3bd0388a7ad0f", {
                          units: "metric",
                })
                .then((response)=>{
                    console.log(response.data);
                    this.weather = response.data;
                    
                })
            },
            addWCity: function(){
                this.wcities.push(this.wcityAdd)
                localStorage.setItem("wcities",JSON.stringify(this.wcities))
            },
            
        
        },
        filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        }
    }
</script>
<style scoped>

</style>