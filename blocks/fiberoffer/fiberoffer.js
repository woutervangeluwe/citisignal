export default function decorate(block) {
    const [fiberOfferWrapper] = block.children;
  
    const offerText = block.children[0];
    const offerCTA = block.children[1];
    const offerImage = block.children[2];

    const url = "https://platform.adobe.io/data/core/ods/decisions";

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
          "Authorization": "Bearer Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3Mzc1ODIyNjkzMDFfNzhhYzA1YTUtN2FmNS00OThiLTgxZTctYzczNmExOTg1MmI2X3ZhNmMyIiwib3JnIjoiOTA3MDc1RTk1QkY0NzlFQzBBNDk1QzczQEFkb2JlT3JnIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImVjMGZlMjE2YzJkNDQ0NWQ5MDJkMWYyM2RjMzZmZWNlIiwidXNlcl9pZCI6IkEyMzAxRTlBNjc3RTA2RDIwQTQ5NUU3NEB0ZWNoYWNjdC5hZG9iZS5jb20iLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IkEyMzAxRTlBNjc3RTA2RDIwQTQ5NUU3NEB0ZWNoYWNjdC5hZG9iZS5jb20iLCJjdHAiOjMsIm1vaSI6IjNjOThjZmE4IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3Mzc1ODIyNjkzMDEiLCJzY29wZSI6ImZpcmVmbHlfYXBpLG9wZW5pZCxBZG9iZUlELGZmX2FwaXMscmVhZF9vcmdhbml6YXRpb25zIn0.f1bICDP7J1UzZhHn15TgaJV7Z8KxfNYbldifR8T1V8GIdA42pylrf7vrdog5tFzIqxUemn4Sn5L5ry-tgMYKHUMG4lWu3amFGHmrj7W1EDzcTfh0Zgc1D8491LZh3LCM_rQjw68TMXP7IKKbHmkFaYz27HZmYMXQey2n4B0metuXzgRgd-1CM-aa1FqUp5WT7Z9Ij9ShC7I5IEB1RED0Mr3ss3GwXtIRRMf8dCf0Tjy5sS23Ol0eBxB1jCiLrPNbBWCTofaxUGiVXAzYyJqxi9DNXk-vUPdUy6FOM7s-ayqo-2cpAcrIAx_JYJiOsFmYykyAu0bZTNS-A-OEzdyubw",
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