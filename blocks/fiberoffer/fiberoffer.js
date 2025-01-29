export default function decorate(block) {
    const [fiberOfferWrapper] = block.children;
  
    const offerText = block.children[0];
    const offerCTA = block.children[1];
    const offerImage = block.children[2];

    offerText.id = 'offerText';
    offerText.className = 'offerText';
    offerCTA.id = 'offerCTA';
    offerCTA.className = 'offerCTA';
    offerImage.id = 'offerImage';
    offerImage.className = 'offerImage';

    document.querySelector("#offerText").style.display="none";
    document.querySelector("#offerCTA").style.display="none";
    document.querySelector("#offerImage").style.display="none";

   const blockFiberOffer = document.createElement('blockFiberOffer');
    blockFiberOffer.textContent = fiberOfferWrapper.textContent.trim();
    fiberOfferWrapper.replaceChildren(blockFiberOffer);

    getOffer();
  }

  async function getOffer() {
    const url = "https://edge.adobedc.net/ee/irl1/v1/interact?configId=045c5ee9-468f-47d5-ae9b-a29788f5948f";

    var offerRequest = {
      "events": [
        {
          "xdm": {
            "eventType": "web.webpagedetails.pageViews",
            "timestamp": "2025-01-29T09:29:52.286Z",
            "identityMap": {
              "Email": [
                {
                  "authenticatedState": "authenticated",
                  "id": "woutervangeluwe+06012025-35@gmail.com",
                  "primary": true
                }
              ]
            }
          },
          "query": {
            "personalization": {
              "schemas": [
                "https://ns.adobe.com/personalization/default-content-item",
                "https://ns.adobe.com/personalization/html-content-item",
                "https://ns.adobe.com/personalization/json-content-item"
              ],
              "decisionScopes": [
                "eyJ4ZG06YWN0aXZpdHlJZCI6ImRwczpvZmZlci1hY3Rpdml0eToxYTI0ZGY1M2NjOTBjMzg2IiwieGRtOnBsYWNlbWVudElkIjoiZHBzOm9mZmVyLXBsYWNlbWVudDoxYTI0ZGM2MWJmYjJlMjIwIn0=",
                "eyJ4ZG06YWN0aXZpdHlJZCI6ImRwczpvZmZlci1hY3Rpdml0eToxYTI0ZGY1M2NjOTBjMzg2IiwieGRtOnBsYWNlbWVudElkIjoiZHBzOm9mZmVyLXBsYWNlbWVudDoxYTI0ZGM0MzQyZjJlMjFlIn0="
              ]
            }
          }
        }
      ]
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(offerRequest),
      });
  
      if (response.status === 200) {
        var body = await response.json();
        console.log("Offer Decisioning Response: ", body);

        const decisions = body["handle"];

        decisions.forEach(decision => {
          if(decision["type"] = "personalization:decisions"){
            console.log("Offer Decisioning decision detail: ", decision);
            const payloads = decision["payload"];

            if (payloads === undefined || payloads.length == 0) {
              //do nothing
            }else{
              payloads.forEach(payload => {
                if(payload["placement"]["name"] == "Web - Image"){
                  console.log("Web-Image payload");
                  const items = payload["items"];
                  items.forEach(item => {
                    if (item["id"].includes("dps:fallback-offer")) {
                      console.log("Item details: ", item);
                      const deliveryURL = item["data"]["deliveryURL"];
                  
                      document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+item["data"]["deliveryURL"]+"'/>";
                    }else if (item["id"].includes("dps:personalized-offer")) {
                      console.log("Item details: ", item);
                      const deliveryURL = item["data"]["deliveryURL"];
                      console.log("Web-Image Personalized Offer Content: ", deliveryURL)
                  
                      document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+item["data"]["deliveryURL"]+"'/>";
                    }
                  });
                } else if (payload["placement"]["name"] == "Web - JSON"){
                    console.log("Web-JSON payload");
                    const items = payload["items"];
                    items.forEach(item => {
                      if (item["id"].includes("dps:fallback-offer")) {
                          const content = JSON.parse(item["data"]["content"]);
            
                          console.log("Web-JSON Fallback Content: ", content)
                    
                          document.querySelector("#offerText").innerHTML = content.text;
                          document.querySelector("#offerCTA").innerHTML= content.cta;
                      }else if (item["id"].includes("dps:personalized-offer")) {
                        const content = JSON.parse(item["data"]["content"]);
                    
                        console.log("Web-JSON Personalized Offer Content: " + content);
            
                        document.querySelector("#offerText").innerHTML = content.text;
                        document.querySelector("#offerCTA").innerHTML= content.cta;
                      }
                    });
                  }
              });
            }
          document.querySelector("#offerImage").style.display="block";
          document.querySelector("#offerText").style.display="block";
          document.querySelector("#offerCTA").style.display="block";
          }
        });
      } else {
        console.warn("Offer Decisioning Response unsuccessful:", response.body);
      }
    } catch (error) {
      console.error("Error when getting Offer Decisioning Response:", error);
    }
  }
