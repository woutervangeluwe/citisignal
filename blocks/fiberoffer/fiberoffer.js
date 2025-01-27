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

    document.querySelector("#offerText").innerHTML="Text";
    document.querySelector("#offerCTA").innerHTML="CTA";
    document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='https://vangeluw.blob.core.windows.net/vangeluw/animal-Wouter-1737058328.png?sv=2023-01-03&st=2025-01-27T12%3A26%3A43Z&se=2025-01-28T12%3A26%3A43Z&sr=b&sp=r&sig=UfyWaphZm2Jx07szWuknI1oBgqe3hJjLwTSsQnLKCxs%3D'/>";;

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
                  "xdm:placementId": "dps:offer-placement:1a08a14ccfe533b6",
                  "xdm:activityId": "dps:offer-activity:1a08ba4b529b2fb2",
                  "xdm:itemCount": 2
                }
            ],
            "xdm:profiles": [
                {
                  "xdm:identityMap": {
                    "EMAIL": [
                    {
                        "xdm:id": "woutervangeluwe+06012025-02@gmail.com"
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
          "x-api-key": "ec0fe216c2d4445d902d1f23dc36fece",
          "x-gw-ims-org-id": "907075E95BF479EC0A495C73@AdobeOrg",
          "Content-Type": "application/vnd.adobe.xdm+json; schema='https://ns.adobe.com/experience/offer-management/decision-request;version=1.0'",
          "Accept": "application/vnd.adobe.xdm+json; schema='https://ns.adobe.com/experience/offer-management/decision-response;version=1.0'",
          "x-sandbox-name": "tech-insiders"
        },
        body: JSON.stringify(offerRequest),
      });
  
      if (response.status === 200) {
        console.debug("Registration successful", response.body);
      } else {
        console.warn("Registration unsuccessful:", response.body);
      }
    } catch (error) {
      console.error("Error when sending profile:", error);
    }
  }