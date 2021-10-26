<template>
    <div>
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

    export default {
        props:{
            cityName: '',
        },
        data:function(){
            return{
                weather:[],
            };
        },
        mounted:function(){
            Vue.axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.cityName+"&appid=7914d5a440960cfd5df3bd0388a7ad0f", {
                          units: "metric",
                })
                .then((response)=>{
                    console.log(response.data);
                    this.weather = response.data;
                    
                })
        
            
        },
        filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        }
    }
</scripts>