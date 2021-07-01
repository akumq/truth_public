import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Articles");

        
    };


    async getHtml() {
        async function getData(){
          const url = "articles"
          const resp = await fetch(url)
          const json = await resp.json();
          
          return json.values
        };

        async function getcards(){
          
          var resp = ``;
          
          const data = await getData()

          const loaded = ["ID"]
          for await (let element of data){
            if (!loaded.includes(element[0]) ){
              loaded.push(element[0]);
              resp += `<article class="article" >
                                <h1>${element[1]}</h1>
                                ${element[2]}
                               </article>`
              
            } 
          }
         
          return resp
        }
      
        return `
          <div class="page">
            <div class="archive">
              ${await getcards()}
            </div>
          </div>
        `;
    }
}

/*
 <div class="page">
        <div class="archive">
            <article class="article" >
              <h1>Lorem ipsum </h1>
              <img src="https://i.pinimg.com/474x/71/c3/2f/71c32f70dedfab37f71c9bbe1105c308.jpg" href="/1"> </img>
              <a href="/1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra tincidunt metus a gravida. Cras laoreet nunc quis nibh eleifend, vel interdum ligula mattis. Curabitur accumsan condimentum imperdiet. Proin auctor augue dolor, vitae volutpat lorem efficitur dapibus. Pellentesque suscipit porta lectus id pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin nec dui sit amet quam egestas tempus vel at massa.</a>
            </article>
            <article class="article">
              <hr class="image">
              <hr>
            </article>
            <article class="article">
              <hr class="image">
              <hr>
            </article>
          </div>
        </div>
*/