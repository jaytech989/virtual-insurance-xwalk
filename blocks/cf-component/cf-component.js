import { isAuthorEnvironment } from "../../scripts/scripts.js";


async function fetchData(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
  
      console.log(response, "response");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response JSON:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  

export default function decorate(block) {
    let headingCf=""

    const blockLink = block.children[0];
  if(blockLink){

    const link=blockLink.querySelector("a");
      const path = link ? link.getAttribute("href") : block.textContent.trim();

  }
    const divEl3 = document.createElement("div");
    const divEl4 = document.createElement("div");
    divEl4.setAttribute("class", "disclaimer");
    divEl4.setAttribute("id", "disclaimer");
    divEl4.textContent = headingCf;
    divEl3.append(divEl4);


    block.textContent = "";
  block.append(divEl3);
 (async () => {
    try {
      let domainUrl=""
      // const envCheck=isAuthorEnvironment();
      if(isAuthorEnvironment() ){

        domainUrl= "https://author-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path=/content/dam/bandhan-ue-demo/banner-text-demo;variation=master"

      }else{
        domainUrl= "https://publish-p102857-e1312424.adobeaemcloud.com/graphql/execute.json/bandhan-ue-demo/bannerquery;path=/content/dam/bandhan-ue-demo/banner-text-demo;variation=master"

      }

      const resp = await fetchData(domainUrl);
      console.log("Final Response:", resp.data.bannerTextByPath.item.bannerText);
       headingCf = resp.data.bannerTextByPath.item.bannerText;
       document.getElementById("disclaimer").append(headingCf);
    } catch (err) {
      console.error("Error during fetchData call:", err);
    }
  })();
}