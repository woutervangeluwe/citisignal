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
                  "id": "woutervangeluwe+06012025-25@gmail.com",
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
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3Mzc5ODIzMzA5NzRfMjZlNWY0ZmItYzJjYy00MDQzLWI5MzktNWRjM2JlMjhjYzIzX3ZhNmMyIiwib3JnIjoiOTA3MDc1RTk1QkY0NzlFQzBBNDk1QzczQEFkb2JlT3JnIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImI3ZDhhMWZjMzk2MjQyODg5YmIzMWRjODM2NDRlOTFkIiwidXNlcl9pZCI6IjhDRDMxRTU0NjczQzQ5RUUwQTQ5NUUwNUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IjhDRDMxRTU0NjczQzQ5RUUwQTQ5NUUwNUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJjdHAiOjMsIm1vaSI6ImFiZGUwOWU5IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJvcGVuaWQsc2Vzc2lvbixBZG9iZUlELHJlYWRfb3JnYW5pemF0aW9ucyxhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQiLCJjcmVhdGVkX2F0IjoiMTczNzk4MjMzMDk3NCJ9.IasxbxKa8LDBqA40UKJAYSb7XqvmaPlgOMJTDArcrPFeW-1AMzd8DmhcsHrgMSUmKAz73lH7fH7SoWGroFD_j49orIcImIIJwuzPYnRtMtOwpI4IIamiznqe-8bw51Vn-GK3-lHlRr9tBgQVkimLd6UoBPbpWPcYsjhENDsxMsBhiggjKPsQcSxefjoZUzja66d8iHJ2JWGFxoilSJRpKJZzyR99Kti0Zr7h1WESnPt5Awc5OWJQ7RSY5OcK7PwF7tl8XlQCJiSLsTMUXvkG0c-c4eF2d2AaUBaKx38fFZ6qClXA6m2xzE0kJqUcjQMWxytS3cmKK55-BXBEThviOw",
          "x-api-key": "b7d8a1fc396242889bb31dc83644e91d",
          "x-gw-ims-org-id": "907075E95BF479EC0A495C73@AdobeOrg",
          "Content-Type": 'application/vnd.adobe.xdm+json; schema="https://ns.adobe.com/experience/offer-management/decision-request;version=1.0"',
          "Accept": 'application/vnd.adobe.xdm+json; schema="https://ns.adobe.com/experience/offer-management/decision-response;version=1.0"',
          "x-sandbox-name": "one-adobe"
        },
        body: JSON.stringify(offerRequest),
      });
  
      if (response.status === 200) {
        var body = await response.json();
        console.log("Offer Decisioning Response: ", body);

        const payloads = body[0]["payload"];

        payloads.forEach(payload => {
          if(payload["placement"]["name"] == "Web - Image"){
            console.log("Web-Image payload");
            const items = payload["items"];
            items.forEach(item => {
              if (item["id"].includes("dps:fallback-offer")) {
                const content = JSON.parse(item["data"]["content"]);
                console.log("Web-Image Personalized Offer Content: ", content)
            
                document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+content["data"]["content"]+"'/>";
                console.log("Personalized Offer Delivery URL:", content["data"]["content"]);
              }else if (item["id"].includes("dps:personalized-offer")) {
                const content = JSON.parse(item["data"]["content"]);
                console.log("Web-Image Personalized Offer Content: ", content)
            
                document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+content["data"]["content"]+"'/>";
                console.log("Personalized Offer Delivery URL:", content["data"]["content"]);
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

        document.querySelector("#offerImage").style.display="block";
        document.querySelector("#offerText").style.display="block";
        document.querySelector("#offerCTA").style.display="block";

      } else {
        console.warn("Offer Decisioning Response unsuccessful:", response.body);
      }
    } catch (error) {
      console.error("Error when getting Offer Decisioning Response:", error);
    }
  }
