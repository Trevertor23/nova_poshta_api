<template>
   <div style="margin-left:40%;margin-top:10%">
       <router-link to="/weather-detail">Погода</router-link>
       <h1>Список відділень (оберіть місто)</h1>
       <select v-model="dep" v-on:change="checkDeps">
           <option  v-for="city in cities" v-bind:key="city.Ref" v-bind:value="city.Description">{{ city.Description}}</option>
       </select>
       <br><br>
       <br><select>
           <option  v-for="dep in departments" v-bind:key="dep.CityRef" v-bind:value="dep.Description">{{ dep.Description}}</option>
       </select>
       
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
           cities:[],
           departments:[],
           dep:"Абрикосівка",
           
        }},
        mounted: function(){
            
                axios.post("https://api.novaposhta.ua/v2.0/json/Address/getCities", {
                        apiKey: "8569bc0d64cca934aa4d2e95b5a659a3",
                        modelName: "Address",
                        calledMethod: "getCities",
                        methodProperties: {}
                })
                .then((response)=>{
                    console.log(response.data);
                    this.cities = response.data.data;
                })

             
                
        },
        methods:{
            

            checkDeps: function() {
                
                 axios.post("https://api.novaposhta.ua/v2.0/json/Address/getWarehouses", {
                        apiKey: "8569bc0d64cca934aa4d2e95b5a659a3",
                        modelName: "Address",
                        calledMethod: "getWarehouses",
                        methodProperties: {
                            CityName: this.dep,
                        }
                })
                .then((response)=>{
                    console.log(response.data);
                    this.departments = response.data.data;
                })
                
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