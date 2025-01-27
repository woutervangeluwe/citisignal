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
    const url = "https://platform.adobe.io/data/core/ods/decisions";

    var offerRequest = {
            "xdm:propositionRequests": [
                {
                  "xdm:placementId": "dps:offer-placement:1a24dc4342f2e21e",
                  "xdm:activityId": "dps:offer-activity:1a24df53cc90c386",
                  "xdm:itemCount": 1
                },
                {
                  "xdm:placementId": "dps:offer-placement:1a24dc61bfb2e220",
                  "xdm:activityId": "dps:offer-activity:1a24df53cc90c386",
                  "xdm:itemCount": 1
                }
            ],
            "xdm:profiles": [
                {
                  "xdm:identityMap": {
                    "EMAIL": [
                    {
                        "xdm:id": "woutervangeluwe+06012025-06@gmail.com"
                    }
                    ]
                },
                "xdm:decisionRequestId": "0AA00002-0000-1224-c0de-cjf98Csj43"
                }
            ],
            "xdm:allowDuplicatePropositions": {
                "xdm:acrossActivities": true,
                "xdm:acrossPlacements": true
            },
            "xdm:responseFormat": {
                "xdm:includeContent": true,
                "xdm:includeMetadata": {
                "xdm:activity": [
                    "name"
                ],
                "xdm:option": [
                    "name"
                ],
                "xdm:placement": [
                    "name"
                ]
                }
            }
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

        const propositions = body["xdm:propositions"];

        propositions.forEach(proposition => {
            if(proposition["xdm:placement"]["xdm:name"] == "Web - JSON"){
                console.log("Web-JSON proposition");
                if (proposition.hasOwnProperty("xdm:fallback")) {
                    const fallback = proposition["xdm:fallback"];
                    const content = fallback["xdm:content"]
    
                    console.log("Web-JSON Fallback Content: ", content)
            
                    document.querySelector("#offerText").innerHTML = content.text;
                    document.querySelector("#offerCTA").innerHTML= content.cta;
                }else{
                    const options = proposition["xdm:options"];
                    const content = JSON.parse(options[0]["xdm:content"]);
            
                    console.log("Web-JSON Personalized Offer Content: " + content.text);
    
                    document.querySelector("#offerText").innerHTML = content.text;
                    document.querySelector("#offerCTA").innerHTML= content.cta;
                }
            }else if(proposition["xdm:placement"]["xdm:name"] == "Web - Image"){
                console.log("Web-Image proposition");
                if (proposition.hasOwnProperty("xdm:fallback")) {
                    const fallback = proposition["xdm:fallback"];
                    console.log("Web-JSON Fallback Offer Content: ", fallback)
            
                    document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+fallback["xdm:deliveryURL"]+"'/>";
                }else{
                    const options = proposition["xdm:options"][0];
                    console.log("Web-JSON Personalized Offer Content: ", options)
            
                    document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='"+options["xdm:deliveryURL"]+"'/>";
                    console.log("Personalized Offer Delivery URL:", options["xdm:deliveryURL"]);
                }
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
