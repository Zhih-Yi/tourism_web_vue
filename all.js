var app=new Vue({
    el:'#app',
    data(){
        return{
        records:[],
        currentPage:0,
        locationlist:[],
        currentLocation:'',
        }
    },methods:{
        getLocationList(){
        const locations = new Set();//陣列內容不重複
        const vm =this;
        vm.records.forEach((item,i)=>{
            locations.add(item.Zone);
        })
        vm.locationlist=Array.from(locations);
        }
    },
    computed:{
        filterData(){
            const vm = this;
            let items=[];
              
        if(vm.currentLocation!==''){
                items= vm.records.filter((item, i)=>{
                return item.Zone==vm.currentLocation;
            });
            }else{
                items=vm.records;
            } 
            const newRecords=[];
            items.forEach((item,i)=>{
                if(i%6===0){
                    newRecords.push([]);
                }
                const page = parseInt(i/6);
                newRecords[page].push(item);
            })
       
            return newRecords;
        }
    }
    ,created(){
    const api=`https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json`;
    const vm =this;
    axios.get(api)
    .then(function (response) {
    // handle success
        vm.records=response.data.result.records;
 
        vm.getLocationList();
     })
    .catch(function (error) {
    // handle error
        console.log(error);
    })
    .then(function () {
    // always executed
    });

   
    }
})